import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEnquiryLeads, useUpdateEnquiryLeadStatus } from "@/hooks/useLeads";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type LeadStatus = Database['public']['Enums']['lead_status'];

const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  contacted: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  qualified: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  converted: "bg-green-500/10 text-green-500 border-green-500/30",
  closed: "bg-gray-500/10 text-gray-500 border-gray-500/30",
};

const AdminEnquiryLeads = () => {
  const { data: leads, isLoading } = useEnquiryLeads();
  const updateStatus = useUpdateEnquiryLeadStatus();

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <AdminLayout title="Enquiry Leads">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Manage property enquiry submissions
        </p>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl border border-border/50 p-6 animate-pulse">
                <div className="h-6 bg-secondary rounded w-1/4 mb-4" />
                <div className="h-4 bg-secondary rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : leads?.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No enquiry leads yet</h3>
            <p className="text-muted-foreground">Property enquiries will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads?.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl border border-border/50 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{lead.name}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </div>
                    {lead.properties && (
                      <p className="text-primary font-medium text-sm mb-2">
                        Property: {lead.properties.title}
                      </p>
                    )}
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><strong>Email:</strong> {lead.email}</p>
                      {lead.phone && <p><strong>Phone:</strong> {lead.phone}</p>}
                      {lead.message && <p className="mt-2">{lead.message}</p>}
                    </div>
                    <p className="text-xs text-muted-foreground/70 mt-3">
                      {new Date(lead.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Select
                      value={lead.status}
                      onValueChange={(value) => handleStatusChange(lead.id, value as LeadStatus)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEnquiryLeads;
