import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

interface LogoLoaderProps {
  size?: "sm" | "md" | "lg" | "full";
  text?: string;
}

export const LogoLoader = ({ size = "md", text = "Loading..." }: LogoLoaderProps) => {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    full: "w-40 h-40",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Logo with animations */}
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className={`${sizes[size]} rounded-full border-2 border-primary/20 border-t-primary absolute inset-0`}
        />
        
        {/* Inner pulsing glow */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`${sizes[size]} absolute inset-0 rounded-full bg-primary/20 blur-xl`}
        />
        
        {/* Logo */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`${sizes[size]} relative z-10 flex items-center justify-center`}
        >
          <img 
            src={logo} 
            alt="Way to Nest" 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]"
          />
        </motion.div>
      </div>

      {/* Loading text with dots animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-1"
      >
        <span className="text-sm font-medium text-muted-foreground">{text}</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
          className="text-primary"
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1], delay: 0.2 }}
          className="text-primary"
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1], delay: 0.4 }}
          className="text-primary"
        >
          .
        </motion.span>
      </motion.div>
    </div>
  );
};

// Full page loader
export const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10">
        <LogoLoader size="full" text="Loading Experience" />
      </div>
    </motion.div>
  );
};
