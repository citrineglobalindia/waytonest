import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/seo/Seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";
import { useProperties } from "@/hooks/useProperties";
import { properties as mockProperties } from "@/data/mockData";

const propertyTypes = ["All", "Apartment", "Villa", "Plot", "Penthouse", "Mansion", "Commercial"];

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const { data: dbProperties, isLoading } = useProperties();
  
  // Use database properties if available, otherwise fall back to mock data
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

  const filteredProperties = allProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || property.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Properties for Sale in Bangalore | Way To Nest"
        description="Browse Sobha, Brigade and Assetz apartments, villas and plots in Bangalore. Filter by type, location and budget with Way To Nest."
        path="/properties"
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full">
              Our Portfolio
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Luxury Properties
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our exclusive collection of premium real estate
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 border-b border-border/50 sticky top-[72px] z-30 glass-strong">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-secondary/50 border-border/50"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </Button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Type:</span>
                <div className="flex gap-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all ${
                        selectedType === type
                          ? "bg-primary text-primary-foreground shadow-glow-sm"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-border/50"
            >
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">Property Type</span>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-2 text-sm rounded-lg transition-all ${
                          selectedType === type
                            ? "bg-primary text-primary-foreground shadow-glow-sm"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="sr-only">Property listings</h2>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-xl border border-border/50 overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-secondary" />
                  <div className="p-6">
                    <div className="h-6 bg-secondary rounded w-3/4 mb-2" />
                    <div className="h-4 bg-secondary rounded w-1/2 mb-4" />
                    <div className="h-8 bg-secondary rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing <span className="text-foreground font-semibold">{filteredProperties.length}</span> properties
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <Building2 className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                No Properties Found
              </h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("All");
                }}
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default Properties;
