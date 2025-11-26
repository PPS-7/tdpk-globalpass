import { MapPin, Users, Wifi, Coffee, Calendar, Search, Building2, Briefcase } from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface CoworkingSpace {
  id: string;
  name: string;
  location: string;
  region: string;
  description: string;
  amenities: string[];
  members: number;
  image: string;
}

interface OfficeSpace {
  id: string;
  name: string;
  type: "Fully Furnished" | "White Box";
  location: string;
  description: string;
  features: string[];
  availableUnits: string[];
  priceRange: string;
  image: string;
}

const coworkingSpaces: CoworkingSpace[] = [
  {
    id: "1",
    name: "True Digital Park",
    location: "Bangkok, Thailand",
    region: "Thailand",
    description: "Southeast Asia's largest tech and startup hub, fostering innovation and collaboration across the digital ecosystem.",
    amenities: ["High-Speed WiFi", "Meeting Rooms", "Event Space", "Cafe", "24/7 Access"],
    members: 1200,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop"
  },
  {
    id: "1a",
    name: "True Space",
    location: "Bangkok, Thailand",
    region: "Thailand",
    description: "Premium flexible workspace solution offering hot desks and dedicated seating in a vibrant community environment.",
    amenities: ["High-Speed WiFi", "Hot Desks", "Dedicated Desks", "Lounge Area", "Coffee Bar", "Community Events"],
    members: 350,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Salt Fukuoka",
    location: "Fukuoka, Japan",
    region: "Japan",
    description: "A vibrant coworking space in Japan's startup city, connecting entrepreneurs and innovators in Kyushu's tech hub.",
    amenities: ["High-Speed WiFi", "Private Booths", "Lounge Area", "Kitchen", "Networking Events"],
    members: 450,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Taiwan Tech Hub",
    location: "Taipei, Taiwan",
    region: "Taiwan",
    description: "Premier coworking space in Taipei's innovation district, bridging Eastern and Western startup cultures.",
    amenities: ["High-Speed WiFi", "Conference Rooms", "Phone Booths", "Recreation Area", "Mentorship Programs"],
    members: 680,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Kaohsiung Innovation Center",
    location: "Kaohsiung, Taiwan",
    region: "Taiwan",
    description: "Southern Taiwan's leading tech workspace, supporting the growing startup ecosystem in the port city.",
    amenities: ["High-Speed WiFi", "Hot Desks", "Event Space", "Cafe", "Parking"],
    members: 320,
    image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Singapore Innovation Hub",
    location: "Singapore",
    region: "Singapore",
    description: "World-class coworking space in Asia's business capital, connecting global entrepreneurs and investors.",
    amenities: ["High-Speed WiFi", "Premium Offices", "Rooftop Lounge", "Restaurant", "Concierge Service"],
    members: 890,
    image: "https://images.unsplash.com/photo-1497366672149-e5e4b4d34eb3?w=800&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Manila Startup Space",
    location: "Manila, Philippines",
    region: "Philippines",
    description: "Dynamic coworking environment in Metro Manila, empowering Filipino entrepreneurs and tech innovators.",
    amenities: ["High-Speed WiFi", "Meeting Pods", "Game Room", "Pantry", "Community Events"],
    members: 520,
    image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=800&auto=format&fit=crop"
  }
];

const officeSpaces: OfficeSpace[] = [
  {
    id: "off-1",
    name: "True Digital Park - Tower A",
    type: "Fully Furnished",
    location: "Bangkok, Thailand",
    description: "Move-in ready office spaces with premium furniture, complete IT infrastructure, and modern design. Perfect for teams ready to start immediately.",
    features: ["Ergonomic Furniture", "Meeting Rooms Included", "IT Infrastructure", "Pantry Setup", "Reception Area", "Flexible Lease Terms"],
    availableUnits: ["2-4 person unit", "5-10 person unit", "11-20 person unit", "20+ person unit"],
    priceRange: "฿25,000 - ฿180,000/month",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop"
  },
  {
    id: "off-2",
    name: "True Digital Park - Tower B",
    type: "White Box",
    location: "Bangkok, Thailand",
    description: "Customizable office spaces with basic infrastructure. Design and build your ideal workspace to match your brand and culture.",
    features: ["Bare Shell Space", "Basic HVAC", "Electrical Setup", "Fire Safety Systems", "Access Control Ready", "Custom Layout Possible"],
    availableUnits: ["50-100 sqm", "100-200 sqm", "200-500 sqm", "500+ sqm"],
    priceRange: "฿500 - ฿800/sqm/month",
    image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=800&auto=format&fit=crop"
  },
  {
    id: "off-3",
    name: "True Space - Premium Suites",
    type: "Fully Furnished",
    location: "Bangkok, Thailand",
    description: "Boutique office suites with designer interiors and premium amenities. Ideal for established teams seeking a prestigious address.",
    features: ["Designer Interiors", "Premium Furniture", "Private Meeting Rooms", "Concierge Service", "Business Lounge Access", "Reserved Parking"],
    availableUnits: ["Executive suite (2-3 person)", "Team suite (4-8 person)", "Department suite (9-15 person)", "Corporate floor (16+ person)"],
    priceRange: "฿35,000 - ฿250,000/month",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop"
  }
];

const CoworkingSpaces = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [amenityFilter, setAmenityFilter] = useState("all");

  const filteredSpaces = coworkingSpaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         space.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = countryFilter === "all" || space.region === countryFilter;
    const matchesAmenity = amenityFilter === "all" || space.amenities.includes(amenityFilter);
    return matchesSearch && matchesCountry && matchesAmenity;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              TDPK Network
            </h1>
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
            Global Coworking Network
          </h2>
          <p className="text-lg text-muted-foreground">
            Access premium coworking spaces across Asia. One membership, infinite possibilities.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-5xl mx-auto mb-8">
          <StandardCard>
            <CardContent className="pt-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search spaces by name or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="Thailand">Thailand</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="Taiwan">Taiwan</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                    <SelectItem value="Philippines">Philippines</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={amenityFilter} onValueChange={setAmenityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Amenities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Amenities</SelectItem>
                    <SelectItem value="High-Speed WiFi">High-Speed WiFi</SelectItem>
                    <SelectItem value="Meeting Rooms">Meeting Rooms</SelectItem>
                    <SelectItem value="Event Space">Event Space</SelectItem>
                    <SelectItem value="Cafe">Cafe</SelectItem>
                    <SelectItem value="24/7 Access">24/7 Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </StandardCard>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <StandardCard className="text-center bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-foreground mb-1">7</div>
              <div className="text-sm text-muted-foreground">Locations</div>
            </CardContent>
          </StandardCard>
          <StandardCard className="text-center bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-foreground mb-1">4,400+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </CardContent>
          </StandardCard>
          <StandardCard className="text-center bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-foreground mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Access</div>
            </CardContent>
          </StandardCard>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No coworking spaces found matching your filters.</p>
            </div>
          ) : (
            filteredSpaces.map((space) => (
              <StandardCard key={space.id} className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={space.image} 
                  alt={space.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur">
                  {space.region}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{space.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {space.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {space.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{space.members}</span>
                  <span className="text-muted-foreground">members</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {space.amenities.slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {amenity === "High-Speed WiFi" && <Wifi className="w-3 h-3 mr-1" />}
                      {amenity === "Cafe" && <Coffee className="w-3 h-3 mr-1" />}
                      {amenity}
                    </Badge>
                  ))}
                  {space.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{space.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                <Button variant="hero" className="w-full">
                  View Details
                </Button>
                <Badge variant="outline" className="w-full justify-center mt-2">
                  Perks Coming Soon
                </Badge>
              </CardContent>
              </StandardCard>
            ))
          )}
        </div>

        {/* Office Space Solutions Section */}
        <div className="mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-secondary via-primary to-primary-glow bg-clip-text text-transparent">
              Office Space Solutions
            </h2>
            <p className="text-lg text-muted-foreground">
              From fully furnished move-in ready offices to customizable white box spaces - find the perfect solution for your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officeSpaces.map((office) => (
              <StandardCard key={office.id} className="overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={office.image} 
                    alt={office.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-3 right-3 backdrop-blur ${
                    office.type === "Fully Furnished" 
                      ? "bg-primary/90" 
                      : "bg-secondary/90"
                  }`}>
                    {office.type}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    {office.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {office.location}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {office.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2 text-sm">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span className="font-semibold">Available Units:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {office.availableUnits.map((unit, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {unit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {office.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {office.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{office.features.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm font-semibold text-center">
                      {office.priceRange}
                    </p>
                  </div>

                  <Button variant="premium" className="w-full">
                    Request Quote
                  </Button>
                </CardContent>
              </StandardCard>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <StandardCard className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Network Today</h3>
              <p className="text-muted-foreground mb-6">
                Get access to all coworking spaces in our network with a single membership
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button variant="premium" size="lg" onClick={() => window.location.href = "/auth"}>
                  Sign Up Now
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </StandardCard>
        </div>
      </section>
    </div>
  );
};

export default CoworkingSpaces;
