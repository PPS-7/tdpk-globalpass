import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Building2, Globe, CheckCircle2, Briefcase, Rocket, GraduationCap, Landmark, TrendingUp, Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type PartnerCategory = "Corporates" | "Startups & SMEs" | "Universities & Academies" | "Government & Associations" | "Investors";

interface Partner {
  id: string;
  display_name: string;
  legal_name: string;
  address: string | null;
  country_code: string;
  phone: string | null;
  website: string | null;
  region: string;
  category: string;
  status: string;
  amenities: string[] | null;
}

const categoryIcons: Record<PartnerCategory, any> = {
  "Corporates": Briefcase,
  "Startups & SMEs": Rocket,
  "Universities & Academies": GraduationCap,
  "Government & Associations": Landmark,
  "Investors": TrendingUp
};

const PartnerList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const categories: PartnerCategory[] = [
    "Corporates",
    "Startups & SMEs",
    "Universities & Academies",
    "Government & Associations",
    "Investors"
  ];

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('status', 'active')
        .order('display_name');

      if (error) throw error;
      setPartners(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading partners",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterPartners = (category: PartnerCategory) => {
    return partners.filter(p => 
      p.category === category && 
      (searchQuery === "" || 
       p.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       (p.address?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
       p.country_code.toLowerCase().includes(searchQuery.toLowerCase()))
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
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
        <Tabs defaultValue="Investors" className="w-full">
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
                            <div className="flex-1">
                              <CardTitle className="text-lg flex items-center gap-2">
                                {partner.display_name}
                                <CheckCircle2 className="h-4 w-4 text-secondary" />
                              </CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {partner.legal_name}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Building2 className="h-4 w-4 text-primary" />
                              <span className="font-medium capitalize">{partner.region} Partner</span>
                            </div>
                            
                            {partner.address && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{partner.address}</span>
                              </div>
                            )}

                            {partner.amenities && partner.amenities.length > 0 && (
                              <div>
                                <p className="text-xs font-medium mb-2 text-muted-foreground">Key Features</p>
                                <div className="flex flex-wrap gap-1">
                                  {partner.amenities.slice(0, 4).map((amenity, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {amenity}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {partner.website && (
                              <a 
                                href={partner.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline block truncate"
                              >
                                {partner.website}
                              </a>
                            )}
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
        )}
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
