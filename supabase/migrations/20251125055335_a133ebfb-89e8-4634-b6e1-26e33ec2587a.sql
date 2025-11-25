-- Add category column to partners table for better organization
ALTER TABLE public.partners 
ADD COLUMN category text DEFAULT 'Corporates';

-- Add check constraint for valid categories
ALTER TABLE public.partners
ADD CONSTRAINT partners_category_check 
CHECK (category IN ('Corporates', 'Startups & SMEs', 'Universities & Academies', 'Government & Associations', 'Investors'));