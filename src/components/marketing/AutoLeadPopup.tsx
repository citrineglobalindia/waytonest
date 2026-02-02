import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Gift, User, Mail, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  hasSeenLeadPopup, 
  markLeadPopupShown, 
  trackLeadSubmission,
  trackEvent,
  getCookie
} from "@/lib/marketing";

interface AutoLeadPopupProps {
  delay?: number; // Time in ms before showing popup
  exitIntent?: boolean; // Show on exit intent
}

export const AutoLeadPopup = ({ delay = 15000, exitIntent = true }: AutoLeadPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showPopup = useCallback(() => {
    if (hasTriggered || hasSeenLeadPopup()) return;
    
    // Only show if cookies accepted or not answered yet
    const consent = getCookie('wtn_cookie_consent');
    if (consent === 'declined') return;
    
    setIsOpen(true);
    setHasTriggered(true);
    markLeadPopupShown();
    trackEvent('lead_popup_shown', { trigger: 'auto' });
  }, [hasTriggered]);

  // Time-based trigger
  useEffect(() => {
    if (hasSeenLeadPopup()) return;
    
    const timer = setTimeout(() => {
      showPopup();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, showPopup]);

  // Exit intent trigger
  useEffect(() => {
    if (!exitIntent || hasSeenLeadPopup()) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [exitIntent, showPopup]);

  // Scroll-based trigger (50% scroll)
  useEffect(() => {
    if (hasSeenLeadPopup()) return;

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50) {
        showPopup();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showPopup]);

  const handleClose = () => {
    setIsOpen(false);
    trackEvent('lead_popup_closed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    trackLeadSubmission({
      ...formData,
      source: 'auto_popup',
      page: window.location.pathname,
    });

    toast.success("Thank you! We'll contact you with an exclusive offer shortly.");
    setFormData({ name: "", email: "", phone: "" });
    setIsSubmitting(false);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
          >
            <div className="relative mx-4 glass-strong rounded-2xl border border-border/50 shadow-elevated overflow-hidden">
              {/* Top glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center"
                  >
                    <Gift className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Exclusive Offer!
                  </h3>
                  <p className="text-muted-foreground">
                    Get <span className="text-primary font-semibold">early access</span> to our newest luxury listings 
                    and receive a free property consultation.
                  </p>
                </div>

                {/* Benefits */}
                <div className="flex justify-center gap-6 mb-6">
                  {["VIP Access", "Expert Advice", "No Obligation"].map((benefit, i) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-1 text-xs text-muted-foreground"
                    >
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Claim My Exclusive Access
                      </span>
                    )}
                  </Button>
                </form>

                <p className="mt-4 text-xs text-center text-muted-foreground">
                  By submitting, you agree to receive communications from Way to Nest. 
                  Unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
