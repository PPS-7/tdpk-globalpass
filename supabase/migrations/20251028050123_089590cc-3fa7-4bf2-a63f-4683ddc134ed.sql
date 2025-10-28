-- Fix Issue #1: Remove dual role storage vulnerability
-- Drop the role column from users table (roles should only be in user_roles)
ALTER TABLE public.users DROP COLUMN IF EXISTS role;

-- Fix Issue #3: Add RLS policies for 5 tables with missing policies

-- 1. Audit logs: Admin read-only access
CREATE POLICY "Admins view audit logs"
  ON public.audit_logs 
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Settings: Admin full access
CREATE POLICY "Admins manage settings"
  ON public.settings 
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Vouchers: Members view assigned vouchers
CREATE POLICY "Members view assigned vouchers"
  ON public.vouchers 
  FOR SELECT
  USING (assigned_member_id = auth.uid());

-- Vouchers: Partners manage vouchers for their offers
CREATE POLICY "Partners manage own vouchers"
  ON public.vouchers 
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.partner_users pu
    JOIN public.offers o ON o.partner_id = pu.partner_id
    WHERE pu.id = auth.uid() AND o.id = vouchers.offer_id
  ));

-- 4. Verifications: Partners manage verifications for their location
CREATE POLICY "Partners manage verifications"
  ON public.verifications 
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.partner_users
    WHERE id = auth.uid() AND partner_id = verifications.partner_id
  ));

-- 5. i18n_strings: Public read access
CREATE POLICY "Public read translations"
  ON public.i18n_strings 
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- i18n_strings: Admin write access
CREATE POLICY "Admins manage translations"
  ON public.i18n_strings 
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Fix Issue #5 (bonus): Add search_path to update trigger function for security hardening
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;