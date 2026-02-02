import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/safeClient';
import { Database } from '@/integrations/supabase/types';

type TeamMember = Database['public']['Tables']['team_members']['Row'];
type TeamMemberInsert = Database['public']['Tables']['team_members']['Insert'];
type TeamMemberUpdate = Database['public']['Tables']['team_members']['Update'];

export const useTeamMembers = (activeOnly: boolean = true) => {
  return useQuery({
    queryKey: ['team_members', activeOnly],
    queryFn: async () => {
      let query = supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (activeOnly) {
        query = query.eq('is_active', true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as TeamMember[];
    },
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (member: TeamMemberInsert) => {
      const { data, error } = await supabase
        .from('team_members')
        .insert(member)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team_members'] });
    },
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...member }: TeamMemberUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('team_members')
        .update(member)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team_members'] });
    },
  });
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team_members'] });
    },
  });
};
