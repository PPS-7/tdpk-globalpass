-- Create app_role enum for proper role management
CREATE TYPE public.app_role AS ENUM ('admin', 'partner_user', 'member');

-- Create user_roles table (security best practice)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Insert Plans
INSERT INTO public.plans (code, name, currency, amount, interval, features_json) VALUES
('MEMBER_THB_299', 'TDPK Member Pass', 'THB', 29900, 'month', '{"access": "local", "perks": true, "partners": "regional"}'),
('GLOBAL_THB_599', 'TDPK Global Pass', 'THB', 59900, 'month', '{"access": "global", "perks": true, "partners": "worldwide", "priority_support": true}'),
('MEMBER_JPY_1500', 'TDPK Member Pass', 'JPY', 150000, 'month', '{"access": "local", "perks": true, "partners": "regional"}');

-- Insert Partners
INSERT INTO public.partners (id, legal_name, display_name, region, country_code, address, lat, lng, primary_contact_name, primary_contact_email, timezone, status) VALUES
('11111111-1111-1111-1111-111111111111', 'TrueSpace Co., Ltd.', 'TrueSpace Bangkok', 'regional', 'TH', '101 True Digital Park, Sukhumvit Road, Bangkok', 13.7218, 100.5939, 'Somchai Lee', 'contact@truespace.co.th', 'Asia/Bangkok', 'active'),
('22222222-2222-2222-2222-222222222222', 'SALT Fukuoka KK', 'SALT Fukuoka', 'regional', 'JP', '1-1-1 Tenjin, Chuo-ku, Fukuoka', 33.5904, 130.4017, 'Takumi Sato', 'hello@salt.jp', 'Asia/Tokyo', 'active'),
('33333333-3333-3333-3333-333333333333', 'InnoPad Taiwan Ltd.', 'InnoPad Taipei Hub', 'local', 'TW', '100 Xinyi Road, Taipei', 25.0330, 121.5654, 'Sonya Chen', 'info@innopad.tw', 'Asia/Taipei', 'active');

-- Insert Offers
INSERT INTO public.offers (id, partner_id, type, title, description_i18n, visibility, eligibility_tiers, price_amount, price_currency, active_from, active_through, status) VALUES
('00000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'perk', '10% off day pass for TDPK Members', '{"en": "Enjoy 10% discount on all day passes at TrueSpace Bangkok", "th": "รับส่วนลด 10% สำหรับบัตรรายวันที่ TrueSpace Bangkok", "ja": "TrueSpace バンコクの1日パスが10%オフ"}', 'members', ARRAY['Member'::member_tier, 'Tenant'::member_tier, 'Global'::member_tier], NULL, NULL, now(), now() + interval '365 days', 'active'),
('00000002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'package', 'Buy 5 day passes, get 1 free', '{"en": "Purchase 5 day passes and receive 1 additional day pass free", "th": "ซื้อ 5 วัน แถม 1 วัน", "ja": "5日パス購入で1日無料"}', 'members', ARRAY['Member'::member_tier, 'Tenant'::member_tier, 'Global'::member_tier], 149500, 'THB', now(), now() + interval '365 days', 'active'),
('00000003-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'voucher', 'Free 1-day coworking for Global Pass holders', '{"en": "Complimentary 1-day coworking access for TDPK Global members", "th": "ฟรี 1 วัน สำหรับสมาชิก Global", "ja": "グローバル会員向け1日無料コワーキング"}', 'members', ARRAY['Global'::member_tier], NULL, NULL, now(), now() + interval '180 days', 'active'),
('00000004-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'package', 'Weekend Flex Desk Plan – ¥3,500', '{"en": "Flexible weekend desk access for just ¥3,500", "th": "โต๊ะยืดหยุ่นช่วงสุดสัปดาห์ ¥3,500", "ja": "週末フレックスデスクプラン ¥3,500"}', 'members', ARRAY['Member'::member_tier, 'Tenant'::member_tier, 'Global'::member_tier], 350000, 'JPY', now(), now() + interval '365 days', 'active'),
('00000005-0000-0000-0000-000000000005', '33333333-3333-3333-3333-333333333333', 'perk', '20% discount for all TDPK members', '{"en": "Enjoy 20% off all services at InnoPad Taipei", "th": "รับส่วนลด 20% สำหรับบริการทั้งหมด", "ja": "全サービス20%オフ"}', 'members', ARRAY['Member'::member_tier, 'Tenant'::member_tier, 'Global'::member_tier], NULL, NULL, now(), now() + interval '365 days', 'active');

-- Insert i18n strings
INSERT INTO public.i18n_strings (key, en, th, ja) VALUES
('app.title', 'TDPK Member Pass', 'TDPK สมาชิก', 'TDPK会員パス'),
('member.status.active', 'Active', 'ใช้งานอยู่', 'アクティブ'),
('member.status.expired', 'Expired', 'หมดอายุ', '期限切れ'),
('member.tier.member', 'Member', 'สมาชิก', 'メンバー'),
('member.tier.tenant', 'Tenant', 'ผู้เช่า', 'テナント'),
('member.tier.global', 'Global', 'โกลบอล', 'グローバル'),
('offer.type.perk', 'Perk', 'สิทธิพิเศษ', '特典'),
('offer.type.voucher', 'Voucher', 'บัตรกำนัล', 'バウチャー'),
('offer.type.package', 'Package', 'แพ็คเกจ', 'パッケージ');

-- Insert settings
INSERT INTO public.settings (key, value_json) VALUES
('demo_mode', '{"enabled": false, "reset_on_startup": false}'),
('currencies', '{"enabled": ["THB", "JPY", "TWD"], "default": "THB"}'),
('languages', '{"enabled": ["en", "th", "ja"], "default": "en"}'),
('map_config', '{"default_zoom": 12, "cluster_enabled": true}');