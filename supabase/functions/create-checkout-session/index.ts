// @deno-types="npm:@types/stripe@^14.21.0"
// @ts-expect-error - ESM module resolution not supported by TypeScript
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
// @ts-expect-error - ESM module resolution not supported by TypeScript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';

// ประกาศ Deno types
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
  serve: (handler: (request: Request) => Response | Promise<Response>) => void;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CheckoutRequest {
  planId: string;
  memberId: string;
  couponCode?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing authorization header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create client with user's auth to verify identity
    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
    if (userError || !user) {
      console.error('Auth error:', userError?.message || 'No user found');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const body = await req.json() as CheckoutRequest;
    const { planId, memberId, couponCode } = body;

    if (!planId || !memberId) {
      return new Response(
        JSON.stringify({ error: 'Missing planId or memberId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the authenticated user matches the requested memberId
    if (user.id !== memberId) {
      console.error('User ID mismatch:', { userId: user.id, memberId });
      return new Response(
        JSON.stringify({ error: 'Forbidden: Cannot create checkout for another user' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role for database operations
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get plan details
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError || !plan) {
      console.error('Plan not found:', planError?.message);
      return new Response(
        JSON.stringify({ error: 'Plan not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get or create customer
    const { data: member } = await supabase
      .from('members')
      .select('first_name, last_name')
      .eq('id', memberId)
      .single();

    let customerId: string | undefined;

    // Check if customer already exists
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('member_id', memberId)
      .maybeSingle();

    if (existingSub?.stripe_customer_id) {
      customerId = existingSub.stripe_customer_id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        name: member ? `${member.first_name} ${member.last_name}` : undefined,
        metadata: { member_id: memberId },
      });
      customerId = customer.id;
    }

    // Create Checkout Session
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      client_reference_id: memberId,
      line_items: [
        {
          price_data: {
            currency: plan.currency.toLowerCase(),
            product_data: {
              name: plan.name,
              description: plan.features_json?.description || 'TDPK Membership',
            },
            unit_amount: plan.amount,
            recurring: {
              interval: plan.interval as 'year',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/member?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/billing`,
      metadata: {
        plan_id: planId,
        member_id: memberId,
      },
    };

    // Add coupon if provided
    if (couponCode) {
      sessionConfig.discounts = [{ coupon: couponCode }];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    console.log('Checkout session created for member:', memberId);

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const error = err as Error;
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred during checkout' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});