import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Building2, Globe, CheckCircle2 } from "lucide-react";

const partners = [
  {
    id: 1,
    name: "True Digital Park",
    type: "Coworking Space",
    location: "Bangkok, Thailand",
    region: "Southeast Asia",
    verified: true,
    features: ["High-speed WiFi", "Meeting Rooms", "Event Space", "Cafe"],
    description: "Thailand's largest startup ecosystem hub with world-class facilities"
  },
  {
    id: 2,
    name: "Salt Fukuoka",
    type: "Coworking Space",
    location: "Fukuoka, Japan",
    region: "East Asia",
    verified: true,
    features: ["24/7 Access", "Private Offices", "Lounge Area", "Kitchen"],
    description: "Modern workspace in the heart of Fukuoka's business district"
  },
  {
    id: 3,
    name: "CIT Taipei",
    type: "Innovation Hub",
    location: "Taipei, Taiwan",
    region: "East Asia",
    verified: true,
    features: ["Maker Space", "Event Hall", "Mentorship", "Networking"],
    description: "Taiwan's premier innovation and technology center"
  },
  {
    id: 4,
    name: "Impact Hub Taipei",
    type: "Coworking Space",
    location: "Taipei, Taiwan",
    region: "East Asia",
    verified: true,
    features: ["Community Events", "Workshops", "Hot Desks", "Meeting Rooms"],
    description: "Global network of social entrepreneurs and innovators"
  },
  {
    id: 5,
    name: "The Hive Singapore",
    type: "Coworking Space",
    location: "Singapore",
    region: "Southeast Asia",
    verified: true,
    features: ["Premium Location", "Business Lounge", "Virtual Office", "Conference Rooms"],
    description: "Boutique coworking spaces across Singapore's prime locations"
  },
  {
    id: 6,
    name: "Garage Society Hong Kong",
    type: "Members Club",
    location: "Hong Kong",
    region: "East Asia",
    verified: true,
    features: ["Rooftop Terrace", "Bar & Cafe", "Private Offices", "Community"],
    description: "Asia's leading workspace and members club for entrepreneurs"
  },
  {
    id: 7,
    name: "Work Venture Osaka",
    type: "Coworking Space",
    location: "Osaka, Japan",
    region: "East Asia",
    verified: true,
    features: ["Bilingual Staff", "Event Space", "Hot Desks", "Phone Booths"],
    description: "International-friendly coworking space in Osaka"
  },
  {
    id: 8,
    name: "TCEB Bangkok",
    type: "Convention Center",
    location: "Bangkok, Thailand",
    region: "Southeast Asia",
    verified: true,
    features: ["Exhibition Halls", "Conference Rooms", "Business Services", "Parking"],
    description: "Thailand Convention & Exhibition Bureau facilities"
  },
  {
    id: 9,
    name: "StartupX Manila",
    type: "Innovation Space",
    location: "Manila, Philippines",
    region: "Southeast Asia",
    verified: true,
    features: ["Startup Programs", "Mentoring", "Workspace", "Networking"],
    description: "Empowering Filipino startups and entrepreneurs"
  },
  {
    id: 10,
    name: "WeWork Seoul",
    type: "Coworking Space",
    location: "Seoul, South Korea",
    region: "East Asia",
    verified: true,
    features: ["Modern Design", "Community Events", "Enterprise Solutions", "Wellness Room"],
    description: "Global coworking brand with multiple Seoul locations"
  },
  {
    id: 11,
    name: "Common Ground Kuala Lumpur",
    type: "Coworking Space",
    location: "Kuala Lumpur, Malaysia",
    region: "Southeast Asia",
    verified: true,
    features: ["Flexible Plans", "Meeting Rooms", "High-speed Internet", "Printing"],
    description: "Collaborative workspace in KL's business hub"
  },
  {
    id: 12,
    name: "Creative Hub Kaohsiung",
    type: "Creative Space",
    location: "Kaohsiung, Taiwan",
    region: "East Asia",
    verified: true,
    features: ["Art Studio", "Exhibition Space", "Workshops", "Cafe"],
    description: "Supporting Taiwan's creative and cultural industries"
  }
];

const PartnerList = () => {
  const regions = [...new Set(partners.map(p => p.region))];

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
          <h2 className="text-4xl md:text-5xl font-bold">Global Partner Network</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Access {partners.length}+ premium coworking spaces and innovation hubs across Asia
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {regions.map(region => (
            <Badge key={region} variant="outline" className="px-4 py-1">
              <MapPin className="h-3 w-3 mr-1" />
              {region}
            </Badge>
          ))}
        </div>
      </section>

      {/* Partners Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map(partner => (
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
                    <p className="text-xs font-medium mb-2 text-muted-foreground">Available Features</p>
                    <div className="flex flex-wrap gap-1">
                      {partner.features.map(feature => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Badge className="w-full justify-center">{partner.region}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
