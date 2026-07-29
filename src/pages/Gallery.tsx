import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";
import { Button } from "@/components/ui/button";
import { useGalleryImages } from "@/hooks/useGallery";

const Gallery = () => {
  const { data: images, isLoading } = useGalleryImages();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set((images || []).map((i) => i.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [images]);

  const filtered = (images || []).filter(
    (i) => activeCategory === "All" || i.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Gallery | Way To Nest Real Estate Bangalore"
        description="Browse photos of our projects, site visits and events at Way To Nest Pvt Ltd, Bangalore's trusted real estate advisory."
        path="/gallery"
      />
      <Header />

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary text-sm tracking-[0.2em] uppercase">Our Moments</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-4">
              Gallery
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              A glimpse into our projects, site visits, client handovers and team moments.
            </p>
          </motion.div>

          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm transition-colors border ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-secondary animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-2xl">
              <ImageIcon className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Photos coming soon. Check back shortly.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((image, index) => (
                <motion.button
                  key={image.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                  onClick={() => setLightbox(image.image_url)}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card text-left"
                >
                  <img
                    src={image.image_url}
                    alt={image.title || "Way To Nest gallery photo"}
                    loading="lazy"
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {(image.title || image.description) && (
                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-background via-background/80 to-transparent">
                      {image.title && (
                        <h2 className="font-display text-lg font-semibold text-foreground">
                          {image.title}
                        </h2>
                      )}
                      {image.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                      )}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <Button
              variant="outline"
              size="icon"
              className="absolute top-6 right-6"
              onClick={() => setLightbox(null)}
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </Button>
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              src={lightbox}
              alt="Gallery photo enlarged"
              className="max-h-[85vh] max-w-full rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default Gallery;
