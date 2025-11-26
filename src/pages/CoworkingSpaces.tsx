import { MapPin, Users, Wifi, Coffee, Calendar, Search } from "lucide-react";
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
    name: "True Space Siam Square Soi 2",
    location: "Siam Square Soi 2, Bangkok",
    region: "Thailand",
    description: "Premium flexible workspace in the heart of Bangkok's shopping district. Perfect blend of work and lifestyle convenience.",
    amenities: ["High-Speed WiFi", "Hot Desks", "Dedicated Desks", "Meeting Rooms", "Coffee Bar", "Community Events"],
    members: 85,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop"
  },
  {
    id: "1b",
    name: "True Space Siam Square Soi 3",
    location: "Siam Square Soi 3, Bangkok",
    region: "Thailand",
    description: "Modern coworking space with vibrant atmosphere, located in Bangkok's creative hub with easy access to BTS Siam.",
    amenities: ["High-Speed WiFi", "Hot Desks", "Private Offices", "Phone Booths", "Cafe", "Rooftop Terrace"],
    members: 92,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop"
  },
  {
    id: "1c",
    name: "True Space ICONSIAM",
    location: "ICONSIAM 4th Floor, Bangkok",
    region: "Thailand",
    description: "Prestigious workspace overlooking the Chao Phraya River. Premium location for businesses seeking an impressive address.",
    amenities: ["High-Speed WiFi", "River View", "Premium Lounges", "Meeting Rooms", "Fine Dining Access", "Concierge Service"],
    members: 68,
    image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=800&auto=format&fit=crop"
  },
  {
    id: "1d",
    name: "True Space Asoke",
    location: "Asoke, Bangkok",
    region: "Thailand",
    description: "Strategic location in Bangkok's business district with excellent connectivity to BTS and MRT. Ideal for professionals and startups.",
    amenities: ["High-Speed WiFi", "Hot Desks", "Meeting Rooms", "Printing Services", "Kitchen", "Networking Events"],
    members: 110,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop"
  },
  {
    id: "1e",
    name: "True Space Rangsit University",
    location: "Rangsit University, Pathum Thani",
    region: "Thailand",
    description: "Innovation hub fostering student entrepreneurship and university-industry collaboration. Perfect for academic startups.",
    amenities: ["High-Speed WiFi", "Study Rooms", "Collaboration Space", "Mentorship Programs", "Student Discount", "24/7 Access"],
    members: 145,
    image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&auto=format&fit=crop"
  },
  {
    id: "1f",
    name: "True Space Mahidol University",
    location: "Mahidol University Salaya, Nakhon Pathom",
    region: "Thailand",
    description: "Academic coworking space supporting research commercialization and med-tech innovations at Thailand's premier medical university.",
    amenities: ["High-Speed WiFi", "Research Labs Access", "Meeting Rooms", "Innovation Zone", "Faculty Mentors", "Library Access"],
    members: 78,
    image: "https://images.unsplash.com/photo-1497366672149-e5e4b4d34eb3?w=800&auto=format&fit=crop"
  },
  {
    id: "1g",
    name: "True Space Ubon Ratchathani",
    location: "Y-Square Food Mall, Ubon Ratchathani",
    region: "Thailand",
    description: "Northeast Thailand's innovation hub, empowering local entrepreneurs and connecting regional businesses with national opportunities.",
    amenities: ["High-Speed WiFi", "Hot Desks", "Meeting Rooms", "Local Community", "Regional Events", "Food Court Access"],
    members: 58,
    image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=800&auto=format&fit=crop"
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
              <div className="text-3xl font-bold text-foreground mb-1">13</div>
              <div className="text-sm text-muted-foreground">Locations</div>
            </CardContent>
          </StandardCard>
          <StandardCard className="text-center bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-foreground mb-1">4,800+</div>
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
