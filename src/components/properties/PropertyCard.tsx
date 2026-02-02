import { motion } from "framer-motion";
import { ArrowRight, Bed, Bath, Square, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured?: boolean;
  type: string;
}

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/properties/${property.id}`}>
        <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 card-hover">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 property-overlay opacity-60" />
            
            {/* Featured Badge */}
            {property.featured && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full shadow-glow-sm">
                  Featured
                </span>
              </div>
            )}

            {/* Type Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-secondary/80 backdrop-blur-sm text-foreground rounded-full">
                {property.type}
              </span>
            </div>

            {/* Price */}
            <div className="absolute bottom-4 left-4">
              <span className="text-2xl font-display font-bold text-foreground text-glow-sm">
                {property.price}
              </span>
            </div>

            {/* View Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-glow">
                <ArrowRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            
            <div className="flex items-center gap-1 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">{property.location}</span>
            </div>

            {/* Features */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {property.bedrooms} Beds
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {property.bathrooms} Baths
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Square className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {property.area}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
