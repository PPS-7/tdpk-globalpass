import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, MapPin, Gift, Shield, Zap, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="h-12 w-12 text-secondary animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
            TDPK
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
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
          <Button asChild size="lg" variant="premium" className="min-w-[200px]">
            <Link to="/spaces">Explore Spaces</Link>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-primary/10 hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Globe className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Global Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Access partner spaces across Thailand, Japan, Taiwan, and beyond
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Smart Directory</h3>
                  <p className="text-sm text-muted-foreground">
                    Find and navigate to nearby coworking spaces with ease
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Gift className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Exclusive Perks</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock special offers and discounts at partner locations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Instant Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick QR code scanning for seamless check-ins
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tenant Privilege</h3>
                  <p className="text-sm text-muted-foreground">
                    Special benefits for office tenants in the network
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Digital Pass</h3>
                  <p className="text-sm text-muted-foreground">
                    Your membership in your pocket, always accessible
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
    </div>
  );
};

export default Index;
