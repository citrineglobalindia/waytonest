import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Tag, KeyRound, FileSignature, TrendingUp, Check, ArrowRight, Phone } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";
import { LeadPopup } from "@/components/forms/LeadPopup";
import { Button } from "@/components/ui/button";

const PHONE_NUMBER = "+919739612117";

const services = [
  {
    icon: Home,
    title: "Buy a Property",
    tagline: "Find the right home, at the right price",
    description:
      "From apartments and villas to plots, we shortlist verified projects that match your budget, locality and lifestyle — and negotiate the best possible deal on your behalf.",
    points: [
      "Curated shortlists from RERA-registered developers",
      "Guided site visits and project comparisons",
      "Price negotiation and offer structuring",
      "Home loan and documentation assistance",
    ],
  },
  {
    icon: Tag,
    title: "Sell a Property",
    tagline: "Get the best value, without the hassle",
    description:
      "We price your property accurately, market it to a qualified buyer network, and manage every enquiry, visit and negotiation until the sale is closed.",
    points: [
      "Free market valuation and pricing strategy",
      "Professional listing, photos and promotion",
      "Verified buyer screening and site visits",
      "Agreement, registration and handover support",
    ],
  },
  {
    icon: KeyRound,
    title: "Rent a Property",
    tagline: "Tenants and homes, matched properly",
    description:
      "Whether you are looking for a home to rent or a tenant for your property, we handle discovery, verification and paperwork so you move in — or hand over — with confidence.",
    points: [
      "Homes matched to budget and commute",
      "Tenant background and profile verification",
      "Rental agreement drafting and registration",
      "Deposit, handover and inventory checks",
    ],
  },
  {
    icon: FileSignature,
    title: "Lease a Property",
    tagline: "Commercial and long-term leasing",
    description:
      "Office spaces, retail units and long-term residential leases — we structure terms that protect your interests and keep occupancy steady.",
    points: [
      "Commercial and retail space sourcing",
      "Lock-in, escalation and exit clause advisory",
      "Lease deed drafting and stamp duty guidance",
      "Landlord and tenant coordination",
    ],
  },
  {
    icon: TrendingUp,
    title: "Investor Desk",
    tagline: "Real estate as a performing asset",
    description:
      "A dedicated desk for investors: pre-launch access, yield analysis and exit planning across Bangalore's highest-growth micro-markets.",
    points: [
      "Pre-launch and bulk-booking opportunities",
      "Rental yield and appreciation analysis",
      "Portfolio diversification across micro-markets",
      "Resale and exit strategy planning",
    ],
  },
];

const Services = () => {
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Services | Buy, Sell, Rent & Lease Property in Bangalore"
        description="Way To Nest offers end-to-end real estate services in Bangalore - buying, selling, renting, leasing and a dedicated investor desk for property investors."
        path="/services"
      />
      <Header />

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary text-sm tracking-[0.2em] uppercase">What We Do</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-4">
              Our Services
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Complete real estate advisory under one roof — from your first site visit to the final
              registration, and every investment decision in between.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
                className={`group relative rounded-2xl border border-border/50 bg-card p-8 hover:border-primary/50 transition-colors ${
                  index === services.length - 1 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-semibold text-foreground">
                      {service.title}
                    </h2>
                    <p className="text-primary text-sm mt-1">{service.tagline}</p>
                    <p className="text-muted-foreground mt-4">{service.description}</p>

                    <ul className="mt-5 space-y-2">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <Button variant="outline" className="mt-6" asChild>
                      <Link to={`/contact?service=${encodeURIComponent(service.title)}`}>
                        Enquire About This
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-primary/30 bg-card p-10 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Not sure where to start?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-3">
              Talk to our advisors. We will understand your requirement and recommend the right path —
              whether that's buying, renting, leasing or investing.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button variant="hero" onClick={() => setIsLeadPopupOpen(true)}>
                Get in Touch
              </Button>
              <Button variant="outline" asChild>
                <a href={`tel:${PHONE_NUMBER}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LeadPopup isOpen={isLeadPopupOpen} onClose={() => setIsLeadPopupOpen(false)} />

      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default Services;
