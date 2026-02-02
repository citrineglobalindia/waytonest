import { motion } from "framer-motion";
import { Award, Target, Heart, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-luxury.jpg";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We uphold the highest standards in every aspect of our service, ensuring exceptional experiences for our clients.",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Every detail matters. We meticulously curate our portfolio to match your exact requirements.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Our love for real estate drives us to go above and beyond in finding your perfect home.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "We leverage cutting-edge technology and market insights to deliver superior results.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Redefining Luxury Living
            </h1>
            <p className="text-lg text-muted-foreground">
              For over 15 years, Way to Nest has been the trusted partner for 
              discerning clients seeking extraordinary properties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full">
                Our Story
              </span>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                A Legacy of Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2009, Way to Nest emerged from a vision to transform 
                  the luxury real estate experience. What began as a boutique agency 
                  has evolved into a premier destination for exceptional properties.
                </p>
                <p>
                  Our team combines decades of industry expertise with an unwavering 
                  commitment to personalized service. We understand that finding the 
                  perfect home is more than a transaction—it's a life-changing decision.
                </p>
                <p>
                  Today, we proudly serve an elite clientele across the globe, 
                  offering access to the most exclusive properties and delivering 
                  experiences that exceed expectations at every turn.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-gradient">
                <img
                  src={heroImage}
                  alt="Luxury Interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-24 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full">
              Our Values
            </span>
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-2xl text-center card-hover"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full">
              Our Mission
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              "To connect exceptional people with extraordinary homes, creating 
              <span className="text-primary text-glow"> lasting relationships</span> built on trust, 
              expertise, and an unwavering commitment to excellence."
            </h2>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Start Your Journey
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default About;
