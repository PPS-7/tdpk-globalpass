-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('member', 'partner_user', 'admin');
CREATE TYPE member_status AS ENUM ('active', 'expired', 'suspended', 'trial');
CREATE TYPE member_tier AS ENUM ('Member', 'Tenant', 'Global');
CREATE TYPE partner_region AS ENUM ('local', 'regional', 'global');
CREATE TYPE offer_type AS ENUM ('perk', 'voucher', 'package');
CREATE TYPE offer_visibility AS ENUM ('public', 'members');
CREATE TYPE voucher_status AS ENUM ('available', 'redeemed', 'expired');
CREATE TYPE redemption_status AS ENUM ('success', 'rejected');
CREATE TYPE redemption_method AS ENUM ('scan', 'lookup', 'api', 'code');
CREATE TYPE verification_method AS ENUM ('qr', 'lookup', 'api');
CREATE TYPE verification_result AS ENUM ('active', 'expired', 'not_found', 'suspended');
CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'trialing', 'unpaid');

-- Users table (extends auth.users conceptually)
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'member',
  partner_id uuid,
  two_factor_secret text,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Members table
CREATE TABLE members (
  id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  country_code text DEFAULT 'TH',
  status member_status NOT NULL DEFAULT 'trial',
  tier member_tier NOT NULL DEFAULT 'Member',
  tenant_ref text,
  photo_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Plans table
CREATE TABLE plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  currency text NOT NULL,
  amount integer NOT NULL,
  interval text NOT NULL DEFAULT 'month',
  features_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id uuid NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  provider text NOT NULL DEFAULT 'stripe',
  provider_customer_id text,
  provider_sub_id text,
  plan_id uuid REFERENCES plans(id),
  currency text NOT NULL,
  amount integer NOT NULL,
  status subscription_status NOT NULL DEFAULT 'trialing',
  current_period_start timestamptz,
  current_period_end timestamptz,
  canceled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Partners table
CREATE TABLE partners (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  legal_name text NOT NULL,
  display_name text NOT NULL,
  region partner_region NOT NULL DEFAULT 'local',
  country_code text NOT NULL,
  address text,
  lat numeric,
  lng numeric,
  primary_contact_name text,
  primary_contact_email text,
  timezone text DEFAULT 'Asia/Bangkok',
  tax_profile_json jsonb,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Partner users table
CREATE TABLE partner_users (
  id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  partner_id uuid NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'staff',
  permissions_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Offers table
CREATE TABLE offers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id uuid NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  type offer_type NOT NULL,
  title text NOT NULL,
  description_i18n jsonb,
  visibility offer_visibility NOT NULL DEFAULT 'members',
  eligibility_tiers member_tier[] NOT NULL DEFAULT ARRAY['Member']::member_tier[],
  rules_json jsonb,
  price_amount integer,
  price_currency text,
  active_from timestamptz,
  active_through timestamptz,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Vouchers table
CREATE TABLE vouchers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  offer_id uuid NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  code text UNIQUE NOT NULL,
  status voucher_status NOT NULL DEFAULT 'available',
  expires_at timestamptz,
  assigned_member_id uuid REFERENCES members(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Redemptions table
CREATE TABLE redemptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  offer_id uuid NOT NULL REFERENCES offers(id),
  member_id uuid NOT NULL REFERENCES members(id),
  partner_id uuid NOT NULL REFERENCES partners(id),
  amount integer,
  currency text,
  method redemption_method NOT NULL,
  status redemption_status NOT NULL DEFAULT 'success',
  note text,
  redeemed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Verifications table
CREATE TABLE verifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id uuid NOT NULL REFERENCES partners(id),
  member_id uuid REFERENCES members(id),
  method verification_method NOT NULL,
  result verification_result NOT NULL,
  device_id text,
  ip text,
  geo_json jsonb,
  verified_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- QR tokens table
CREATE TABLE qr_tokens (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id uuid NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  jti text UNIQUE NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  revoked boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Audit logs table
CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_user_id uuid REFERENCES users(id),
  actor_role text,
  action text NOT NULL,
  entity_table text,
  entity_id uuid,
  diff_json jsonb,
  ip text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- i18n strings table
CREATE TABLE i18n_strings (
  key text PRIMARY KEY,
  en text,
  th text,
  ja text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Settings table
CREATE TABLE settings (
  key text PRIMARY KEY,
  value_json jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_members_tier ON members(tier);
CREATE INDEX idx_subscriptions_member_id ON subscriptions(member_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_partners_country_code ON partners(country_code);
CREATE INDEX idx_partners_region ON partners(region);
CREATE INDEX idx_offers_partner_id ON offers(partner_id);
CREATE INDEX idx_offers_type ON offers(type);
CREATE INDEX idx_redemptions_member_id ON redemptions(member_id);
CREATE INDEX idx_redemptions_partner_id ON redemptions(partner_id);
CREATE INDEX idx_redemptions_redeemed_at ON redemptions(redeemed_at);
CREATE INDEX idx_verifications_partner_id ON verifications(partner_id);
CREATE INDEX idx_verifications_member_id ON verifications(member_id);
CREATE INDEX idx_qr_tokens_member_id ON qr_tokens(member_id);
CREATE INDEX idx_qr_tokens_jti ON qr_tokens(jti);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE i18n_strings ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for members
CREATE POLICY "Members can view own data" ON members FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Members can update own data" ON members FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for plans
CREATE POLICY "Plans are viewable by everyone" ON plans FOR SELECT USING (true);

-- RLS Policies for subscriptions
CREATE POLICY "Members can view own subscriptions" ON subscriptions FOR SELECT USING (
  EXISTS (SELECT 1 FROM members WHERE members.id = subscriptions.member_id AND members.id = auth.uid())
);

-- RLS Policies for partners
CREATE POLICY "Partners are viewable by authenticated users" ON partners FOR SELECT TO authenticated USING (true);

-- RLS Policies for partner_users
CREATE POLICY "Partner users can view own data" ON partner_users FOR SELECT USING (auth.uid() = id);

-- RLS Policies for offers
CREATE POLICY "Offers are viewable by authenticated users" ON offers FOR SELECT TO authenticated USING (true);

-- RLS Policies for redemptions
CREATE POLICY "Members can view own redemptions" ON redemptions FOR SELECT USING (
  EXISTS (SELECT 1 FROM members WHERE members.id = redemptions.member_id AND members.id = auth.uid())
);

-- RLS Policies for qr_tokens
CREATE POLICY "Members can view own qr tokens" ON qr_tokens FOR SELECT USING (
  EXISTS (SELECT 1 FROM members WHERE members.id = qr_tokens.member_id AND members.id = auth.uid())
);
CREATE POLICY "Members can create own qr tokens" ON qr_tokens FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM members WHERE members.id = qr_tokens.member_id AND members.id = auth.uid())
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partner_users_updated_at BEFORE UPDATE ON partner_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON offers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vouchers_updated_at BEFORE UPDATE ON vouchers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_i18n_strings_updated_at BEFORE UPDATE ON i18n_strings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();