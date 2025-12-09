import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StandardCard } from "@/components/ui/standard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Crown, Star, Globe, Check, Lock, Building2, Users, Briefcase, Sparkles, Calendar, Percent, Gift, Shield } from "lucide-react";
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

  // Premium benefits with icons
  const premiumBenefits = [
    { icon: Building2, title: "50+ Coworking Locations", description: "Access partner workspaces across Thailand" },
    { icon: Percent, title: "100+ Partner Discounts", description: "Exclusive deals from ecosystem partners" },
    { icon: Calendar, title: "Priority Event Access", description: "First access to workshops & conferences" },
    { icon: Gift, title: "Exclusive Perks", description: "Members-only offers and promotions" },
    { icon: Shield, title: "Visa Service Priority", description: "Fast-track visa & work permit support" },
    { icon: Globe, title: "Global Network Access", description: "Connect with international partners" },
  ];

  // NEW: Membership Tier Structure
  const membershipCategories = [
    {
      category: "Public User",
      categoryColor: "bg-muted text-muted-foreground",
      categoryIcon: Star,
      description: "Basic site access with newsletter subscription",
      tiers: [
        {
          name: "Public User",
          subtitle: "Newsletter Access",
          price: "Free",
          period: "Forever",
          icon: Star,
          color: "text-muted-foreground",
          popular: false,
          badge: "Public User – Newsletter Access",
          benefits: [
            "Access to partner directory",
            "View coworking locations",
            "Browse public event listings",
            "Newsletter subscription",
            "Public content access"
          ]
        }
      ]
    },
    {
      category: "TDPK Member",
      categoryColor: "bg-primary/10 text-primary",
      categoryIcon: Crown,
      description: "Full membership benefits for coworking and office tenants",
      tiers: [
        {
          name: "Tenant Tier",
          subtitle: "Office Tenants",
          price: "Contact Sales",
          period: "for office tenants",
          icon: Building2,
          color: "text-secondary",
          popular: false,
          badge: "Coming Soon",
          benefits: [
            "All Premium features included",
            "Unlimited TDPK coworking access",
            "20 hrs meeting room credits/month",
            "VIP event access",
            "F&B discounts (15-20%)",
            "24/7 Concierge service"
          ]
        },
        {
          name: "TDPK + True Space Member",
          subtitle: "Cross-Network Access",
          price: "Coming Soon",
          period: "per year",
          icon: Users,
          color: "text-primary",
          popular: true,
          badge: "Coming Soon",
          benefits: [
            "Access TDPK + True Space network",
            "5 coworking visits/month each",
            "10 hrs meeting room credits",
            "Priority event registration",
            "Partner F&B discounts",
            "Premium support"
          ]
        },
        {
          name: "TDPK Subscription Member",
          subtitle: "Monthly Coworking",
          price: "Coming Soon",
          period: "per year",
          icon: Briefcase,
          color: "text-primary",
          popular: false,
          badge: "Coming Soon",
          benefits: [
            "Unlimited TDPK coworking",
            "10 hrs meeting room credits",
            "Event access",
            "Partner discounts",
            "Coffee & refreshments",
            "Community networking"
          ]
        }
      ]
    },
    {
      category: "TDPK Partners",
      categoryColor: "bg-secondary/10 text-secondary",
      categoryIcon: Sparkles,
      description: "For ecosystem and coworking partners",
      tiers: [
        {
          name: "Ecosystem Partner",
          subtitle: "Partner Network",
          price: "By Application",
          period: "partnership agreement",
          icon: Globe,
          color: "text-secondary",
          popular: false,
          badge: "Ecosystem Partner / Coworking Partner",
          benefits: [
            "Partner badge & listing",
            "Co-marketing opportunities",
            "Member referral access",
            "Event hosting discounts",
            "Analytics dashboard",
            "Partner network access"
          ]
        }
      ]
    }
  ];

  const handleJoinClick = () => {
    setShowComingSoon(true);
  };

  const handleNotifyMe = () => {
    if (email) {
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
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
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

        {/* MOVED TO TOP: What Premium Members Get */}
        <StandardCard className="mb-12 border-primary/20">
          <CardContent className="py-8 w-full">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-center">What Premium Members Get</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumBenefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs text-primary border-primary/30">Premium</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </StandardCard>

        {/* Membership Categories */}
        {membershipCategories.map((category, catIdx) => {
          const CategoryIcon = category.categoryIcon;
          return (
            <div key={catIdx} className="mb-12">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-full ${category.categoryColor}`}>
                  <CategoryIcon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </div>
              </div>

              {/* Tier Cards */}
              <div className={`grid gap-6 ${category.tiers.length === 1 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {category.tiers.map((tier, idx) => {
                  const Icon = tier.icon;
                  return (
                    <StandardCard key={idx} className={`${tier.popular ? "border-primary border-2 shadow-lg" : ""} h-full`}>
                      <CardHeader className="w-full">
                        <div className="flex items-center justify-between mb-2">
                          {tier.popular && (
                            <Badge className="bg-primary">Most Popular</Badge>
                          )}
                          <Badge variant="secondary" className="ml-auto">{tier.badge}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`h-6 w-6 ${tier.color}`} />
                          <CardTitle className="text-xl">{tier.name}</CardTitle>
                        </div>
                        <CardDescription>{tier.subtitle}</CardDescription>
                        <div className="mt-3">
                          <div className="text-2xl font-bold">{tier.price}</div>
                          <p className="text-sm text-muted-foreground">{tier.period}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 w-full">
                        <ul className="space-y-2 mb-6">
                          {tier.benefits.map((benefit, benefitIdx) => (
                            <li key={benefitIdx} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        {tier.name === "Public User" ? (
                          <Button variant="outline" className="w-full" asChild>
                            <Link to="/auth">Get Started Free</Link>
                          </Button>
                        ) : tier.name === "Tenant Tier" ? (
                          <Button variant="secondary" className="w-full" asChild>
                            <Link to="/tenant-privilege">Learn More</Link>
                          </Button>
                        ) : tier.name === "Ecosystem Partner" ? (
                          <Button variant="outline" className="w-full" asChild>
                            <Link to="/partners">View Partner Program</Link>
                          </Button>
                        ) : (
                          <Button 
                            variant={tier.popular ? "premium" : "outline"} 
                            className="w-full"
                            onClick={handleJoinClick}
                          >
                            <Lock className="mr-2 h-4 w-4" />
                            Coming Soon
                          </Button>
                        )}
                      </CardContent>
                    </StandardCard>
                  );
                })}
              </div>
            </div>
          );
        })}

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