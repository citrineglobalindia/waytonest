import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube,
  ArrowUpRight
} from "lucide-react";
import logo from "@/assets/logo.png";

const quickLinks = [
  { name: "Properties", path: "/properties" },
  { name: "About Us", path: "/about" },
  { name: "Our Team", path: "/team" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Gallery", path: "/gallery" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];


const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61578944082753", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/way_to_nest/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCVDcP3MGJWUuSVHZd_FiI3Q", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="relative bg-card border-t border-border/50">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={logo} 
                alt="Way to Nest" 
                className="h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Discover exceptional properties that redefine luxury living. 
              Your dream home awaits with Way to Nest.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  3rd floor, 201, Swamy Vivekananda Rd,<br />
                  2nd Cross Rd, Narayana Nagar 1st Block,<br />
                  Bangalore City Municipal Corporation Layout,<br />
                  Bengaluru, Karnataka 560062
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a 
                    href="tel:+919739612117" 
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    +91 97396 12117
                  </a>
                  <a 
                    href="tel:+919845290699" 
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    +91 98452 90699
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a 
                  href="mailto:info@waytonest.in" 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  info@waytonest.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Way to Nest Private Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                to="/privacy" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Designed and Developed by{" "}
              <a 
                href="https://stepstones.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Stepstones
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
