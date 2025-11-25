-- Update RLS policy to allow public read access to partners
DROP POLICY IF EXISTS "Partners are viewable by authenticated users" ON public.partners;

CREATE POLICY "Partners are viewable by everyone"
ON public.partners
FOR SELECT
USING (true);