import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";
import { useTestimonials } from "@/hooks/useTestimonials";
import { testimonials as mockTestimonials } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Testimonials = () => {
  const { data: dbTestimonials, isLoading } = useTestimonials();
  
  // Use database testimonials if available, otherwise fall back to mock data
  const testimonials = dbTestimonials && dbTestimonials.length > 0
    ? dbTestimonials.map(t => ({
        id: t.id,
        name: t.name,
        role: t.role || '',
        image: t.image_url || 'https://via.placeholder.com/400',
        content: t.content,
        rating: t.rating || 5,
      }))
    : mockTestimonials;

  const featuredTestimonial = testimonials[0];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Client Reviews & Testimonials | Way To Nest"
        description="Read verified Google reviews from Way To Nest clients who bought homes in Bangalore - rated 4.9 across 39 reviews."
        path="/testimonials"
      />
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
              Testimonials
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Client Stories
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover why discerning clients trust Way to Nest for their 
              luxury real estate needs.
            </p>

            <a
              href="https://www.google.com/maps/place/Way+To+Nest+Pvt+Ltd/@12.8814006,77.5440002,17z/data=!4m8!3m7!1s0x3bae15ecbcdf7d9f:0xf00d48cf0911134c!9m1!1b1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-8 px-5 py-3 rounded-full glass border border-primary/30 hover:border-primary/60 transition-colors"
            >
              <span className="font-display text-2xl font-bold text-primary">4.9</span>
              <span className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </span>
              <span className="text-sm text-muted-foreground">
                39 Google reviews
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonial */}
      {featuredTestimonial && (
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative max-w-4xl mx-auto text-center"
            >
              <Quote className="w-16 h-16 mx-auto mb-8 text-primary/30" />
              <p className="font-display text-2xl md:text-3xl text-foreground mb-8 leading-relaxed">
                "{featuredTestimonial.content}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={featuredTestimonial.image}
                  alt={featuredTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                />
                <div className="text-left">
                  <div className="font-semibold text-foreground">{featuredTestimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{featuredTestimonial.role}</div>
                </div>
              </div>
              <div className="flex justify-center gap-1 mt-4">
                {Array.from({ length: featuredTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials Grid */}
      <section className="py-20 lg:py-24 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              More Success Stories
            </h2>
            <div className="section-divider" />
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass p-8 rounded-2xl animate-pulse">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div key={j} className="w-5 h-5 bg-secondary rounded" />
                    ))}
                  </div>
                  <div className="h-24 bg-secondary rounded mb-6" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary" />
                    <div>
                      <div className="h-5 bg-secondary rounded w-24 mb-1" />
                      <div className="h-4 bg-secondary rounded w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16">
              <Star className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No testimonials yet</h3>
              <p className="text-muted-foreground">Client testimonials will appear here.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/30 bg-secondary"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Create Your Story?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join the hundreds of satisfied clients who found their perfect 
              property with Way to Nest.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Get Started Today
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

export default Testimonials;
