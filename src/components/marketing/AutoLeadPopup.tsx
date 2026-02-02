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
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container - Properly Centered */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.16, 1, 0.3, 1],
                scale: { type: "spring", damping: 25, stiffness: 300 }
              }}
              className="w-full max-w-lg pointer-events-auto"
            >
              <div className="relative bg-card rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
                {/* Animated top glow bar */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30 origin-center"
                />
                
                {/* Subtle corner glow effects */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Content */}
                <div className="relative p-8 md:p-10">
                  <AnimatePresence mode="wait">
                    {!isSuccess ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        {/* Header */}
                        <div className="text-center mb-8">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", damping: 12 }}
                            className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/10"
                          >
                            <Gift className="w-10 h-10 text-primary" />
                          </motion.div>
                          
                          <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="font-display text-3xl font-bold text-foreground mb-3"
                          >
                            Exclusive Offer!
                          </motion.h3>
                          
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="text-muted-foreground leading-relaxed"
                          >
                            Get <span className="text-primary font-semibold">early access</span> to our newest luxury listings 
                            and receive a <span className="text-primary font-semibold">free consultation</span>.
                          </motion.p>
                        </div>

                        {/* Benefits */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="flex justify-center gap-4 md:gap-6 mb-8"
                        >
                          {benefits.map((benefit, i) => (
                            <motion.div
                              key={benefit.text}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.45 + i * 0.08 }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/50 border border-border/50"
                            >
                              <benefit.icon className="w-4 h-4 text-primary" />
                              <span className="text-xs font-medium text-foreground">{benefit.text}</span>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Form */}
                        <motion.form 
                          onSubmit={handleSubmit} 
                          className="space-y-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {[
                            { name: "name", icon: User, placeholder: "Your Name", type: "text" },
                            { name: "email", icon: Mail, placeholder: "Email Address", type: "email" },
                            { name: "phone", icon: Phone, placeholder: "Phone Number", type: "tel" },
                          ].map((field, index) => (
                            <motion.div
                              key={field.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.55 + index * 0.08 }}
                              className="relative group"
                            >
                              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                                focusedField === field.name ? 'text-primary' : 'text-muted-foreground'
                              }`}>
                                <field.icon className="w-5 h-5" />
                              </div>
                              <Input
                                type={field.type}
                                placeholder={field.placeholder}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                onFocus={() => setFocusedField(field.name)}
                                onBlur={() => setFocusedField(null)}
                                required
                                className={`pl-12 h-14 text-base bg-secondary/30 border-2 rounded-xl transition-all duration-300 ${
                                  focusedField === field.name 
                                    ? 'border-primary shadow-lg shadow-primary/10 bg-secondary/50' 
                                    : 'border-border/50 hover:border-border'
                                }`}
                              />
                              {/* Animated focus ring */}
                              <motion.div
                                initial={false}
                                animate={{ 
                                  opacity: focusedField === field.name ? 1 : 0,
                                  scale: focusedField === field.name ? 1 : 0.95
                                }}
                                className="absolute inset-0 rounded-xl border-2 border-primary/30 pointer-events-none"
                              />
                            </motion.div>
                          ))}

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                          >
                            <Button
                              type="submit"
                              variant="hero"
                              size="xl"
                              className="w-full h-14 text-base font-semibold mt-2"
                              disabled={isSubmitting}
                            >
                              <AnimatePresence mode="wait">
                                {isSubmitting ? (
                                  <motion.span
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-3"
                                  >
                                    <motion.span 
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                                    />
                                    Processing...
                                  </motion.span>
                                ) : (
                                  <motion.span
                                    key="submit"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                  >
                                    <Send className="w-5 h-5" />
                                    Claim My Exclusive Access
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </Button>
                          </motion.div>
                        </motion.form>

                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                          className="mt-5 text-xs text-center text-muted-foreground"
                        >
                          By submitting, you agree to receive communications from Way to Nest.
                        </motion.p>
                      </motion.div>
                    ) : (
                      /* Success State */
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 10 }}
                          className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                          >
                            <CheckCircle2 className="w-12 h-12 text-primary" />
                          </motion.div>
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="font-display text-2xl font-bold text-foreground mb-2"
                        >
                          You're All Set!
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-muted-foreground"
                        >
                          Our team will contact you shortly with exclusive listings.
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
