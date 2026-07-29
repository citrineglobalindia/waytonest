CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gallery_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active gallery images"
ON public.gallery_images FOR SELECT TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Admins can manage gallery images"
ON public.gallery_images FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_gallery_images_updated_at
BEFORE UPDATE ON public.gallery_images
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();