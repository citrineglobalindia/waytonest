import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Gift, User, Mail, Phone, Sparkles, CheckCircle2 } from "lucide-react";
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
import logo from "@/assets/logo.png";

interface AutoLeadPopupProps {
  delay?: number;
  exitIntent?: boolean;
}

export const AutoLeadPopup = ({ delay = 15000, exitIntent = true }: AutoLeadPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const showPopup = useCallback(() => {
    if (hasTriggered || hasSeenLeadPopup()) return;
    
    const consent = getCookie('wtn_cookie_consent');
    if (consent === 'declined') return;
    
    setIsOpen(true);
    setHasTriggered(true);
    markLeadPopupShown();
    trackEvent('lead_popup_shown', { trigger: 'auto' });
  }, [hasTriggered]);

  useEffect(() => {
    if (hasSeenLeadPopup()) return;
    const timer = setTimeout(() => showPopup(), delay);
    return () => clearTimeout(timer);
  }, [delay, showPopup]);

  useEffect(() => {
    if (!exitIntent || hasSeenLeadPopup()) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) showPopup();
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [exitIntent, showPopup]);

  useEffect(() => {
    if (hasSeenLeadPopup()) return;
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50) showPopup();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showPopup]);

  const handleClose = () => {
    setIsOpen(false);
    setIsSuccess(false);
    trackEvent('lead_popup_closed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    trackLeadSubmission({
      ...formData,
      source: 'auto_popup',
      page: window.location.pathname,
    });

    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      toast.success("Thank you! We'll contact you shortly.");
      setFormData({ name: "", email: "", phone: "" });
      setIsOpen(false);
      setIsSuccess(false);
    }, 2000);
  };

  const benefits = [
    { text: "VIP Access", icon: Sparkles },
    { text: "Expert Advice", icon: CheckCircle2 },
    { text: "No Obligation", icon: Gift },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal - Properly Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
            >
              {/* Top gradient bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Header - Centered */}
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                          <img 
                            src={logo} 
                            alt="Way to Nest" 
                            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                          />
                        </div>
                        
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                          Exclusive Offer!
                        </h3>
                        
                        <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
                          Get <span className="text-primary font-semibold">early access</span> to our luxury listings 
                          and a <span className="text-primary font-semibold">free consultation</span>.
                        </p>
                      </div>

                      {/* Benefits - Centered Row */}
                      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
                        {benefits.map((benefit) => (
                          <div
                            key={benefit.text}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50"
                          >
                            <benefit.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span className="text-xs font-medium text-foreground whitespace-nowrap">{benefit.text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Form - Properly Aligned */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div className="relative">
                          <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                            focusedField === 'name' ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                          <Input
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full h-12 pl-11 pr-4 text-base bg-secondary/30 border-border focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg"
                          />
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                          <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                            focusedField === 'email' ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                          <Input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full h-12 pl-11 pr-4 text-base bg-secondary/30 border-border focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg"
                          />
                        </div>

                        {/* Phone Field */}
                        <div className="relative">
                          <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                            focusedField === 'phone' ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                          <Input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full h-12 pl-11 pr-4 text-base bg-secondary/30 border-border focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg"
                          />
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          variant="hero"
                          size="lg"
                          className="w-full h-12 text-base font-semibold"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                              <span>Processing...</span>
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <Send className="w-5 h-5" />
                              <span>Claim Exclusive Access</span>
                            </span>
                          )}
                        </Button>
                      </form>

                      {/* Footer Text - Centered */}
                      <p className="mt-4 text-xs text-center text-muted-foreground">
                        By submitting, you agree to receive communications from Way to Nest.
                      </p>
                    </motion.div>
                  ) : (
                    /* Success State */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        You're All Set!
                      </h3>
                      <p className="text-muted-foreground">
                        We'll contact you shortly with exclusive listings.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
