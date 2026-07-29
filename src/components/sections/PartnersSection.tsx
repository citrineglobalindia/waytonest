import { motion } from "framer-motion";

// Partner logos
import sobha from "@/assets/partners/sobha.png";
import brigade from "@/assets/partners/brigade.png";
import prestige from "@/assets/partners/prestige.png";
import assetz from "@/assets/partners/assetz.png";
import lodha from "@/assets/partners/lodha.png";
import bhartiyaUrban from "@/assets/partners/bhartiya-urban.png";
import mahindra from "@/assets/partners/mahindra.png";
import provident from "@/assets/partners/provident.avif";
import ltGroup from "@/assets/partners/lt-group.avif";
import godrejAsset from "@/assets/partners/godrej.png.asset.json";

const partners = [
  { name: "Sobha", logo: sobha },
  { name: "Brigade", logo: brigade },
  { name: "Prestige", logo: prestige },
  { name: "Godrej Properties", logo: godrejAsset.url },
  { name: "Assetz", logo: assetz },
  { name: "Lodha", logo: lodha },
  { name: "Bhartiya Urban", logo: bhartiyaUrban },
  { name: "Mahindra Lifespaces", logo: mahindra },
  { name: "Provident", logo: provident },
  { name: "L&T Group", logo: ltGroup },
];

export const PartnersSection = () => {
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-xs uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full">
            Trusted Partners
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Association
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with India's most prestigious developers to bring you exceptional properties
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-gray-50 border border-gray-200 rounded-xl p-6 h-28 flex items-center justify-center transition-all duration-300 hover:border-primary/30 hover:bg-white hover:shadow-lg hover:shadow-primary/5">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 max-w-full w-auto object-contain filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
