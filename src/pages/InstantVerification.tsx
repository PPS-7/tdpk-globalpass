import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Zap, QrCode, MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";

const InstantVerification = () => {
  const verificationTypes = [
    {
      id: "coworking",
      title: "Coworking Check-In",
      icon: MapPin,
      description: "Quick access to any partner space",
      features: [
        "Scan QR at entrance",
        "Instant membership verification",
        "Automated access logging",
        "Real-time occupancy updates"
      ],
      mockQRData: "TDPK-COWORK-12345"
    },
    {
      id: "events",
      title: "Event Access",
      icon: Calendar,
      description: "Seamless entry to TDPK events",
      features: [
        "Event registration confirmation",
        "Priority queue for members",
        "Automatic attendee tracking",
        "Post-event networking access"
      ],
      mockQRData: "TDPK-EVENT-67890"
    },
    {
      id: "meeting",
      title: "Meeting Room Booking",
      icon: Clock,
      description: "Confirm and access reserved spaces",
      features: [
        "Booking confirmation",
        "Room access credentials",
        "Time-based validity",
        "Extension requests"
      ],
      mockQRData: "TDPK-MEETING-54321"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Open Your Digital Pass",
      description: "Launch the TDPK app and navigate to your membership pass"
    },
    {
      step: 2,
      title: "Generate QR Code",
      description: "Tap to generate a secure, time-limited QR code"
    },
    {
      step: 3,
      title: "Present at Location",
      description: "Show QR code to staff or scan at self-service kiosk"
    },
    {
      step: 4,
      title: "Instant Access",
      description: "Get verified in seconds and enjoy the space"
    }
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
            <Zap className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Instant Verification
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience lightning-fast check-ins with QR code technology. No delays, no hassle.
          </p>
        </div>

        {/* Verification Types Tabs */}
        <div className="max-w-4xl mx-auto mb-16">
          <Tabs defaultValue="coworking" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="coworking">Coworking</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="meeting">Meetings</TabsTrigger>
            </TabsList>

            {verificationTypes.map((type) => {
              const Icon = type.icon;
              return (
                <TabsContent key={type.id} value={type.id} className="mt-6">
                  <Card className="border-primary/10">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{type.title}</CardTitle>
                          <CardDescription>{type.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Mock QR Code */}
                        <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg">
                          <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
                            <QrCode className="h-48 w-48 text-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground font-mono">{type.mockQRData}</p>
                          <p className="text-xs text-muted-foreground mt-2">Valid for 5 minutes</p>
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg mb-4">Features</h3>
                          {type.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <Card key={item.step} className="border-primary/10 text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <Card className="bg-muted/50 border-primary/10 mb-8">
          <CardContent className="py-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">
                  All QR codes are encrypted and time-limited. Your personal information is never exposed 
                  during verification. Each code is unique and expires after use or within 5 minutes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience Seamless Access</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join TDPK and enjoy instant verification at all partner locations
            </p>
            <Button asChild size="lg" variant="premium">
              <Link to="/auth">Get Your Digital Pass</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default InstantVerification;
