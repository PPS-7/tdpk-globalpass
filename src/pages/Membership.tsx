import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StandardCard } from "@/components/ui/standard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Crown, Star, Globe, Check, Lock } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

/*  
NOTE FOR FUTURE:  
This is a PLACEHOLDER membership page.
No real subscription logic, no backend integration.
All tiers and benefits are mockup data for beta demonstration.
*/

const Membership = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [email, setEmail] = useState("");

  const membershipTiers = [
    {
      name: "Basic Freemium",
      price: "Free",
      period: "Forever",
      icon: Star,
      color: "text-muted-foreground",
      popular: false,
      benefits: [
        "Access to partner directory",
        "View coworking locations",
        "Browse exclusive perks",
        "Basic event access",
        "Community forum access"
      ]
    },
    {
      name: "Premium Yearly",
      price: "Coming Soon",
      period: "per year",
      icon: Crown,
      color: "text-primary",
      popular: true,
      benefits: [
        "All Basic features",
        "Unlock all perk discounts",
        "Priority event registration",
        "5 coworking space visits/month",
        "Meeting room credits",
        "Premium support"
      ]
    },
    {
      name: "Tenant Privilege",
      price: "Contact Sales",
      period: "for office tenants",
      icon: Crown,
      color: "text-secondary",
      popular: false,
      benefits: [
        "All Premium features",
        "Unlimited coworking access",
        "20 hrs meeting room credits/month",
        "VIP event access",
        "F&B discounts (15-20%)",
        "Concierge service 24/7"
      ]
    },
    {
      name: "Global Nomad",
      price: "TBC",
      period: "international membership",
      icon: Globe,
      color: "text-accent-foreground",
      popular: false,
      benefits: [
        "All Premium features",
        "Global coworking network access",
        "International services discount",
        "Landing program support",
        "Cross-border networking",
        "Multi-currency support"
      ]
    }
  ];

  const handleJoinClick = () => {
    setShowComingSoon(true);
  };

  const handleNotifyMe = () => {
    if (email) {
      // In future: save to local storage or show success message
      setEmail("");
      setShowComingSoon(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button asChild variant="ghost">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="premium">
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Crown className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Membership Plans
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your lifestyle. Upgrade anytime as your needs grow.
          </p>
        </div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {membershipTiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <StandardCard key={idx} className={tier.popular ? "border-primary border-2" : ""}>
                <CardHeader className="w-full">
                  {tier.popular && (
                    <Badge className="w-fit mb-2 bg-primary">Most Popular</Badge>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-6 w-6 ${tier.color}`} />
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                  </div>
                  <div className="mb-4">
                    <div className="text-3xl font-bold">{tier.price}</div>
                    <CardDescription>{tier.period}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 w-full">
                  <ul className="space-y-3 mb-6">
                    {tier.benefits.map((benefit, benefitIdx) => (
                      <li key={benefitIdx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  {tier.name === "Basic Freemium" ? (
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/auth">Get Started Free</Link>
                    </Button>
                  ) : tier.name === "Tenant Privilege" ? (
                    <Button variant="secondary" className="w-full" asChild>
                      <Link to="/tenant-privilege">Learn More</Link>
                    </Button>
                  ) : (
                    <Button 
                      variant={tier.popular ? "premium" : "outline"} 
                      className="w-full"
                      onClick={handleJoinClick}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      {tier.popular ? "Join Premium" : "Coming Soon"}
                    </Button>
                  )}
                </CardContent>
              </StandardCard>
            );
          })}
        </div>

        {/* Benefits Preview */}
        <StandardCard className="mb-8">
          <CardContent className="py-8 w-full">
            <h2 className="text-3xl font-bold mb-8 text-center">What Premium Members Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground">Coworking Locations</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <p className="text-muted-foreground">Partner Discounts</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Access & Support</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Exclusive</div>
                <p className="text-muted-foreground">Events & Networking</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Priority</div>
                <p className="text-muted-foreground">Visa Services</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Global</div>
                <p className="text-muted-foreground">Network Access</p>
              </div>
            </div>
          </CardContent>
        </StandardCard>

        {/* CTA */}
        <StandardCard className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="py-8 w-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Start with Free Access Today</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                No credit card required. Upgrade to premium anytime to unlock all features.
              </p>
              <Button asChild size="lg" variant="hero">
                <Link to="/auth">Create Free Account</Link>
              </Button>
            </div>
          </CardContent>
        </StandardCard>
      </section>

      {/* Coming Soon Modal */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Membership Program Coming Soon</DialogTitle>
            <DialogDescription>
              We're working hard to launch our premium membership program. Leave your email to be notified when it's ready!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleNotifyMe} className="w-full" variant="premium">
              Notify Me When Available
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Membership;
