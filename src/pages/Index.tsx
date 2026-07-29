import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Building2, Users, Award, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { LeadPopup } from "@/components/forms/LeadPopup";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { useProperties } from "@/hooks/useProperties";
import { useTestimonials } from "@/hooks/useTestimonials";
import { properties as mockProperties, testimonials as mockTestimonials } from "@/data/mockData";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-luxury.jpg";

const stats = [
  { icon: Building2, value: "1000+", label: "PROPERTIES SOLD" },
  { icon: Users, value: "1,200+", label: "Happy Clients" },
  { icon: Award, value: "2023", label: "Incorporated" },
  { icon: Globe, value: "25+", label: "Global Partners" },
];

const Index = () => {
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Fetch from database with fallback to mock data
  const { data: dbProperties } = useProperties();
  const { data: dbTestimonials } = useTestimonials();

  const properties = dbProperties && dbProperties.length > 0
    ? dbProperties.slice(0, 4).map(p => ({
        id: p.id,
        title: p.title,
        location: p.location,
        price: p.price,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        area: p.area,
        image: p.image_url || '',
        featured: p.featured || false,
        type: p.type,
        description: p.description || undefined,
        features: p.features || undefined,
      }))
    : mockProperties.slice(0, 3);

  const testimonials = dbTestimonials && dbTestimonials.length > 0
    ? dbTestimonials.slice(0, 3).map(t => ({
        id: t.id,
        name: t.name,
        role: t.role || '',
        image: t.image_url || 'https://via.placeholder.com/400',
        content: t.content,
        rating: t.rating || 5,
      }))
    : mockTestimonials;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Luxury Living"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </motion.div>

        {/* Hero Glow */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative h-full flex items-center"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="inline-block px-4 py-2 mb-6 text-xs uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full">
                  Luxury Real Estate
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
              >
                Discover Your
                <span className="text-primary text-glow"> Perfect Nest</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
              >
                Experience unparalleled luxury with our exclusive collection of 
                premium properties. Where exceptional living meets extraordinary design.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => setIsLeadPopupOpen(true)}
                >
                  Schedule a Viewing
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  variant="hero-outline"
                  size="xl"
                  asChild
                >
                  <Link to="/properties">
                    <Play className="w-5 h-5" />
                    Explore Properties
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center stat-glow p-6 rounded-xl"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="font-display text-4xl font-bold text-foreground mb-2 text-glow-sm">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Association / Partners */}
      <PartnersSection />

      {/* Featured Properties */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full">
              Featured Listings
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Exceptional Properties
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked luxury properties that represent the pinnacle of refined living
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <Link to="/properties">
                View All Properties
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-24 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full">
                Why Choose Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Elevating Real Estate to an Art Form
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                At Way to Nest, we believe that finding your perfect home should be an 
                extraordinary experience. Our dedicated team combines market expertise 
                with personalized service to deliver results that exceed expectations.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Curated Selection", desc: "Handpicked properties meeting our exacting standards" },
                  { title: "Expert Guidance", desc: "Industry veterans guiding every step of your journey" },
                  { title: "White-Glove Service", desc: "Discreet, professional support tailored to your needs" },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="hero"
                size="lg"
                className="mt-8"
                asChild
              >
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-gradient">
                <img
                  src={properties[2]?.image || mockProperties[2].image}
                  alt="Luxury Property"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 lg:-left-12 glass-strong p-6 rounded-xl border border-border/50 max-w-xs"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-secondary border-2 border-background"
                      />
                    ))}
                  </div>
                  <div className="text-2xl font-display font-bold text-primary text-glow-sm">
                    1,200+
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Happy clients who found their perfect home with us
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full">
              Testimonials
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Client Stories
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-2xl card-hover"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Ready to Find Your <span className="text-primary text-glow">Dream Home</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Schedule a private consultation with our expert team and discover 
              properties that match your vision of luxury living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="hero"
                size="xl"
                onClick={() => setIsLeadPopupOpen(true)}
              >
                Book a Consultation
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="hero-outline"
                size="xl"
                asChild
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingChatbot />
      <LeadPopup isOpen={isLeadPopupOpen} onClose={() => setIsLeadPopupOpen(false)} />
    </div>
  );
};

export default Index;
