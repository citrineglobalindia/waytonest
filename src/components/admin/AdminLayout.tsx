import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  MessageSquare, 
  Mail, 
  Star,
  LogOut,
  Menu,
  X,
  Home,
  Images
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Building2, label: "Properties", path: "/admin/properties" },
  { icon: Mail, label: "Contact Leads", path: "/admin/contact-leads" },
  { icon: MessageSquare, label: "Enquiry Leads", path: "/admin/enquiry-leads" },
  { icon: Users, label: "Team", path: "/admin/team" },
  { icon: Star, label: "Testimonials", path: "/admin/testimonials" },
  { icon: Images, label: "Gallery", path: "/admin/gallery" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/auth");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border/50">
        <div className="p-6 border-b border-border/50">
          <Link to="/">
            <img src={logo} alt="Way to Nest" className="h-12" />
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">View Site</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border/50 z-50 lg:hidden"
      >
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Way to Nest" className="h-10" />
          </Link>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">View Site</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border/50 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-display text-xl font-semibold text-foreground">
              {title}
            </h1>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
