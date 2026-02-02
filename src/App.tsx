import { useState, useEffect, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Team from "./pages/Team";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminContactLeads from "./pages/admin/AdminContactLeads";
import AdminEnquiryLeads from "./pages/admin/AdminEnquiryLeads";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import { CookieConsent } from "./components/marketing/CookieConsent";
import { AutoLeadPopup } from "./components/marketing/AutoLeadPopup";
import { PageTracker } from "./components/marketing/PageTracker";
import { PageLoader } from "./components/ui/LogoLoader";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {isLoading ? (
            <PageLoader key="loader" />
          ) : (
            <BrowserRouter>
              <AuthProvider>
                <PageTracker />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/properties/:id" element={<PropertyDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Admin Auth */}
                  <Route path="/admin/auth" element={<AdminAuth />} />
                  
                  {/* Protected Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/properties"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminProperties />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/contact-leads"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminContactLeads />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/enquiry-leads"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminEnquiryLeads />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/team"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminTeam />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/testimonials"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminTestimonials />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <CookieConsent />
                <AutoLeadPopup delay={20000} exitIntent={true} />
              </AuthProvider>
            </BrowserRouter>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
