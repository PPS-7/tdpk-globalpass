import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, MapPin, Gift, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-12 w-12 text-secondary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              TDPK
            </h1>
          </div>
          <h2 className="text-4xl font-bold mb-4">Global Coworking Membership</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            One membership. Access to premium coworking spaces across Thailand, Japan, and beyond.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Network</h3>
            <p className="text-muted-foreground">
              Access partner locations in Bangkok, Tokyo, Fukuoka, and more
            </p>
          </div>
          <div className="text-center p-6">
            <Gift className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Exclusive Perks</h3>
            <p className="text-muted-foreground">
              Enjoy discounts and special offers at all partner locations
            </p>
          </div>
          <div className="text-center p-6">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Digital Pass</h3>
            <p className="text-muted-foreground">
              Secure QR-based verification for instant access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
