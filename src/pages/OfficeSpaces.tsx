import { MapPin, Building2, Briefcase } from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
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
const officeSpaces: OfficeSpace[] = [{
  id: "off-1",
  name: "True Digital Park - Tower A",
  type: "Fully Furnished",
  location: "Bangkok, Thailand",
  description: "Move-in ready office spaces with premium furniture, complete IT infrastructure, and modern design. Perfect for teams ready to start immediately.",
  features: ["Ergonomic Furniture", "Meeting Rooms Included", "IT Infrastructure", "Pantry Setup", "Reception Area", "Flexible Lease Terms"],
  availableUnits: ["2-4 person unit", "5-10 person unit", "11-20 person unit", "20+ person unit"],
  priceRange: "฿25,000 - ฿180,000/month",
  image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop"
}, {
  id: "off-2",
  name: "True Digital Park - Tower B",
  type: "White Box",
  location: "Bangkok, Thailand",
  description: "Customizable office spaces with basic infrastructure. Design and build your ideal workspace to match your brand and culture.",
  features: ["Bare Shell Space", "Basic HVAC", "Electrical Setup", "Fire Safety Systems", "Access Control Ready", "Custom Layout Possible"],
  availableUnits: ["50-100 sqm", "100-200 sqm", "200-500 sqm", "500+ sqm"],
  priceRange: "฿500 - ฿800/sqm/month",
  image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=800&auto=format&fit=crop"
}, {
  id: "off-3",
  name: "True Space - Premium Suites",
  type: "Fully Furnished",
  location: "Bangkok, Thailand",
  description: "Boutique office suites with designer interiors and premium amenities. Ideal for established teams seeking a prestigious address.",
  features: ["Designer Interiors", "Premium Furniture", "Private Meeting Rooms", "Concierge Service", "Business Lounge Access", "Reserved Parking"],
  availableUnits: ["Executive suite (2-3 person)", "Team suite (4-8 person)", "Department suite (9-15 person)", "Corporate floor (16+ person)"],
  priceRange: "฿35,000 - ฿250,000/month",
  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop"
}];
const OfficeSpaces = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const filteredSpaces = officeSpaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) || space.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || space.type === typeFilter;
    return matchesSearch && matchesType;
  });
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
            Office Space Solutions
          </h2>
          <p className="text-lg text-muted-foreground">From fully furnished, move-in-ready offices to customizable white-box spaces, find the perfect working space solution for your team.</p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <StandardCard>
            <CardContent className="pt-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input placeholder="Search by name or location..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Office Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Fully Furnished">Fully Furnished</SelectItem>
                    <SelectItem value="White Box">White Box</SelectItem>
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
              <Building2 className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <div className="text-3xl font-bold text-foreground mb-1">3</div>
              <div className="text-sm text-muted-foreground">Locations</div>
            </CardContent>
          </StandardCard>
          <StandardCard className="text-center bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <div className="text-3xl font-bold text-foreground mb-1">2</div>
              <div className="text-sm text-muted-foreground">Office Types</div>
            </CardContent>
          </StandardCard>
          <StandardCard className="text-center bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <div className="text-3xl font-bold text-foreground mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Customizable</div>
            </CardContent>
          </StandardCard>
        </div>

        {/* Office Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.length === 0 ? <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No office spaces found matching your filters.</p>
            </div> : filteredSpaces.map(office => <StandardCard key={office.id} className="overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img src={office.image} alt={office.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <Badge className={`absolute top-3 right-3 backdrop-blur ${office.type === "Fully Furnished" ? "bg-primary/90" : "bg-secondary/90"}`}>
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
                      {office.availableUnits.map((unit, index) => <Badge key={index} variant="outline" className="text-xs">
                          {unit}
                        </Badge>)}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {office.features.slice(0, 3).map((feature, index) => <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>)}
                    {office.features.length > 3 && <Badge variant="secondary" className="text-xs">
                        +{office.features.length - 3} more
                      </Badge>}
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
              </StandardCard>)}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <StandardCard className="max-w-2xl mx-auto bg-gradient-to-br from-secondary/5 to-primary/5">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Office?</h3>
              <p className="text-muted-foreground mb-6">
                Contact our team to schedule a tour and discuss your workspace requirements
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button variant="premium" size="lg" onClick={() => window.location.href = "/auth"}>
                  Contact Sales
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Tour
                </Button>
              </div>
            </CardContent>
          </StandardCard>
        </div>
      </section>
    </div>;
};
export default OfficeSpaces;