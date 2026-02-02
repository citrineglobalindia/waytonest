import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  1. Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Way to Nest Private Limited ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website waytonest.in or use our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  2. Information We Collect
                </h2>
                <h3 className="font-display text-xl font-medium text-foreground mb-3">
                  Personal Information
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide when you:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Fill out contact forms or enquiry forms</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Request property information</li>
                  <li>Schedule property viewings</li>
                  <li>Communicate with us via phone, email, or chat</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  This information may include your name, email address, phone number, and any messages or preferences you share.
                </p>

                <h3 className="font-display text-xl font-medium text-foreground mb-3 mt-6">
                  Automatically Collected Information
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you visit our website, we may automatically collect certain information including your 
                  IP address, browser type, operating system, referring URLs, access times, and pages viewed.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Respond to your enquiries and provide customer support</li>
                  <li>Send you property listings and updates that match your preferences</li>
                  <li>Schedule and coordinate property viewings</li>
                  <li>Improve our website and services</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  4. Information Sharing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your 
                  information with trusted partners and service providers who assist us in operating our website 
                  and conducting our business, provided they agree to keep this information confidential.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  5. Cookies and Tracking
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your browsing experience, 
                  analyze website traffic, and understand where our visitors come from. You can choose to 
                  disable cookies through your browser settings, though this may affect some website functionality.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  6. Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction. 
                  However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  7. Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  8. Third-Party Links
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the 
                  privacy practices or content of these external sites. We encourage you to read the 
                  privacy policies of any linked websites.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  9. Changes to This Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  10. Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-6 rounded-xl bg-card border border-border/50">
                  <p className="text-foreground font-medium">Way to Nest Private Limited</p>
                  <p className="text-muted-foreground mt-2">
                    7, Arneesh Jewel Apartment, 1st Main,<br />
                    2nd Cross, Billekahalli, BG Road,<br />
                    Bangalore - 560076
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Email: <a href="mailto:info@waytonest.in" className="text-primary hover:underline">info@waytonest.in</a>
                  </p>
                  <p className="text-muted-foreground">
                    Phone: <a href="tel:+919739612117" className="text-primary hover:underline">+91 97396 12117</a>
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default PrivacyPolicy;
