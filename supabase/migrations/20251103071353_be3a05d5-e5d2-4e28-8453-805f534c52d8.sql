-- Create yearly subscription plans with proper pricing
INSERT INTO public.plans (code, name, amount, currency, interval, features_json) VALUES
  (
    'MEMBER_THB_1188',
    'Member Yearly',
    118800,
    'THB',
    'year',
    '{"features": ["Access to local coworking network", "10 hours/month meeting room credits", "Basic member perks", "Digital QR pass", "Mobile app access"], "description": "Perfect for local professionals"}'
  ),
  (
    'MEMBER_PLUS_THB_2388',
    'Member Plus Yearly',
    238800,
    'THB',
    'year',
    '{"features": ["Regional network access (Thailand + nearby countries)", "20 hours/month meeting room credits", "Premium member perks", "Priority customer support", "Exclusive event invites", "Digital QR pass"], "description": "Best value for frequent travelers"}'
  ),
  (
    'GLOBAL_THB_3588',
    'Tenant Global Yearly',
    358800,
    'THB',
    'year',
    '{"features": ["Global network access (all partner spaces)", "Unlimited meeting room hours", "VIP perks & discounts", "Dedicated account manager", "Priority space booking", "Exclusive global events", "Digital QR pass"], "description": "Ultimate access for global nomads"}'
  )
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  amount = EXCLUDED.amount,
  currency = EXCLUDED.currency,
  interval = EXCLUDED.interval,
  features_json = EXCLUDED.features_json;
