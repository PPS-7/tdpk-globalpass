import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StandardCard } from "@/components/ui/standard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plane, Building2, HandshakeIcon, Globe, FileText, Users, Landmark } from "lucide-react";

/*  
NOTE FOR FUTURE:  
This page combines three major product pillars:
1. Ecosystem Tour (1-day)
2. Immersive Program (2-3 days)
3. International Services (Visa, Landing, Market Entry)

Data is currently static mock data.
Future implementation will connect to real database tables.
*/

const InternationalServices = () => {
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
            <Globe className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            International Services, Ecosystem Tour & Immersive Program
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive support for international talents, startups, and investors entering the Thai digital ecosystem
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Ecosystem Tour (1-day) */}
          <StandardCard>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Building2 className="h-8 w-8 text-primary" />
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <CardTitle className="text-xl">Ecosystem Tour</CardTitle>
              <CardDescription>One-Day Introduction</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                A comprehensive one-day tour of Thailand's digital innovation ecosystem, featuring key locations and networking opportunities.
              </p>
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-sm">Highlights:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Visit True Digital Park facilities</li>
                  <li>• Meet ecosystem partners</li>
                  <li>• Government agency introductions</li>
                  <li>• Networking lunch included</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full" disabled>
                Learn More
              </Button>
            </CardContent>
          </StandardCard>

          {/* Immersive Program (2-3 days) */}
          <StandardCard>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-secondary" />
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <CardTitle className="text-xl">Immersive Program</CardTitle>
              <CardDescription>2-3 Day Deep Dive</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                An intensive multi-day program designed for serious entrepreneurs and investors looking to establish presence in Thailand.
              </p>
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-sm">Sample Itinerary:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Day 1: Ecosystem overview & facility tours</li>
                  <li>• Day 2: Government meetings (BOI, DEPA)</li>
                  <li>• Day 3: Partner matchmaking & workshops</li>
                  <li>• Personalized consultation included</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full" disabled>
                View Full Agenda
              </Button>
            </CardContent>
          </StandardCard>

          {/* Visa Services */}
          <StandardCard>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-8 w-8 text-primary" />
                <Badge>Available</Badge>
              </div>
              <CardTitle className="text-xl">Visa Services</CardTitle>
              <CardDescription>Immigration Support</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive visa and work permit assistance for foreign talents, startup founders, and investors.
              </p>
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-sm">Services Include:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Smart Visa application support</li>
                  <li>• Work permit processing</li>
                  <li>• BOI visa coordination</li>
                  <li>• Documentation guidance</li>
                </ul>
              </div>
              <Button variant="premium" className="w-full">
                Get Started
              </Button>
            </CardContent>
          </StandardCard>

          {/* Landing Programs */}
          <StandardCard>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Plane className="h-8 w-8 text-secondary" />
                <Badge>Available</Badge>
              </div>
              <CardTitle className="text-xl">Landing Programs</CardTitle>
              <CardDescription>Soft Landing Support</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                End-to-end support for startups and businesses establishing operations in Thailand.
              </p>
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-sm">What's Included:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Company registration assistance</li>
                  <li>• Banking setup support</li>
                  <li>• Office space consultation</li>
                  <li>• Local partner introductions</li>
                </ul>
              </div>
              <Button variant="premium" className="w-full">
                Start Landing
              </Button>
            </CardContent>
          </StandardCard>

          {/* Market Entry Support */}
          <StandardCard>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <HandshakeIcon className="h-8 w-8 text-primary" />
                <Badge>Available</Badge>
              </div>
              <CardTitle className="text-xl">Market Entry Support</CardTitle>
              <CardDescription>Business Expansion</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                Strategic guidance and connections to accelerate your market entry into Southeast Asia.
              </p>
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-sm">Services:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Market research & insights</li>
                  <li>• Partner matchmaking</li>
                  <li>• Customer introductions</li>
                  <li>• Go-to-market strategy</li>
                </ul>
              </div>
              <Button variant="premium" className="w-full">
                Explore Options
              </Button>
            </CardContent>
          </StandardCard>

          {/* Government Connections */}
          <StandardCard>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Landmark className="h-8 w-8 text-secondary" />
                <Badge>Available</Badge>
              </div>
              <CardTitle className="text-xl">Government Connections</CardTitle>
              <CardDescription>Official Support</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                Direct connections to key government agencies supporting digital economy and foreign investment.
              </p>
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-sm">Agency Partners:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• BOI (Board of Investment)</li>
                  <li>• DEPA (Digital Economy Promotion)</li>
                  <li>• NSTDA (Science & Technology)</li>
                  <li>• Startup Thailand</li>
                </ul>
              </div>
              <Button variant="premium" className="w-full">
                Connect Now
              </Button>
            </CardContent>
          </StandardCard>

        </div>

        {/* CTA Section */}
        <StandardCard className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="py-8 w-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Expand to Thailand?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let us guide your journey into Southeast Asia's digital innovation hub
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="premium">
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline">
                  Download Brochure
                </Button>
              </div>
            </div>
          </CardContent>
        </StandardCard>
      </section>
    </div>
  );
};

export default InternationalServices;
