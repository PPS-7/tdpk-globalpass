import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, MapPin, Gift, Shield, Zap, Globe, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import tdpkLogo from "@/assets/tdpk-logo.png";
import tdpkBuilding from "@/assets/tdpk-building.png";
import Footer from "@/components/Footer";

const Index = () => {
  const [seeding, setSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeedDemoData = async () => {
    setSeeding(true);
    try {
      const { error } = await supabase.functions.invoke('seed-demo-data');
      
      if (error) throw error;
      
      toast({
        title: "Demo Data Created",
        description: "Demo users and data have been seeded successfully. You can now log in with demo credentials.",
      });
    } catch (error: any) {
      toast({
        title: "Seeding Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="flex items-center justify-center mb-6">
          <img src={tdpkLogo} alt="True Digital Park" className="h-20 md:h-28" />
        </div>
        <p className="text-xl md:text-2xl text-foreground font-semibold mb-4">
          Your Global Coworking Network Pass
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Access premium coworking spaces across Asia with one membership. 
          Work anywhere, connect everywhere.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" variant="hero" className="min-w-[200px]">
            <Link to="/auth">Get Started</Link>
          </Button>
          <Button 
            onClick={handleSeedDemoData} 
            disabled={seeding}
            size="lg" 
            variant="outline" 
            className="min-w-[200px]"
          >
            {seeding ? "Seeding..." : "Setup Demo Data"}
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Our Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Partner Directory - Start with ecosystem overview */}
          <Link to="/partners">
            <Card className="h-full border-primary/10 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg w-fit">
                    <Globe className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Ecosystem Partner Directory</h3>
                    <p className="text-sm text-muted-foreground">
                      Discover 100+ partners including investors, corporates, and service providers across Asia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 2. Coworking Spaces - Next, show workspace options */}
          <Link to="/spaces">
            <Card className="h-full border-primary/10 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Global Coworking Spaces</h3>
                    <p className="text-sm text-muted-foreground">
                      Access premium coworking spaces across 6 locations in Southeast Asia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 3. Membership Plans - Then show membership options */}
          <Link to="/membership">
            <Card className="h-full border-primary/10 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg w-fit">
                    <Crown className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Membership Plans</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose from free to premium tiers with exclusive benefits and perks
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 4. Exclusive Perks - Show benefits */}
          <Link to="/perks">
            <Card className="h-full border-primary/10 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg w-fit">
                    <Gift className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Exclusive Perks & Offers</h3>
                    <p className="text-sm text-muted-foreground">
                      Unlock special discounts at 100+ partner locations network-wide
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 5. International Services - For expansion */}
          <Link to="/international-services">
            <Card className="h-full border-primary/10 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">International Services</h3>
                    <p className="text-sm text-muted-foreground">
                      Visa support, market entry assistance, and ecosystem tours for global expansion
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 6. Tenant Privilege - For office tenants */}
          <Link to="/tenant-privilege">
            <Card className="h-full border-primary/10 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg w-fit">
                    <Shield className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Tenant Privilege Program</h3>
                    <p className="text-sm text-muted-foreground">
                      Premium benefits and VIP access for TDPK office space tenants
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 7. Instant Verification - Utility feature */}
          <Link to="/verification">
            <Card className="h-full border-primary/10 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Instant Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Quick QR code scanning for seamless check-ins at partner locations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 8. Digital Pass - Utility feature */}
          <Link to="/digital-pass">
            <Card className="h-full border-primary/10 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">Digital Pass</h3>
                    <p className="text-sm text-muted-foreground">
                      Your mobile membership card with instant access to all benefits
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to work anywhere?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust TDPK for flexible workspace access
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="premium">
                <Link to="/auth">Start Your Journey</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/auth">Learn More</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
