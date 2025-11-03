-- Update users table to include partner_id if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'users' 
    AND column_name = 'partner_id'
  ) THEN
    ALTER TABLE public.users ADD COLUMN partner_id uuid REFERENCES public.partners(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Update partners table with all required fields
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'partners' AND column_name = 'amenities') THEN
    ALTER TABLE public.partners ADD COLUMN amenities text[] DEFAULT '{}';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'partners' AND column_name = 'images') THEN
    ALTER TABLE public.partners ADD COLUMN images text[] DEFAULT '{}';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'partners' AND column_name = 'is_active') THEN
    ALTER TABLE public.partners ADD COLUMN is_active boolean DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'partners' AND column_name = 'phone') THEN
    ALTER TABLE public.partners ADD COLUMN phone text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'partners' AND column_name = 'website') THEN
    ALTER TABLE public.partners ADD COLUMN website text;
  END IF;
END $$;

-- Update subscriptions table with Stripe fields
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'stripe_customer_id') THEN
    ALTER TABLE public.subscriptions ADD COLUMN stripe_customer_id text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'stripe_subscription_id') THEN
    ALTER TABLE public.subscriptions ADD COLUMN stripe_subscription_id text;
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(member_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON public.subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_partners_country ON public.partners(country_code);
CREATE INDEX IF NOT EXISTS idx_partners_active ON public.partners(status);

-- Update offers table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'offers' AND column_name = 'redemption_instructions') THEN
    ALTER TABLE public.offers ADD COLUMN redemption_instructions text;
  END IF;
END $$;

-- Create index for QR token lookups if table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'qr_tokens') THEN
    CREATE INDEX IF NOT EXISTS idx_qr_tokens_jti ON public.qr_tokens(jti);
    CREATE INDEX IF NOT EXISTS idx_qr_tokens_member_id ON public.qr_tokens(member_id);
  END IF;
END $$;

-- Add RLS policies only if they don't exist
DO $$
BEGIN
  -- Partner users can update own partner data
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'partners' 
    AND policyname = 'Partner users can update own partner data'
  ) THEN
    CREATE POLICY "Partner users can update own partner data"
      ON public.partners
      FOR UPDATE
      USING (
        EXISTS (
          SELECT 1 FROM public.partner_users
          WHERE partner_users.partner_id = partners.id
            AND partner_users.id = auth.uid()
        )
      );
  END IF;

  -- Members can view own verifications
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'verifications' 
    AND policyname = 'Members can view own verifications'
  ) THEN
    CREATE POLICY "Members can view own verifications"
      ON public.verifications
      FOR SELECT
      USING (member_id = auth.uid());
  END IF;

  -- Admins can manage partners
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'partners' 
    AND policyname = 'Admins can manage partners'
  ) THEN
    CREATE POLICY "Admins can manage partners"
      ON public.partners
      FOR ALL
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;

  -- Admins can manage offers
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'offers' 
    AND policyname = 'Admins can manage offers'
  ) THEN
    CREATE POLICY "Admins can manage offers"
      ON public.offers
      FOR ALL
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;

  -- Admins can view all subscriptions
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'subscriptions' 
    AND policyname = 'Admins can view all subscriptions'
  ) THEN
    CREATE POLICY "Admins can view all subscriptions"
      ON public.subscriptions
      FOR SELECT
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;

  -- Admins can view all verifications
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'verifications' 
    AND policyname = 'Admins can view all verifications'
  ) THEN
    CREATE POLICY "Admins can view all verifications"
      ON public.verifications
      FOR SELECT
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;