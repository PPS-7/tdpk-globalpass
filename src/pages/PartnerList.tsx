import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Building2, Globe, CheckCircle2, Briefcase, Rocket, GraduationCap, Landmark, TrendingUp, Search } from "lucide-react";

type PartnerCategory = "Corporates" | "Startups & SMEs" | "Universities & Academies" | "Government & Associations" | "Investors";

const partners = [
  {
    id: 1,
    name: "True Digital Park",
    type: "Innovation Hub",
    location: "Bangkok, Thailand",
    category: "Corporates" as PartnerCategory,
    verified: true,
    features: ["High-speed WiFi", "Meeting Rooms", "Event Space", "Cafe"],
    description: "Thailand's largest startup ecosystem hub with world-class facilities"
  },
  {
    id: 2,
    name: "WeWork",
    type: "Enterprise Workspace",
    location: "Seoul, South Korea",
    category: "Corporates" as PartnerCategory,
    verified: true,
    features: ["Modern Design", "Community Events", "Enterprise Solutions", "Wellness Room"],
    description: "Global coworking brand with multiple locations across Asia"
  },
  {
    id: 3,
    name: "Garage Society",
    type: "Members Club",
    location: "Hong Kong",
    category: "Corporates" as PartnerCategory,
    verified: true,
    features: ["Rooftop Terrace", "Bar & Cafe", "Private Offices", "Community"],
    description: "Asia's leading workspace and members club for entrepreneurs"
  },
  {
    id: 4,
    name: "Salt Fukuoka",
    type: "Coworking Space",
    location: "Fukuoka, Japan",
    category: "Startups & SMEs" as PartnerCategory,
    verified: true,
    features: ["24/7 Access", "Private Offices", "Lounge Area", "Kitchen"],
    description: "Modern workspace supporting startup growth in Fukuoka"
  },
  {
    id: 5,
    name: "Impact Hub Taipei",
    type: "Coworking Space",
    location: "Taipei, Taiwan",
    category: "Startups & SMEs" as PartnerCategory,
    verified: true,
    features: ["Community Events", "Workshops", "Hot Desks", "Meeting Rooms"],
    description: "Global network of social entrepreneurs and innovators"
  },
  {
    id: 6,
    name: "The Hive Singapore",
    type: "Coworking Space",
    location: "Singapore",
    category: "Startups & SMEs" as PartnerCategory,
    verified: true,
    features: ["Premium Location", "Business Lounge", "Virtual Office", "Conference Rooms"],
    description: "Boutique coworking spaces for growing businesses"
  },
  {
    id: 7,
    name: "Work Venture Osaka",
    type: "Coworking Space",
    location: "Osaka, Japan",
    category: "Startups & SMEs" as PartnerCategory,
    verified: true,
    features: ["Bilingual Staff", "Event Space", "Hot Desks", "Phone Booths"],
    description: "International-friendly coworking space for startups"
  },
  {
    id: 8,
    name: "StartupX Manila",
    type: "Innovation Space",
    location: "Manila, Philippines",
    category: "Startups & SMEs" as PartnerCategory,
    verified: true,
    features: ["Startup Programs", "Mentoring", "Workspace", "Networking"],
    description: "Empowering Filipino startups and entrepreneurs"
  },
  {
    id: 9,
    name: "Common Ground KL",
    type: "Coworking Space",
    location: "Kuala Lumpur, Malaysia",
    category: "Startups & SMEs" as PartnerCategory,
    verified: true,
    features: ["Flexible Plans", "Meeting Rooms", "High-speed Internet", "Printing"],
    description: "Collaborative workspace in KL's business hub"
  },
  {
    id: 10,
    name: "CIT Taipei",
    type: "Innovation & Technology Center",
    location: "Taipei, Taiwan",
    category: "Universities & Academies" as PartnerCategory,
    verified: true,
    features: ["Maker Space", "Event Hall", "Mentorship", "Networking"],
    description: "Taiwan's premier innovation and technology center"
  },
  {
    id: 11,
    name: "Chulalongkorn University Innovation Hub",
    type: "University Innovation Center",
    location: "Bangkok, Thailand",
    category: "Universities & Academies" as PartnerCategory,
    verified: true,
    features: ["Research Labs", "Student Programs", "Workshops", "Mentoring"],
    description: "Leading university innovation and entrepreneurship center"
  },
  {
    id: 12,
    name: "Creative Hub Kaohsiung",
    type: "Creative & Arts Academy",
    location: "Kaohsiung, Taiwan",
    category: "Universities & Academies" as PartnerCategory,
    verified: true,
    features: ["Art Studio", "Exhibition Space", "Workshops", "Cafe"],
    description: "Supporting Taiwan's creative and cultural industries"
  },
  {
    id: 13,
    name: "TCEB",
    type: "Convention Bureau",
    location: "Bangkok, Thailand",
    category: "Government & Associations" as PartnerCategory,
    verified: true,
    features: ["Exhibition Halls", "Conference Rooms", "Business Services", "Parking"],
    description: "Thailand Convention & Exhibition Bureau facilities"
  },
  {
    id: 14,
    name: "JETRO Bangkok",
    type: "Trade Organization",
    location: "Bangkok, Thailand",
    category: "Government & Associations" as PartnerCategory,
    verified: true,
    features: ["Business Matching", "Market Research", "Consulting", "Networking"],
    description: "Japan External Trade Organization supporting business development"
  },
  {
    id: 15,
    name: "Singapore Business Federation",
    type: "Business Association",
    location: "Singapore",
    category: "Government & Associations" as PartnerCategory,
    verified: true,
    features: ["Advocacy", "Networking Events", "Resources", "Training"],
    description: "National business chamber representing Singapore enterprises"
  },
  {
    id: 16,
    name: "500 Global",
    type: "Venture Capital",
    location: "Singapore",
    category: "Investors" as PartnerCategory,
    verified: true,
    features: ["Seed Funding", "Mentorship", "Global Network", "Accelerator"],
    description: "Leading global venture capital firm investing in early-stage startups"
  },
  {
    id: 17,
    name: "Gobi Partners",
    type: "Venture Capital",
    location: "Hong Kong",
    category: "Investors" as PartnerCategory,
    verified: true,
    features: ["Series A/B Funding", "Portfolio Support", "Regional Network", "Advisory"],
    description: "Pan-Asian venture capital firm focused on tech startups"
  },
  {
    id: 18,
    name: "SCB 10X",
    type: "Corporate Venture Capital",
    location: "Bangkok, Thailand",
    category: "Investors" as PartnerCategory,
    verified: true,
    features: ["Strategic Investment", "Innovation Programs", "Partnerships", "Scaling Support"],
    description: "SCB's venture builder and innovation investment arm"
  }
];

const categoryIcons: Record<PartnerCategory, any> = {
  "Corporates": Briefcase,
  "Startups & SMEs": Rocket,
  "Universities & Academies": GraduationCap,
  "Government & Associations": Landmark,
  "Investors": TrendingUp
};

const PartnerList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const categories: PartnerCategory[] = [
    "Corporates",
    "Startups & SMEs",
    "Universities & Academies",
    "Government & Associations",
    "Investors"
  ];

  const filterPartners = (category: PartnerCategory) => {
    return partners.filter(p => 
      p.category === category && 
      (searchQuery === "" || 
       p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
       p.type.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
            TDPK Partner Network
          </h1>
          <Button asChild variant="premium" size="sm">
            <Link to="/auth">Join Network</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Globe className="h-10 w-10 text-secondary animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold">True Digital Park Ecosystem Partner Directory</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Discover our ecosystem partners across 5 categories
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search partners by name, location, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Partners by Category with Tabs */}
      <section className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="Corporates" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {categories.map(category => {
              const Icon = categoryIcons[category];
              const count = filterPartners(category).length;
              return (
                <TabsTrigger key={category} value={category} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{category}</span>
                  <Badge variant="secondary" className="ml-1">{count}</Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map(category => {
            const categoryPartners = filterPartners(category);
            
            return (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryPartners.length > 0 ? (
                    categoryPartners.map(partner => (
                      <Card key={partner.id} className="border-primary/10 hover:shadow-xl transition-all hover:border-primary/30">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                {partner.name}
                                {partner.verified && (
                                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                                )}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {partner.description}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Building2 className="h-4 w-4 text-primary" />
                              <span className="font-medium">{partner.type}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{partner.location}</span>
                            </div>

                            <div>
                              <p className="text-xs font-medium mb-2 text-muted-foreground">Key Features</p>
                              <div className="flex flex-wrap gap-1">
                                {partner.features.map(feature => (
                                  <Badge key={feature} variant="secondary" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">No partners found matching your search.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Access Our Network?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Become a TDPK member and unlock access to all partner spaces across Asia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="premium">
                <Link to="/auth">Become a Member</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/spaces">View Spaces</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PartnerList;
