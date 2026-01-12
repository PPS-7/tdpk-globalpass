import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, MapPin, Gift, CalendarDays, Globe, Crown, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import tdpkLogo from "@/assets/tdpk-logo.png";
import tdpkBuilding from "@/assets/tdpk-building.png";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
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
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Our Ecosystem & Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          
          {/* Row 1 */}
          {/* 1. Ecosystem Partner Directory */}
          <Link to="/partners" className="block h-full">
            <Card className="h-full border-border/50 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30 bg-card">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-secondary/10 rounded-lg shrink-0">
                    <Globe className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">Ecosystem Partner Directory</h3>
                    <p className="text-sm text-muted-foreground">
                      Access 100+ partners across 5 categories in Asia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 2. Coworking Space Network */}
          <Link to="/spaces" className="block h-full">
            <Card className="h-full border-border/50 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30 bg-card">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">Coworking Space Network</h3>
                    <p className="text-sm text-muted-foreground">Access premium coworking spaces across Asia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 3. International Services */}
          <Link to="/international-services" className="block h-full">
            <Card className="h-full border-border/50 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30 bg-card">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">International Services</h3>
                    <p className="text-sm text-muted-foreground">Visa services, Landing Programs, and Ecosystem tours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 4. Office Space Solutions */}
          <Link to="/office-spaces" className="block h-full">
            <Card className="h-full border-border/50 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30 bg-card">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-secondary/10 rounded-lg shrink-0">
                    <Building2 className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">Office Space Solutions</h3>
                    <p className="text-sm text-muted-foreground">Select office spaces for your team</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Row 2 */}
          {/* 5. Digital Member Pass */}
          <Link to="/digital-pass" className="block h-full">
            <Card className="h-full border-border/50 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30 bg-card">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">Digital Member Pass</h3>
                    <p className="text-sm text-muted-foreground">
                      Your mobile membership card with instant access
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 6. Membership Plans */}
          <Link to="/membership" className="block h-full">
            <Card className="h-full border-border/50 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30 bg-card">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-secondary/10 rounded-lg shrink-0">
                    <Crown className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">Membership Plans</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose from free to premium tiers with exclusive benefits
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 7. Exclusive Perks & Offers */}
          <Link to="/perks" className="block h-full">
            <Card className="h-full border-border/50 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30 bg-card">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-secondary/10 rounded-lg shrink-0">
                    <Gift className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">Exclusive Perks & Offers</h3>
                    <p className="text-sm text-muted-foreground">
                      Unlock special discounts at 100+ partner locations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 8. Event Calendar */}
          <Link to="/tenant-privilege" className="block h-full">
            <Card className="h-full border-border/50 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30 bg-card">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-secondary/10 rounded-lg shrink-0">
                    <CalendarDays className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">Event Calendar</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore TDPK's yearly events, workshops, and networking sessions
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
    </div>;
};
export default Index;