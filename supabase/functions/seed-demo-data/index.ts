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

interface DemoUser {
  email: string;
  password: string;
  role: 'admin' | 'member' | 'partner_user';
  profile?: {
    first_name: string;
    last_name: string;
    phone?: string;
    tier?: string;
    tenant_ref?: string;
  };
  partner_id?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authenticated user from JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client for auth check
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Verify user is authenticated and has admin role
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user has admin role
    const { data: userRoles, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    if (roleError || !userRoles?.some((r: { role: string }) => r.role === 'admin')) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with service role key for data operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const demoUsers: DemoUser[] = [
      // Admin
      {
        email: 'pakkanan.cha@truedigitalpark.com',
        password: 'Demo2025!',
        role: 'admin',
        profile: { first_name: 'PPS', last_name: 'Admin' }
      },
      // Members
      {
        email: 'alice.member@demo.com',
        password: 'Demo2025!',
        role: 'member',
        profile: { 
          first_name: 'Alice', 
          last_name: 'Wong',
          phone: '+66812345678',
          tier: 'Member'
        }
      },
      {
        email: 'taro.tenant@demo.com',
        password: 'Demo2025!',
        role: 'member',
        profile: { 
          first_name: 'Taro', 
          last_name: 'Tanaka',
          phone: '+81901234567',
          tier: 'Tenant',
          tenant_ref: 'Voice Caddie X'
        }
      },
      {
        email: 'nicha.global@demo.com',
        password: 'Demo2025!',
        role: 'member',
        profile: { 
          first_name: 'Nicha', 
          last_name: 'Supakij',
          phone: '+66887654321',
          tier: 'Global'
        }
      },
      // Tenants
      {
        email: 'arisa@cpih.co.th',
        password: 'Demo2025!',
        role: 'member',
        profile: { 
          first_name: 'Arisa', 
          last_name: 'Limthong',
          phone: '+66823456789',
          tier: 'Tenant',
          tenant_ref: 'CP Innovation Hub'
        }
      },
      {
        email: 'joke@nebulalab.co.th',
        password: 'Demo2025!',
        role: 'member',
        profile: { 
          first_name: 'Joke', 
          last_name: 'Charoen',
          phone: '+66834567890',
          tier: 'Tenant',
          tenant_ref: 'Nebula Digital Lab'
        }
      },
      // Partners
      {
        email: 'test@truespace.co.th',
        password: 'Demo2025!',
        role: 'partner_user',
        partner_id: '11111111-1111-1111-1111-111111111111'
      },
      {
        email: 'takumi@salt.jp',
        password: 'Demo2025!',
        role: 'partner_user',
        partner_id: '22222222-2222-2222-2222-222222222222'
      },
      {
        email: 'sonya@innopad.tw',
        password: 'Demo2025!',
        role: 'partner_user',
        partner_id: '33333333-3333-3333-3333-333333333333'
      }
    ];

    const results: Array<{ email: string; status: string; user_id?: string; error?: string }> = [];

    for (const user of demoUsers) {
      // Check if user exists
      const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
      const userExists = existingUser?.users.find((u: { email?: string; id: string }) => u.email === user.email);

      let userId: string;

      if (!userExists) {
        // Create auth user
        const { data: newUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true
        });

        if (authError || !newUser.user) {
          console.error(`Failed to create ${user.email}:`, authError);
          results.push({ email: user.email, status: 'failed', error: authError?.message });
          continue;
        }

        userId = newUser.user.id;
      } else {
        userId = userExists.id;
      }

      // Add user role
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .upsert({ user_id: userId, role: user.role }, { onConflict: 'user_id,role' });

      if (roleError) {
        console.error(`Failed to add role for ${user.email}:`, roleError);
      }

      // Create member profile if role is member
      if (user.role === 'member' && user.profile) {
        const { error: memberError } = await supabaseAdmin
          .from('members')
          .upsert({
            id: userId,
            first_name: user.profile.first_name,
            last_name: user.profile.last_name,
            phone: user.profile.phone,
            country_code: user.email.includes('.jp') ? 'JP' : user.email.includes('.tw') ? 'TW' : 'TH',
            status: 'active',
            tier: user.profile.tier || 'Member',
            tenant_ref: user.profile.tenant_ref
          }, { onConflict: 'id' });

        if (memberError) {
          console.error(`Failed to create member for ${user.email}:`, memberError);
        }

        // Create demo subscription for paid members (fake active subscription)
        if (user.profile.tier === 'Member' || user.profile.tier === 'Global' || user.profile.tier === 'Tenant') {
          let planCode = 'MEMBER_THB_1188';
          let amount = 118800;
          
          if (user.profile.tier === 'Global') {
            planCode = 'GLOBAL_THB_3588';
            amount = 358800;
          } else if (user.profile.tier === 'Tenant') {
            planCode = 'MEMBER_PLUS_THB_2388';
            amount = 238800;
          }

          const { data: plan } = await supabaseAdmin
            .from('plans')
            .select('id')
            .eq('code', planCode)
            .maybeSingle();

          if (plan) {
            const now = new Date();
            const oneYearFromNow = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
            
            await supabaseAdmin
              .from('subscriptions')
              .upsert({
                member_id: userId,
                provider: 'stripe',
                provider_customer_id: `demo_cus_${userId.substring(0, 8)}`,
                provider_sub_id: `demo_sub_${userId.substring(0, 8)}`,
                stripe_customer_id: `demo_cus_${userId.substring(0, 8)}`,
                stripe_subscription_id: `demo_sub_${userId.substring(0, 8)}`,
                plan_id: plan.id,
                currency: 'THB',
                amount: amount,
                status: 'active',
                current_period_start: now.toISOString(),
                current_period_end: oneYearFromNow.toISOString()
              }, { onConflict: 'member_id' });
          }
        }
      }

      // Create partner_user profile if role is partner_user
      if (user.role === 'partner_user' && user.partner_id) {
        const { error: partnerUserError } = await supabaseAdmin
          .from('partner_users')
          .upsert({
            id: userId,
            partner_id: user.partner_id,
            role: 'staff',
            permissions_json: { can_verify: true, can_redeem: true, can_manage_offers: true }
          }, { onConflict: 'id' });

        if (partnerUserError) {
          console.error(`Failed to create partner_user for ${user.email}:`, partnerUserError);
        }
      }

      results.push({ email: user.email, status: 'success', user_id: userId });
    }

    // Create sample QR tokens
    const memberIds = results
      .filter((r: { email: string; status: string; user_id?: string }) => 
        r.status === 'success' && 
        demoUsers.find((u: DemoUser) => u.email === r.email && u.role === 'member')
      )
      .map((r: { user_id?: string }) => r.user_id)
      .filter((id): id is string => id !== undefined);

    for (const memberId of memberIds) {
      await supabaseAdmin.from('qr_tokens').upsert({
        member_id: memberId,
        jti: `demo-qr-${memberId}`,
        issued_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 60000).toISOString(),
        revoked: false
      }, { onConflict: 'jti' });
    }

    // Create sample verifications and redemptions
    const aliceId = results.find((r: { email: string; user_id?: string }) => r.email === 'alice.member@demo.com')?.user_id;
    const nichaId = results.find((r: { email: string; user_id?: string }) => r.email === 'nicha.global@demo.com')?.user_id;
    const taroId = results.find((r: { email: string; user_id?: string }) => r.email === 'taro.tenant@demo.com')?.user_id;

    if (aliceId) {
      // Alice verifications
      for (let i = 0; i < 3; i++) {
        await supabaseAdmin.from('verifications').insert({
          partner_id: '11111111-1111-1111-1111-111111111111',
          member_id: aliceId,
          method: 'qr',
          result: 'active',
          verified_at: new Date(Date.now() - (5 + i * 7) * 24 * 60 * 60 * 1000).toISOString()
        });
      }

      // Alice redemptions
      for (let i = 0; i < 2; i++) {
        await supabaseAdmin.from('redemptions').insert({
          offer_id: 'offer-001',
          member_id: aliceId,
          partner_id: '11111111-1111-1111-1111-111111111111',
          amount: 29900,
          currency: 'THB',
          method: 'scan',
          status: 'success',
          note: '10% discount applied',
          redeemed_at: new Date(Date.now() - (5 + i * 7) * 24 * 60 * 60 * 1000).toISOString()
        });
      }
    }

    if (nichaId) {
      // Nicha verifications and redemptions
      for (let i = 0; i < 2; i++) {
        await supabaseAdmin.from('verifications').insert({
          partner_id: '22222222-2222-2222-2222-222222222222',
          member_id: nichaId,
          method: 'qr',
          result: 'active',
          verified_at: new Date(Date.now() - (8 + i * 7) * 24 * 60 * 60 * 1000).toISOString()
        });

        await supabaseAdmin.from('redemptions').insert({
          offer_id: 'offer-003',
          member_id: nichaId,
          partner_id: '22222222-2222-2222-2222-222222222222',
          method: 'scan',
          status: 'success',
          note: 'Free day pass',
          redeemed_at: new Date(Date.now() - (8 + i * 7) * 24 * 60 * 60 * 1000).toISOString()
        });
      }
    }

    if (taroId) {
      // Taro verification
      await supabaseAdmin.from('verifications').insert({
        partner_id: '33333333-3333-3333-3333-333333333333',
        member_id: taroId,
        method: 'lookup',
        result: 'active',
        verified_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      });

      await supabaseAdmin.from('redemptions').insert({
        offer_id: 'offer-005',
        member_id: taroId,
        partner_id: '33333333-3333-3333-3333-333333333333',
        amount: 8000,
        currency: 'TWD',
        method: 'lookup',
        status: 'success',
        note: '20% discount',
        redeemed_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const error = err as Error;
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error?.message || 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});