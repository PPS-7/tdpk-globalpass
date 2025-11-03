import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using TDPK HubPass ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Membership and Subscriptions</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              TDPK HubPass offers various membership tiers with annual subscription models:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Member tier provides access to network benefits and partner offers</li>
              <li>Member Plus tier includes additional perks and privileges</li>
              <li>Tenant Global tier provides comprehensive global network access</li>
              <li>All subscriptions are billed annually and renew automatically</li>
              <li>Cancellations can be made through your billing portal</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Digital Pass and Verification</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your digital membership pass is for personal use only and may not be shared or transferred. Partners may verify your membership status through QR code scanning or manual lookup. Fraudulent use of membership benefits may result in account termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Partner Network</h2>
            <p className="text-muted-foreground leading-relaxed">
              TDPK HubPass connects members with a network of coworking spaces and partner businesses. While we strive to maintain accurate information, partner availability, offers, and services are subject to change. Partners operate independently and TDPK is not responsible for the quality or availability of partner services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to use the Service responsibly and not to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Violate any laws or regulations</li>
              <li>Share your account credentials with others</li>
              <li>Abuse or harass partners or other members</li>
              <li>Attempt to circumvent verification systems</li>
              <li>Use the service for unauthorized commercial purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Refund Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Refunds are handled on a case-by-case basis. Please contact our support team within 14 days of purchase to request a refund. Partial refunds may be offered for unused portions of annual subscriptions, minus applicable fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TDPK HubPass is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the Service, including but not limited to loss of data, business interruption, or unavailability of partner services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Continued use of the Service after changes constitutes acceptance of the modified terms. We will notify members of significant changes via email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us at support@tdpkhubpass.com
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-12">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
