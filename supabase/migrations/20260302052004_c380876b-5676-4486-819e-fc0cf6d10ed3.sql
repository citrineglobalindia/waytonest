
-- Add source tracking columns to testimonials
ALTER TABLE public.testimonials 
ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS google_review_id text UNIQUE;

-- Add index for google_review_id lookups
CREATE INDEX IF NOT EXISTS idx_testimonials_google_review_id ON public.testimonials(google_review_id) WHERE google_review_id IS NOT NULL;
