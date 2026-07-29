CREATE POLICY "Anyone can read gallery files"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload gallery files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gallery files"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gallery files"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'::app_role));