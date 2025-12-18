import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Globe, Search, Loader2, ExternalLink, Building2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Partner {
  id: string;
  display_name: string;
  legal_name: string;
  country_code: string;
  website: string | null;
  category: string | null;
  status: string;
}

// Country code to name mapping
const countryNames: Record<string, string> = {
  "TH": "Thailand",
  "SG": "Singapore",
  "MY": "Malaysia",
  "VN": "Vietnam",
  "ID": "Indonesia",
  "PH": "Philippines",
  "JP": "Japan",
  "KR": "South Korea",
  "CN": "China",
  "HK": "Hong Kong",
  "TW": "Taiwan",
  "US": "United States",
  "UK": "United Kingdom",
  "AU": "Australia",
};

const PartnerList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('id, display_name, legal_name, country_code, website, category, status')
        .eq('status', 'active')
        .order('display_name');

      if (error) throw error;
      
      const partnerData = data || [];
      setPartners(partnerData);
      
      // Extract unique countries
      const uniqueCountries = [...new Set(partnerData.map(p => p.country_code))].sort();
      setCountries(uniqueCountries);
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

  const filterPartners = (countryCode: string) => {
    return partners.filter(p => 
      p.country_code === countryCode && 
      (searchQuery === "" || 
       p.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       (p.category?.toLowerCase() || "").includes(searchQuery.toLowerCase()))
    );
  };

  const getCountryName = (code: string) => countryNames[code] || code;

  // Generate initials for logo placeholder
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate brief profile from category
  const getBriefProfile = (partner: Partner) => {
    if (partner.category) {
      return `${partner.category} partner in the True Digital Park ecosystem`;
    }
    return "Ecosystem partner at True Digital Park";
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
          <h2 className="text-4xl md:text-5xl font-bold">Ecosystem Partner Directory</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Discover our trusted partners across the region
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search partners by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Partners by Country */}
      <section className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : countries.length > 0 ? (
          <Tabs defaultValue={countries[0]} className="w-full">
            <TabsList className="flex flex-wrap gap-2 h-auto mb-8 bg-transparent justify-center">
              {countries.map(countryCode => {
                const count = filterPartners(countryCode).length;
                return (
                  <TabsTrigger 
                    key={countryCode} 
                    value={countryCode} 
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <span>{getCountryName(countryCode)}</span>
                    <Badge variant="secondary" className="ml-1">{count}</Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {countries.map(countryCode => {
              const countryPartners = filterPartners(countryCode);
              
              return (
                <TabsContent key={countryCode} value={countryCode}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {countryPartners.length > 0 ? (
                      countryPartners.map(partner => (
                        <Card key={partner.id} className="border-primary/10 hover:shadow-xl transition-all hover:border-primary/30 overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center space-y-4">
                              {/* Logo Placeholder */}
                              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/10">
                                <span className="text-2xl font-bold text-primary">
                                  {getInitials(partner.display_name)}
                                </span>
                              </div>
                              
                              {/* Company Name */}
                              <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                  {partner.display_name}
                                </h3>
                                {partner.category && (
                                  <Badge variant="outline" className="mt-2 text-xs">
                                    {partner.category}
                                  </Badge>
                                )}
                              </div>
                              
                              {/* Brief Profile */}
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {getBriefProfile(partner)}
                              </p>
                              
                              {/* Website Link */}
                              {partner.website && (
                                <a 
                                  href={partner.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  Visit Website
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
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No partners available at this time.</p>
          </div>
        )}
      </section>

      {/* Contact CTA Section */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Want to Connect with Our Partners?</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Interested in connecting with any of our ecosystem partners? Contact True Digital Park directly and we'll facilitate the introduction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="premium">
                <Link to="/international-services">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/membership">Become a Member</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PartnerList;
