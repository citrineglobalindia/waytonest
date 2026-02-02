import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadPopup } from "@/components/forms/LeadPopup";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/properties" },
  { name: "About Us", path: "/about" },
  { name: "Team", path: "/team" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
];

const PHONE_NUMBER = "+919739612117";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-strong py-2 shadow-elevated"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center"
              >
                <img 
                  src={logo} 
                  alt="Way to Nest" 
                  className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 group"
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-1/2 h-[2px] bg-primary"
                    initial={{ width: 0, x: "-50%" }}
                    animate={{
                      width: location.pathname === link.path ? "50%" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA Buttons & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Call Now Button */}
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden sm:flex items-center gap-2"
              >
                <a href={`tel:${PHONE_NUMBER}`}>
                  <Phone className="w-4 h-4" />
                  <span className="hidden lg:inline">Call Now</span>
                </a>
              </Button>

              {/* Enquire Now Button - Opens Popup */}
              <Button
                variant="hero"
                size="sm"
                onClick={() => setIsLeadPopupOpen(true)}
                className="hidden md:flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire Now</span>
              </Button>

              {/* Mobile Call Button */}
              <Button
                variant="outline"
                size="icon"
                asChild
                className="md:hidden w-9 h-9"
              >
                <a href={`tel:${PHONE_NUMBER}`}>
                  <Phone className="w-4 h-4" />
                </a>
              </Button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative z-10 p-2 text-foreground hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            <nav className="relative h-full flex flex-col items-center justify-center gap-6 p-8">
              {/* Logo in mobile menu */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4"
              >
                <img 
                  src={logo} 
                  alt="Way to Nest" 
                  className="h-20 w-auto object-contain"
                />
              </motion.div>
              
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`text-2xl font-display font-medium transition-colors ${
                      location.pathname === link.path
                        ? "text-primary text-glow"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-6 flex flex-col gap-3"
              >
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLeadPopupOpen(true);
                  }}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Enquire Now</span>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={`tel:${PHONE_NUMBER}`}>
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </a>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Popup */}
      <LeadPopup 
        isOpen={isLeadPopupOpen} 
        onClose={() => setIsLeadPopupOpen(false)} 
      />
    </>
  );
};
