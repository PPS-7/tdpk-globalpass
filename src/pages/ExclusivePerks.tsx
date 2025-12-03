import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StandardCard } from "@/components/ui/standard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Gift, Briefcase, Calendar, Lock, Shield, Percent, Building, Users } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ExclusivePerks = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const perkCategories = [
    {
      title: "TDPK Monthly Coworking Members",
      icon: Briefcase,
      color: "bg-primary/10 text-primary",
      perks: [
        { name: "Unlimited Access", description: "All TDPK coworking spaces", discount: "Included" },
        { name: "Meeting Rooms", description: "10 hours/month credit", discount: "Free" },
        { name: "Premium Coffee", description: "Barista-made beverages", discount: "20% Off" },
        { name: "Event Access", description: "Networking events & workshops", discount: "Priority Access" },
      ]
    },
    {
      title: "True Space Coworking Members",
      icon: Gift,
      color: "bg-secondary/10 text-secondary",
      perks: [
        { name: "Cross-Network Access", description: "Access TDPK spaces", discount: "5 days/month" },
        { name: "F&B Discounts", description: "Partner cafes & restaurants", discount: "15% Off" },
        { name: "Meeting Room Deals", description: "True Space locations", discount: "10% Off" },
        { name: "Gym Partnership", description: "Selected fitness centers", discount: "20% Off" },
      ]
    },
    {
      title: "TDPK's Partner Network",
      icon: Calendar,
      color: "bg-accent/10 text-accent-foreground",
      perks: [
        { name: "Co-Marketing", description: "Featured on TDPK platforms", discount: "Included" },
        { name: "Member Referrals", description: "Direct customer access", discount: "Commission-based" },
        { name: "Space Credits", description: "Host events at TDPK", discount: "30% Off" },
        { name: "Analytics Dashboard", description: "Track redemptions & insights", discount: "Free Access" },
      ]
    }
  ];

  // Tenant Privilege Categories
  const tenantPrivilegeCategories = [
    {
      title: "Event Access & Networking",
      icon: Users,
      color: "bg-primary/10 text-primary",
      benefits: [
        { name: "Priority Event Registration", description: "Get first access to all TDPK-hosted events, conferences, and workshops", value: "Exclusive" },
        { name: "VIP Seating", description: "Reserved seating at major events and networking sessions", value: "Complimentary" },
        { name: "Speaker Series", description: "Access to monthly industry leader talks and panel discussions", value: "Free Entry" },
        { name: "Networking Lounges", description: "Exclusive tenant-only networking spaces during events", value: "Members Only" },
      ]
    },
    {
      title: "Retail & F&B Discounts",
      icon: Percent,
      color: "bg-secondary/10 text-secondary",
      benefits: [
        { name: "In-Building Restaurants", description: "Special discounts at all TDPK food courts and restaurants", value: "15-20% Off" },
        { name: "Retail Shops", description: "Year-round discounts at retail partners within TDPK", value: "10-25% Off" },
        { name: "Partner Brands", description: "Exclusive offers from 100+ partnered brands nationwide", value: "Up to 30% Off" },
        { name: "Loyalty Program", description: "Earn points with every purchase, redeem for rewards", value: "5x Points" },
      ]
    },
    {
      title: "Workspace & Meeting Credits",
      icon: Briefcase,
      color: "bg-accent/10 text-accent-foreground",
      benefits: [
        { name: "Meeting Room Credits", description: "Monthly credits for booking meeting rooms", value: "20 hrs/month" },
        { name: "TDPK Coworking Access", description: "Unlimited access to TDPK coworking spaces", value: "Included" },
        { name: "True Space Network", description: "Cross-network access to True Space locations", value: "10 days/month" },
        { name: "Private Office Upgrades", description: "Priority booking for private offices and phone booths", value: "Anytime" },
      ]
    },
    {
      title: "Additional Perks",
      icon: Building,
      color: "bg-primary/10 text-primary",
      benefits: [
        { name: "Concierge Service", description: "Dedicated tenant support for bookings and inquiries", value: "24/7 Available" },
        { name: "Parking Benefits", description: "Discounted monthly parking rates at TDPK facilities", value: "30% Off" },
        { name: "Wellness Programs", description: "Gym, yoga classes, and health check-ups", value: "Subsidized" },
        { name: "Business Services", description: "Printing, courier, and administrative support", value: "Discounted Rates" },
      ]
    }
  ];

  const featuredOffers = [
    { partner: "Cloud Coffee", offer: "Buy 1 Get 1 Free", category: "F&B", validUntil: "Dec 31, 2025" },
    { partner: "Fitness First", offer: "Free 1-Week Trial", category: "Wellness", validUntil: "Jan 15, 2026" },
    { partner: "Print Hub", offer: "20% Off Printing", category: "Business Services", validUntil: "Ongoing" },
    { partner: "Lunch Box", offer: "15% Off All Meals", category: "F&B", validUntil: "Nov 30, 2025" },
  ];

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
          <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-full mb-4">
            <Gift className="h-12 w-12 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Exclusive Perks & Offers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock incredible benefits designed for coworking members, tenants, and partners across the TDPK ecosystem
          </p>
        </div>

        {/* Perk Categories */}
        <div className="grid gap-8 mb-16">
          {perkCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <StandardCard key={idx} className="hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.perks.map((perk, perkIdx) => (
                      <div key={perkIdx} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{perk.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{perk.description}</p>
                          <Badge variant="secondary">{perk.discount}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </StandardCard>
            );
          })}
        </div>

        {/* Tenant Privilege Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-secondary/10 rounded-full">
              <Shield className="h-8 w-8 text-secondary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Tenant Privilege Program</h2>
              <p className="text-muted-foreground">Exclusive benefits for TDPK office tenants</p>
            </div>
          </div>
          
          <div className="grid gap-8">
            {tenantPrivilegeCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <StandardCard key={idx} className="hover:shadow-xl transition-all border-secondary/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                      <Badge variant="outline" className="ml-auto text-secondary border-secondary">Tenant Only</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.benefits.map((benefit, benefitIdx) => (
                        <div key={benefitIdx} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h4 className="font-semibold">{benefit.name}</h4>
                              <Badge variant="secondary" className="shrink-0">{benefit.value}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </StandardCard>
              );
            })}
          </div>
        </div>

        {/* Featured Offers - With Premium Lock */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Featured Offers This Month</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredOffers.map((offer, idx) => (
              <StandardCard key={idx} className="relative">
                {/* Blur overlay for premium features */}
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-xl z-10 flex items-center justify-center">
                  <div className="text-center p-4">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-semibold mb-2">Premium Feature</p>
                    <p className="text-sm text-muted-foreground mb-4">Coming Soon</p>
                    <Button 
                      size="sm" 
                      variant="premium"
                      onClick={() => setShowPremiumModal(true)}
                    >
                      See Membership Benefits
                    </Button>
                  </div>
                </div>
                
                <CardHeader>
                  <Badge className="w-fit mb-2">{offer.category}</Badge>
                  <CardTitle className="text-lg">{offer.partner}</CardTitle>
                  <CardDescription className="blur-sm">{offer.offer}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground blur-sm">Valid until: {offer.validUntil}</p>
                  <Button className="w-full mt-4" variant="outline" disabled>View Details</Button>
                </CardContent>
              </StandardCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <StandardCard className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="py-12 text-center w-full">
            <h2 className="text-3xl font-bold mb-4">Ready to Unlock These Perks?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join TDPK today and start enjoying exclusive benefits across our partner network
            </p>
            <Button asChild size="lg" variant="premium">
              <Link to="/auth">Get Started</Link>
            </Button>
          </CardContent>
        </StandardCard>
      </section>

      {/* Premium Feature Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Premium Feature — Coming Soon</DialogTitle>
            <DialogDescription>
              Unlock exclusive discounts, promo codes, and direct booking links with our Premium membership launching soon.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Premium Members Get:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Up to 30% off at 100+ partner locations</li>
                <li>• Exclusive promo codes and vouchers</li>
                <li>• Priority booking for events and offers</li>
                <li>• Early access to new partnerships</li>
              </ul>
            </div>
            <Button asChild variant="premium" className="w-full">
              <Link to="/membership">View Membership Plans</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExclusivePerks;
