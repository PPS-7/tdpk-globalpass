import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StandardCard } from "@/components/ui/standard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Gift, Briefcase, Calendar, Lock, Shield, Percent, Building, Users, Coffee, Plane, FileText, HandshakeIcon, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Perk type definition
interface Perk {
  id: string;
  title: string;
  thumbnail: string;
  teaser: string;
  description: string;
  partner: string;
  eligibleTiers: string[];
  terms: string;
  category: string;
}

const ExclusivePerks = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedPerk, setSelectedPerk] = useState<Perk | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter categories
  const filterCategories = [
    { id: "all", label: "All Perks", icon: Gift },
    { id: "discount", label: "Discount Services", icon: Percent },
    { id: "coworking", label: "Coworking Spaces", icon: Building },
    { id: "partner", label: "Partner Services", icon: HandshakeIcon },
    { id: "events", label: "Events Access", icon: Calendar },
  ];

  // Perks with thumbnails and detailed information
  const perks: Perk[] = [
    // Discount Services
    {
      id: "1",
      title: "Smart Visa Processing",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      teaser: "20% off visa processing fees",
      description: "Get priority processing and 20% discount on all Smart Visa applications including documentation support and BOI coordination.",
      partner: "TDPK Visa Services",
      eligibleTiers: ["Premium Member", "Tenant", "Global Nomad"],
      terms: "Valid for new applications only. Must present membership QR code. Not combinable with other offers.",
      category: "discount"
    },
    {
      id: "2",
      title: "Business Consulting Package",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      teaser: "15% off consulting services",
      description: "Comprehensive business consulting including market entry strategy, legal setup, and compliance guidance for Thailand expansion.",
      partner: "TDPK Business Hub",
      eligibleTiers: ["Premium Member", "Tenant", "Global Nomad"],
      terms: "Minimum engagement of 10 hours required. Discount applies to hourly rates.",
      category: "discount"
    },
    {
      id: "3",
      title: "Workspace Package Deal",
      thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      teaser: "First month 50% off",
      description: "Premium dedicated desk or private office with 50% off first month. Includes high-speed internet, printing credits, and locker.",
      partner: "True Space Network",
      eligibleTiers: ["Premium Member", "Tenant"],
      terms: "New subscribers only. 3-month minimum commitment required after trial.",
      category: "discount"
    },
    {
      id: "4",
      title: "Landing Program Discount",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      teaser: "25% off landing program",
      description: "Complete market entry package including company registration, banking setup, and office consultation at discounted rates.",
      partner: "TDPK International",
      eligibleTiers: ["Global Nomad", "Premium Member"],
      terms: "Valid for full program enrollment. Partial services not eligible for discount.",
      category: "discount"
    },
    // Coworking Spaces
    {
      id: "5",
      title: "TDPK Coworking Access",
      thumbnail: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=400&h=300&fit=crop",
      teaser: "5 free day passes/month",
      description: "Access TDPK's premium coworking spaces with complimentary day passes. Includes high-speed WiFi, coffee, and community events.",
      partner: "True Digital Park",
      eligibleTiers: ["Premium Member", "TDPK + True Space Member"],
      terms: "Day passes valid within calendar month. Unused passes do not roll over.",
      category: "coworking"
    },
    {
      id: "6",
      title: "Meeting Room Credits",
      thumbnail: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400&h=300&fit=crop",
      teaser: "10 hours free/month",
      description: "Book premium meeting rooms across TDPK facilities with complimentary credits. Includes AV equipment and refreshments.",
      partner: "True Digital Park",
      eligibleTiers: ["Premium Member", "Tenant", "TDPK + True Space Member"],
      terms: "Credits expire monthly. Advanced booking required. Subject to availability.",
      category: "coworking"
    },
    {
      id: "7",
      title: "True Space Network Access",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      teaser: "Cross-network privileges",
      description: "Access True Space locations across Thailand including Siam Square, ICONSIAM, Asoke, and university campuses.",
      partner: "True Space",
      eligibleTiers: ["TDPK + True Space Member", "Tenant"],
      terms: "Subject to location capacity. Must book in advance via app.",
      category: "coworking"
    },
    // Partner Services
    {
      id: "8",
      title: "Premium Coffee & F&B",
      thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      teaser: "20% off daily",
      description: "Enjoy discounts at all partner cafes and restaurants within TDPK including Cloud Coffee, The Taste, and more.",
      partner: "TDPK F&B Partners",
      eligibleTiers: ["Premium Member", "Tenant", "TDPK + True Space Member"],
      terms: "Show membership QR at payment. Not valid during promotions.",
      category: "partner"
    },
    {
      id: "9",
      title: "Fitness & Wellness",
      thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
      teaser: "Free trial + 15% off",
      description: "Free 1-week trial at partner gyms plus 15% off monthly memberships. Includes yoga classes and wellness programs.",
      partner: "Fitness First Thailand",
      eligibleTiers: ["Premium Member", "Tenant"],
      terms: "One trial per member. Discount on standard membership rates only.",
      category: "partner"
    },
    {
      id: "10",
      title: "Cloud & Tech Services",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      teaser: "AWS/GCP credits available",
      description: "Access cloud credits and discounted tech services through TDPK's technology partner network.",
      partner: "TDPK Tech Partners",
      eligibleTiers: ["Premium Member", "Tenant", "Startup Partner"],
      terms: "Credits subject to partner program terms. Application required.",
      category: "partner"
    },
    // Events Access
    {
      id: "11",
      title: "VIP Event Access",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      teaser: "Priority registration",
      description: "Get first access to all TDPK events including conferences, workshops, and networking sessions with VIP seating.",
      partner: "TDPK Events",
      eligibleTiers: ["Premium Member", "Tenant", "Global Nomad"],
      terms: "Registration opens 48 hours early for members. Subject to capacity.",
      category: "events"
    },
    {
      id: "12",
      title: "Speaker Series Pass",
      thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
      teaser: "Monthly talks included",
      description: "Complimentary access to monthly speaker series featuring industry leaders, founders, and tech executives.",
      partner: "TDPK Academy",
      eligibleTiers: ["Premium Member", "Tenant", "TDPK + True Space Member"],
      terms: "RSVP required. Walk-ins subject to availability.",
      category: "events"
    },
  ];

  // Filter perks
  const filteredPerks = activeFilter === "all" 
    ? perks 
    : perks.filter(perk => perk.category === activeFilter);

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

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 p-4 bg-muted/50 rounded-xl">
          {filterCategories.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {filter.label}
              </Button>
            );
          })}
        </div>

        {/* Perks Grid - Thumbnail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredPerks.map((perk) => (
            <StandardCard 
              key={perk.id} 
              className="cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              onClick={() => setSelectedPerk(perk)}
            >
              {/* Thumbnail */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={perk.thumbnail}
                  alt={perk.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <Badge className="absolute top-2 right-2 bg-background/90 text-foreground">
                  {perk.category === "discount" && <Percent className="h-3 w-3 mr-1" />}
                  {perk.category === "coworking" && <Building className="h-3 w-3 mr-1" />}
                  {perk.category === "partner" && <HandshakeIcon className="h-3 w-3 mr-1" />}
                  {perk.category === "events" && <Calendar className="h-3 w-3 mr-1" />}
                  {perk.category.charAt(0).toUpperCase() + perk.category.slice(1)}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-1">{perk.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-primary font-semibold mb-2">{perk.teaser}</p>
                <p className="text-xs text-muted-foreground">by {perk.partner}</p>
              </CardContent>
            </StandardCard>
          ))}
        </div>

        {/* MOU Ecosystem Partners Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">MOU Ecosystem Partners</h2>
              <p className="text-muted-foreground text-sm">Exclusive discounts from our strategic partners</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Visa Express Thailand", service: "Visa Services", discount: "20% Off", badge: "Partner with Perks" },
              { name: "Legal & Co.", service: "Legal Consulting", discount: "15% Off", badge: "Partner with Perks" },
              { name: "WorkSpace Pro", service: "Office Solutions", discount: "First Month Free", badge: "Partner with Perks" },
            ].map((partner, idx) => (
              <StandardCard key={idx} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-primary border-primary/30">MOU Ecosystem Partner</Badge>
                    <Badge className="bg-secondary text-secondary-foreground">{partner.badge}</Badge>
                  </div>
                  <CardTitle className="mt-3">{partner.name}</CardTitle>
                  <CardDescription>{partner.service}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-3">{partner.discount}</div>
                  <Button variant="outline" className="w-full" onClick={() => setShowPremiumModal(true)}>
                    <Lock className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
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
              <Link to="/membership">View Membership Plans</Link>
            </Button>
          </CardContent>
        </StandardCard>
      </section>

      {/* Perk Detail Modal */}
      <Dialog open={!!selectedPerk} onOpenChange={() => setSelectedPerk(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedPerk && (
            <>
              <div className="aspect-video relative overflow-hidden rounded-lg mb-4 -mx-2 -mt-2">
                <img
                  src={selectedPerk.thumbnail}
                  alt={selectedPerk.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-secondary">{selectedPerk.category.charAt(0).toUpperCase() + selectedPerk.category.slice(1)}</Badge>
                </div>
                <DialogTitle className="text-xl">{selectedPerk.title}</DialogTitle>
                <DialogDescription className="text-primary font-semibold text-lg">
                  {selectedPerk.teaser}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedPerk.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Partner</h4>
                  <p className="text-sm text-muted-foreground">{selectedPerk.partner}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Eligible Membership Tiers</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPerk.eligibleTiers.map((tier, idx) => (
                      <Badge key={idx} variant="outline">{tier}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Terms & Conditions</h4>
                  <p className="text-xs text-muted-foreground">{selectedPerk.terms}</p>
                </div>
              </div>
              
              <Button variant="premium" className="w-full" onClick={() => setShowPremiumModal(true)}>
                <Lock className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

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