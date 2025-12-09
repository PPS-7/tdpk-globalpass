import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StandardCard } from "@/components/ui/standard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plane, Building2, HandshakeIcon, Globe, FileText, Users, Landmark, Briefcase, Building, Factory, GraduationCap } from "lucide-react";

/*  
NOTE FOR FUTURE:  
This page combines:
1. Ecosystem Tour (1-day)
2. Immersive Program (2-3 days)
3. International Services (Visa, Landing, Market Entry)
4. Business Matching & Local Partners (MERGED)

Data is currently static mock data.
*/

// Local partner logos for the scrolling preview
const localPartnerLogos = [
  { name: "Tech Corp", initial: "TC" },
  { name: "Bangkok Legal", initial: "BL" },
  { name: "Asia Consulting", initial: "AC" },
  { name: "Thai Business Hub", initial: "TH" },
  { name: "Innovation Lab", initial: "IL" },
  { name: "Digital Solutions", initial: "DS" },
  { name: "Market Pro", initial: "MP" },
  { name: "StartUp Thai", initial: "ST" },
];

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
          <StandardCard className="h-full">
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
          <StandardCard className="h-full">
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
          <StandardCard className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-primary border-primary/30">MOU Ecosystem Partner</Badge>
                  <Badge>Available</Badge>
                </div>
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
              <Badge className="bg-secondary text-secondary-foreground mb-3">Partner with Perks</Badge>
              <Button variant="premium" className="w-full">
                Get Started
              </Button>
            </CardContent>
          </StandardCard>

          {/* Market Exploration */}
          <StandardCard className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Plane className="h-8 w-8 text-secondary" />
                <Badge>Available</Badge>
              </div>
              <CardTitle className="text-xl">Market Exploration</CardTitle>
              <CardDescription>For Those Still Deciding</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                Not sure about expanding to Thailand yet? We help you explore and assess the market before making commitments.
              </p>
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-sm">What&apos;s Included:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Market feasibility assessment</li>
                  <li>• Industry landscape overview</li>
                  <li>• Competitor analysis</li>
                  <li>• Cost-benefit evaluation</li>
                </ul>
              </div>
              <Button variant="premium" className="w-full">
                Start Exploring
              </Button>
            </CardContent>
          </StandardCard>

          {/* Market Entry */}
          <StandardCard className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Building2 className="h-8 w-8 text-primary" />
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-primary border-primary/30">MOU Ecosystem Partner</Badge>
                  <Badge>Available</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Market Entry</CardTitle>
              <CardDescription>Ready to Expand</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                Ready to establish your business in Thailand? End-to-end support for company registration and operations setup.
              </p>
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-sm">What&apos;s Included:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Company registration assistance</li>
                  <li>• Banking setup support</li>
                  <li>• Office space consultation</li>
                  <li>• Legal & compliance guidance</li>
                </ul>
              </div>
              <Badge className="bg-secondary text-secondary-foreground mb-3">Partner with Perks</Badge>
              <Button variant="premium" className="w-full">
                Start Registration
              </Button>
            </CardContent>
          </StandardCard>

        </div>

        {/* Business Matching & Local Partners - MERGED SECTION */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-secondary/10 rounded-full">
              <HandshakeIcon className="h-8 w-8 text-secondary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Business Matching & Local Partners</h2>
              <p className="text-muted-foreground">Connect with strategic partners to accelerate your growth in Southeast Asia</p>
            </div>
          </div>

          {/* Partner Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Corporate Partners */}
            <StandardCard className="h-full">
              <CardHeader>
                <Building className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Corporate Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Large enterprises</li>
                  <li>• MNC subsidiaries</li>
                  <li>• Corporate innovation units</li>
                  <li>• Strategic investors</li>
                </ul>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/partners">Browse Partners</Link>
                </Button>
              </CardContent>
            </StandardCard>

            {/* Startup Partners */}
            <StandardCard className="h-full">
              <CardHeader>
                <Factory className="h-8 w-8 text-secondary mb-2" />
                <CardTitle className="text-lg">Startup Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Tech startups</li>
                  <li>• Scale-ups</li>
                  <li>• Accelerator alumni</li>
                  <li>• Venture-backed companies</li>
                </ul>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/partners">Browse Partners</Link>
                </Button>
              </CardContent>
            </StandardCard>

            {/* Government & Agencies */}
            <StandardCard className="h-full">
              <CardHeader>
                <Landmark className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Government & Agencies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• BOI Thailand</li>
                  <li>• DEPA</li>
                  <li>• NIA</li>
                  <li>• Trade associations</li>
                </ul>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/partners">Browse Partners</Link>
                </Button>
              </CardContent>
            </StandardCard>

            {/* Local Business Partners */}
            <StandardCard className="h-full">
              <CardHeader>
                <GraduationCap className="h-8 w-8 text-secondary mb-2" />
                <CardTitle className="text-lg">Local Business Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Legal & accounting firms</li>
                  <li>• Marketing agencies</li>
                  <li>• Technology providers</li>
                  <li>• Distribution partners</li>
                </ul>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/partners">Browse Partners</Link>
                </Button>
              </CardContent>
            </StandardCard>
          </div>

          {/* Local Partner Logo Preview Strip */}
          <div className="bg-muted/50 rounded-xl p-6">
            <p className="text-sm text-center text-muted-foreground mb-4">Local Business Matching Partners (Preview)</p>
            <div className="flex gap-4 justify-center flex-wrap">
              {localPartnerLogos.map((partner, idx) => (
                <div 
                  key={idx} 
                  className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm grayscale hover:grayscale-0 transition-all cursor-pointer"
                  title={partner.name}
                >
                  {partner.initial}
                </div>
              ))}
            </div>
          </div>
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