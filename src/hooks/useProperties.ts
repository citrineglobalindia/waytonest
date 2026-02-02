import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/safeClient';
import { Database } from '@/integrations/supabase/types';

type Property = Database['public']['Tables']['properties']['Row'];
type PropertyInsert = Database['public']['Tables']['properties']['Insert'];
type PropertyUpdate = Database['public']['Tables']['properties']['Update'];

export const useProperties = (featured?: boolean) => {
  return useQuery({
    queryKey: ['properties', featured],
    queryFn: async () => {
      let query = supabase.from('properties').select('*').order('created_at', { ascending: false });
      
      if (featured !== undefined) {
        query = query.eq('featured', featured);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Property[];
    },
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Property;
    },
    enabled: !!id,
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (property: PropertyInsert) => {
      const { data, error } = await supabase
        .from('properties')
        .insert(property)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...property }: PropertyUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('properties')
        .update(property)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};
