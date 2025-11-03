import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

console.log('Stripe webhook handler loaded');

Deno.serve(async (request) => {
  const signature = request.headers.get('Stripe-Signature');

  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

  const body = await request.text();
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log('Event type:', event.type);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session completed:', session.id);

        // Extract member_id from client_reference_id
        const memberId = session.client_reference_id;
        if (!memberId) {
          console.error('No member_id in session');
          break;
        }

        // Get subscription details
        const subscriptionId = session.subscription as string;
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Get plan from metadata or line items
        const planId = session.metadata?.plan_id;
        if (!planId) {
          console.error('No plan_id in metadata');
          break;
        }

        // Create subscription record
        const { error: subError } = await supabase.from('subscriptions').upsert({
          member_id: memberId,
          plan_id: planId,
          provider: 'stripe',
          provider_customer_id: session.customer as string,
          provider_sub_id: subscriptionId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: subscriptionId,
          status: subscription.status as any,
          amount: subscription.items.data[0].price.unit_amount || 0,
          currency: subscription.currency.toUpperCase(),
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        });

        if (subError) {
          console.error('Error creating subscription:', subError);
        } else {
          console.log('Subscription created successfully');

          // Update member status
          await supabase
            .from('members')
            .update({ status: 'active' })
            .eq('id', memberId);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription.id);

        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({
            status: subscription.status as any,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            canceled_at: subscription.canceled_at
              ? new Date(subscription.canceled_at * 1000).toISOString()
              : null,
          })
          .eq('stripe_subscription_id', subscription.id);

        if (updateError) {
          console.error('Error updating subscription:', updateError);
        } else {
          console.log('Subscription updated successfully');

          // Update member status based on subscription status
          const { data: subData } = await supabase
            .from('subscriptions')
            .select('member_id')
            .eq('stripe_subscription_id', subscription.id)
            .single();

          if (subData) {
            const newStatus =
              subscription.status === 'active' || subscription.status === 'trialing'
                ? 'active'
                : 'inactive';

            await supabase
              .from('members')
              .update({ status: newStatus as any })
              .eq('id', subData.member_id);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription deleted:', subscription.id);

        const { error: deleteError } = await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            canceled_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (deleteError) {
          console.error('Error updating subscription:', deleteError);
        } else {
          console.log('Subscription marked as canceled');

          // Update member status
          const { data: subData } = await supabase
            .from('subscriptions')
            .select('member_id')
            .eq('stripe_subscription_id', subscription.id)
            .single();

          if (subData) {
            await supabase
              .from('members')
              .update({ status: 'inactive' })
              .eq('id', subData.member_id);
          }
        }
        break;
      }

      default:
        console.log('Unhandled event type:', event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return new Response(`Webhook processing error: ${error.message}`, { status: 500 });
  }
});
