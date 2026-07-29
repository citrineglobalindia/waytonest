import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Check,
  Phone,
  Share2,
  Building2
} from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";
import { LeadPopup } from "@/components/forms/LeadPopup";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Button } from "@/components/ui/button";
import { useProperty, useProperties } from "@/hooks/useProperties";
import { properties as mockProperties } from "@/data/mockData";
import { useState } from "react";

const PropertyDetail = () => {
  const { id } = useParams();
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);

  const { data: dbProperty, isLoading } = useProperty(id || "");
  const { data: dbProperties } = useProperties();

  // Build property from DB or fallback to mock
  const property = dbProperty 
    ? {
        id: dbProperty.id,
        title: dbProperty.title,
        location: dbProperty.location,
        price: dbProperty.price,
        bedrooms: dbProperty.bedrooms,
        bathrooms: dbProperty.bathrooms,
        area: dbProperty.area,
        image: dbProperty.image_url || '',
        featured: dbProperty.featured || false,
        type: dbProperty.type,
        description: dbProperty.description || undefined,
        features: dbProperty.features || undefined,
      }
    : mockProperties.find((p) => p.id === id);

  const allProperties = dbProperties && dbProperties.length > 0 
    ? dbProperties.map(p => ({
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
    : mockProperties;

  const relatedProperties = allProperties.filter((p) => p.id !== id).slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Property Not Found
            </h1>
            <Button asChild>
              <Link to="/properties">Back to Properties</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${property.title} - ${property.location} | Way To Nest`}
        description={
          (property.description || `${property.title} in ${property.location}: ${property.bedrooms} BHK, ${property.area}, ${property.price}.`)
            .slice(0, 155)
        }
        path={`/properties/${property.id}`}
        image={property.image}
        type="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SingleFamilyResidence",
          name: property.title,
          description: property.description,
          image: property.image ? `https://www.waytonest.in${property.image}` : undefined,
          url: `https://www.waytonest.in/properties/${property.id}`,
          numberOfBedrooms: property.bedrooms,
          numberOfBathroomsTotal: property.bathrooms,
          address: {
            "@type": "PostalAddress",
            addressLocality: property.location,
            addressCountry: "IN",
          },
        }}
      />
      <Header />


      {/* Hero Image */}
      <section className="pt-20 relative">
        <div className="h-[60vh] lg:h-[70vh] relative">
          {property.image ? (
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <Building2 className="w-24 h-24 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-28 left-4 lg:left-8"
        >
          <Button variant="glass" size="sm" asChild>
            <Link to="/properties">
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Property Details */}
      <section className="py-16 lg:py-20 -mt-32 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="glass-strong p-8 lg:p-10 rounded-2xl border border-border/50">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 mb-3 text-xs uppercase tracking-wider bg-primary/10 text-primary rounded-full">
                      {property.type}
                    </span>
                    <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Price</p>
                    <p className="font-display text-3xl font-bold text-primary text-glow-sm">
                      {property.price}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-6 py-6 border-y border-border/50 mb-6">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{property.area}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description || "No description available."}
                  </p>
                </div>

                {/* Amenities */}
                {property.features && property.features.length > 0 && (
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                      Key Features
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {property.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-strong p-8 rounded-2xl border border-border/50 sticky top-28">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  Interested in this property?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Contact our team to schedule a private viewing or learn more 
                  about this exceptional property.
                </p>

                <div className="space-y-4">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => setIsLeadPopupOpen(true)}
                  >
                    <Phone className="w-5 h-5" />
                    Schedule Viewing
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Property
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">
                    Need immediate assistance?
                  </p>
                  <a
                    href="tel:+919739612117"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +91 97396 12117
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Similar Properties
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProperties.map((prop, index) => (
              <PropertyCard key={prop.id} property={prop} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingChatbot />
      <LeadPopup
        isOpen={isLeadPopupOpen}
        onClose={() => setIsLeadPopupOpen(false)}
        propertyName={property.title}
        propertyId={property.id}
      />
    </div>
  );
};

export default PropertyDetail;
