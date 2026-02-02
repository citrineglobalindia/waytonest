import { motion } from "framer-motion";
import { Building2, Mail, MessageSquare, Users, Star, TrendingUp } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useProperties } from "@/hooks/useProperties";
import { useContactLeads, useEnquiryLeads } from "@/hooks/useLeads";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useTestimonials } from "@/hooks/useTestimonials";

const AdminDashboard = () => {
  const { data: properties } = useProperties();
  const { data: contactLeads } = useContactLeads();
  const { data: enquiryLeads } = useEnquiryLeads();
  const { data: teamMembers } = useTeamMembers(false);
  const { data: testimonials } = useTestimonials(false);

  const stats = [
    { 
      icon: Building2, 
      label: "Properties", 
      value: properties?.length || 0,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    { 
      icon: Mail, 
      label: "Contact Leads", 
      value: contactLeads?.length || 0,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    { 
      icon: MessageSquare, 
      label: "Enquiry Leads", 
      value: enquiryLeads?.length || 0,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    { 
      icon: Users, 
      label: "Team Members", 
      value: teamMembers?.length || 0,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    { 
      icon: Star, 
      label: "Testimonials", 
      value: testimonials?.length || 0,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
  ];

  const newContactLeads = contactLeads?.filter(l => l.status === 'new').length || 0;
  const newEnquiryLeads = enquiryLeads?.filter(l => l.status === 'new').length || 0;

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border/50 p-6"
            >
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* New Leads Alert */}
          {(newContactLeads > 0 || newEnquiryLeads > 0) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary/10 border border-primary/30 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  New Leads
                </h3>
              </div>
              <div className="space-y-2">
                {newContactLeads > 0 && (
                  <p className="text-muted-foreground">
                    <span className="text-primary font-semibold">{newContactLeads}</span> new contact lead{newContactLeads > 1 ? 's' : ''} to review
                  </p>
                )}
                {newEnquiryLeads > 0 && (
                  <p className="text-muted-foreground">
                    <span className="text-primary font-semibold">{newEnquiryLeads}</span> new property enquir{newEnquiryLeads > 1 ? 'ies' : 'y'} to review
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border/50 rounded-xl p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Featured Properties</span>
                <span className="font-semibold text-foreground">
                  {properties?.filter(p => p.featured).length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Team Members</span>
                <span className="font-semibold text-foreground">
                  {teamMembers?.filter(m => m.is_active).length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Testimonials</span>
                <span className="font-semibold text-foreground">
                  {testimonials?.filter(t => t.is_active).length || 0}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
