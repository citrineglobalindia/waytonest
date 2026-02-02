import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type LeadStatus = Database['public']['Enums']['lead_status'];
type ContactLead = Database['public']['Tables']['contact_leads']['Row'];
type EnquiryLead = Database['public']['Tables']['enquiry_leads']['Row'];

export const useContactLeads = () => {
  return useQuery({
    queryKey: ['contact_leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ContactLead[];
    },
  });
};

export const useEnquiryLeads = () => {
  return useQuery({
    queryKey: ['enquiry_leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enquiry_leads')
        .select('*, properties(title)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as (EnquiryLead & { properties: { title: string } | null })[];
    },
  });
};

export const useUpdateContactLeadStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      const { data, error } = await supabase
        .from('contact_leads')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_leads'] });
    },
  });
};

export const useUpdateEnquiryLeadStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      const { data, error } = await supabase
        .from('enquiry_leads')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiry_leads'] });
    },
  });
};

export const useCreateContactLead = () => {
  return useMutation({
    mutationFn: async (lead: { name: string; email: string; phone?: string; message?: string }) => {
      const { data, error } = await supabase
        .from('contact_leads')
        .insert(lead)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateEnquiryLead = () => {
  return useMutation({
    mutationFn: async (lead: { name: string; email: string; phone?: string; message?: string; property_id?: string }) => {
      const { data, error } = await supabase
        .from('enquiry_leads')
        .insert(lead)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });
};
