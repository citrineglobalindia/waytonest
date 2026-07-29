import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/safeClient';
import { Database } from '@/integrations/supabase/types';

type GalleryImage = Database['public']['Tables']['gallery_images']['Row'];
type GalleryImageInsert = Database['public']['Tables']['gallery_images']['Insert'];
type GalleryImageUpdate = Database['public']['Tables']['gallery_images']['Update'];

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export const useGalleryImages = (activeOnly: boolean = true) => {
  return useQuery({
    queryKey: ['gallery_images', activeOnly],
    queryFn: async () => {
      let query = supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (activeOnly) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as GalleryImage[];
    },
  });
};

export const uploadGalleryImage = async (file: File) => {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(path, file, { cacheControl: '31536000', upsert: false });
  if (uploadError) throw uploadError;

  const { data, error } = await supabase.storage
    .from('gallery')
    .createSignedUrl(path, TEN_YEARS);
  if (error) throw error;

  return data.signedUrl;
};

export const useCreateGalleryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (image: GalleryImageInsert) => {
      const { data, error } = await supabase
        .from('gallery_images')
        .insert(image)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery_images'] }),
  });
};

export const useUpdateGalleryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...image }: GalleryImageUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('gallery_images')
        .update(image)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery_images'] }),
  });
};

export const useDeleteGalleryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('gallery_images').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery_images'] }),
  });
};
