import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";

const TermsOfService = () => {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using the Way to Nest website (waytonest.in) and services, you accept 
                  and agree to be bound by these Terms of Service. If you do not agree to these terms, 
                  please do not use our website or services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  2. Services Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Way to Nest Private Limited is a real estate consultancy and brokerage firm that provides:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
                  <li>Property listing and search services</li>
                  <li>Real estate consultancy and advisory services</li>
                  <li>Property viewing coordination</li>
                  <li>Buyer-seller/tenant-landlord facilitation</li>
                  <li>Market insights and property valuations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  3. User Responsibilities
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When using our services, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Use the website and services only for lawful purposes</li>
                  <li>Not misrepresent your identity or intentions</li>
                  <li>Not interfere with the proper functioning of the website</li>
                  <li>Respect the intellectual property rights of Way to Nest and third parties</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  4. Property Information Disclaimer
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to provide accurate property information, all listings, prices, 
                  specifications, and availability are subject to change without notice. We do not 
                  guarantee the accuracy, completeness, or reliability of any property information 
                  displayed on our website. Users should independently verify all details before 
                  making any decisions.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  5. No Guarantee of Transactions
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Way to Nest acts as a facilitator between buyers, sellers, tenants, and landlords. 
                  We do not guarantee the completion of any property transaction. The final decision 
                  to enter into any agreement rests solely with the parties involved, and Way to Nest 
                  shall not be held liable for any failed transactions.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  6. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website, including but not limited to text, graphics, logos, 
                  images, and software, is the property of Way to Nest Private Limited and is protected 
                  by Indian and international copyright laws. You may not reproduce, distribute, or 
                  create derivative works without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  7. Third-Party Content
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may display content from third parties, including property developers 
                  and partners. Way to Nest does not endorse and is not responsible for the accuracy 
                  or reliability of any third-party content. Any dealings with third parties are at 
                  your own risk.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  8. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, Way to Nest Private Limited shall not be 
                  liable for any direct, indirect, incidental, special, consequential, or punitive 
                  damages arising out of your use of or inability to use our website or services, 
                  including but not limited to damages for loss of profits, data, or other intangibles.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  9. Indemnification
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify and hold harmless Way to Nest Private Limited, its directors, 
                  employees, and agents from any claims, damages, losses, or expenses arising from 
                  your use of our services or violation of these Terms of Service.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  10. RERA Compliance
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Way to Nest operates in compliance with the Real Estate (Regulation and Development) 
                  Act, 2016 (RERA) and applicable state regulations. All properties listed on our 
                  platform from registered developers include RERA registration numbers where applicable.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  11. Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service shall be governed by and construed in accordance with the 
                  laws of India. Any disputes arising from these terms shall be subject to the 
                  exclusive jurisdiction of the courts in Bangalore, Karnataka.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  12. Modifications to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Way to Nest reserves the right to modify these Terms of Service at any time. 
                  Changes will be effective immediately upon posting on this page. Your continued 
                  use of our services after any modifications constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  13. Termination
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to terminate or suspend access to our services without prior 
                  notice for conduct that we believe violates these Terms of Service or is harmful 
                  to other users, us, or third parties.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  14. Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  For any questions regarding these Terms of Service, please contact us at:
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

export default TermsOfService;
