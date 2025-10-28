import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Sparkles, QrCode, CreditCard, Calendar, MapPin, Gift, Shield, Download, Smartphone } from "lucide-react";

const DigitalPass = () => {
  const passFeatures = [
    {
      icon: QrCode,
      title: "Dynamic QR Code",
      description: "Secure, time-limited codes for instant verification at any location"
    },
    {
      icon: CreditCard,
      title: "Membership Details",
      description: "View your tier, status, and member ID at a glance"
    },
    {
      icon: Calendar,
      title: "Usage History",
      description: "Track your check-ins, bookings, and redemptions in one place"
    },
    {
      icon: MapPin,
      title: "Nearby Locations",
      description: "Quick access to partner spaces near your current location"
    },
    {
      icon: Gift,
      title: "Active Offers",
      description: "See available perks and discounts ready to redeem"
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Encrypted data with biometric protection options"
    }
  ];

  const passComponents = [
    { label: "Member Name", value: "Pakkanan Chansawang", icon: null },
    { label: "Member ID", value: "TDPK-2025-001234", icon: null },
    { label: "Tier", value: "Premium Member", badge: true, color: "primary" },
    { label: "Status", value: "Active", badge: true, color: "success" },
    { label: "Valid Through", value: "December 31, 2026", icon: Calendar },
    { label: "Network Access", value: "TDPK + True Space", icon: MapPin }
  ];

  const deviceFeatures = [
    "iOS & Android apps available",
    "Apple Wallet & Google Pay integration",
    "Offline access to saved pass",
    "Push notifications for offers",
    "Location-based check-ins",
    "Biometric authentication support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button asChild variant="ghost">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="premium">
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Digital Membership Pass
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your complete TDPK membership in your pocket. Access everything, anywhere, anytime.
          </p>
        </div>

        {/* Mock Digital Pass */}
        <div className="max-w-md mx-auto mb-16">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">TDPK Member Pass</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Member Info */}
              <div className="bg-background/60 backdrop-blur rounded-lg p-4 space-y-3">
                {passComponents.map((component, idx) => {
                  const Icon = component.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{component.label}</span>
                      </div>
                      {component.badge ? (
                        <Badge variant={component.color === "success" ? "default" : "secondary"}>
                          {component.value}
                        </Badge>
                      ) : (
                        <span className="text-sm font-medium">{component.value}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <Separator />

              {/* QR Code Section */}
              <div className="text-center py-6">
                <div className="bg-white p-6 rounded-lg inline-block shadow-lg mb-3">
                  <QrCode className="h-48 w-48 text-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Tap to generate new QR code</p>
                <p className="text-xs text-muted-foreground">Valid for 5 minutes</p>
              </div>

              <Separator />

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  Find Spaces
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Gift className="mr-2 h-4 w-4" />
                  View Offers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Everything You Need</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {passFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="border-primary/10 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Device Compatibility */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Smartphone className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Mobile Apps</CardTitle>
                  <CardDescription>Native experience on your device</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {deviceFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  App Store
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Play Store
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="h-8 w-8 text-secondary" />
                <div>
                  <CardTitle>Wallet Integration</CardTitle>
                  <CardDescription>Add to your device wallet</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Add your TDPK pass to Apple Wallet or Google Pay for even quicker access. 
                Your pass will update automatically with new offers and membership changes.
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add to Apple Wallet
                </Button>
                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add to Google Pay
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Get Your Digital Pass Today</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join TDPK and access your complete membership pass instantly on your mobile device
            </p>
            <Button asChild size="lg" variant="premium">
              <Link to="/auth">Create Account</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default DigitalPass;
