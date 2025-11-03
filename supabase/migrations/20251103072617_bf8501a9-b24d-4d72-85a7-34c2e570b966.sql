-- Add sample partner data with coordinates for map testing
-- Only insert if no partners exist yet
INSERT INTO public.partners (id, display_name, legal_name, country_code, address, lat, lng, region, is_active, amenities, images)
SELECT * FROM (VALUES
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'True Digital Park Bangkok',
    'True Digital Park Co., Ltd.',
    'TH',
    '101 True Digital Park, Sukhumvit Rd, Bangkok 10110',
    13.721909,
    100.568831,
    'local'::partner_region,
    true,
    ARRAY['High-Speed WiFi', 'Meeting Rooms', 'Event Space', 'Cafe', '24/7 Access'],
    ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800']
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    'Salt Fukuoka',
    'Salt Co., Ltd.',
    'JP',
    '1-1-1 Tenjin, Chuo-ku, Fukuoka 810-0001',
    33.590008,
    130.401716,
    'local'::partner_region,
    true,
    ARRAY['High-Speed WiFi', 'Private Booths', 'Lounge', 'Kitchen'],
    ARRAY['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800']
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    'CIT Taipei',
    'Taipei Innovation Center',
    'TW',
    'No. 1, Civic Blvd, Taipei City 104',
    25.043157,
    121.559777,
    'local'::partner_region,
    true,
    ARRAY['Maker Space', 'Event Hall', 'Mentorship', 'Networking'],
    ARRAY['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800']
  )
) AS new_partners (id, display_name, legal_name, country_code, address, lat, lng, region, is_active, amenities, images)
WHERE NOT EXISTS (SELECT 1 FROM public.partners WHERE id IN (
  '11111111-1111-1111-1111-111111111111'::uuid,
  '22222222-2222-2222-2222-222222222222'::uuid,
  '33333333-3333-3333-3333-333333333333'::uuid
));
