import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StandardCard } from "@/components/ui/standard-card";
import { CardContent, CardHeader, CardTitle, CardDescription, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Calendar, Briefcase, Percent, Users, Building } from "lucide-react";

const TenantPrivilege = () => {
  const privilegeCategories = [
    {
      title: "Event Access & Networking",
      icon: Calendar,
      color: "bg-primary/10 text-primary",
      benefits: [
        {
          name: "Priority Event Registration",
          description: "Get first access to all TDPK-hosted events, conferences, and workshops",
          value: "Exclusive"
        },
        {
          name: "VIP Seating",
          description: "Reserved seating at major events and networking sessions",
          value: "Complimentary"
        },
        {
          name: "Speaker Series",
          description: "Access to monthly industry leader talks and panel discussions",
          value: "Free Entry"
        },
        {
          name: "Networking Lounges",
          description: "Exclusive tenant-only networking spaces during events",
          value: "Members Only"
        }
      ]
    },
    {
      title: "Retail & F&B Discounts",
      icon: Percent,
      color: "bg-secondary/10 text-secondary",
      benefits: [
        {
          name: "In-Building Restaurants",
          description: "Special discounts at all TDPK food courts and restaurants",
          value: "15-20% Off"
        },
        {
          name: "Retail Shops",
          description: "Year-round discounts at retail partners within TDPK",
          value: "10-25% Off"
        },
        {
          name: "Partner Brands",
          description: "Exclusive offers from 100+ partnered brands nationwide",
          value: "Up to 30% Off"
        },
        {
          name: "Loyalty Program",
          description: "Earn points with every purchase, redeem for rewards",
          value: "5x Points"
        }
      ]
    },
    {
      title: "Workspace & Meeting Credits",
      icon: Briefcase,
      color: "bg-accent/10 text-accent-foreground",
      benefits: [
        {
          name: "Meeting Room Credits",
          description: "Monthly credits for booking meeting rooms",
          value: "20 hrs/month"
        },
        {
          name: "TDPK Coworking Access",
          description: "Unlimited access to TDPK coworking spaces",
          value: "Included"
        },
        {
          name: "True Space Network",
          description: "Cross-network access to True Space locations",
          value: "10 days/month"
        },
        {
          name: "Private Office Upgrades",
          description: "Priority booking for private offices and phone booths",
          value: "Anytime"
        }
      ]
    },
    {
      title: "Additional Perks",
      icon: Building,
      color: "bg-primary/10 text-primary",
      benefits: [
        {
          name: "Concierge Service",
          description: "Dedicated tenant support for bookings and inquiries",
          value: "24/7 Available"
        },
        {
          name: "Parking Benefits",
          description: "Discounted monthly parking rates at TDPK facilities",
          value: "30% Off"
        },
        {
          name: "Wellness Programs",
          description: "Gym, yoga classes, and health check-ups",
          value: "Subsidized"
        },
        {
          name: "Business Services",
          description: "Printing, courier, and administrative support",
          value: "Discounted Rates"
        }
      ]
    }
  ];

  const featuredEvents = [
    {
      title: "Tech Innovation Summit 2026",
      date: "January 15, 2026",
      type: "Conference",
      tenantBenefit: "Free VIP Pass (Regular: ฿5,000)"
    },
    {
      title: "Monthly Startup Mixer",
      date: "Every First Thursday",
      type: "Networking",
      tenantBenefit: "Complimentary Entry + Drinks"
    },
    {
      title: "Digital Marketing Workshop",
      date: "December 20, 2025",
      type: "Workshop",
      tenantBenefit: "Priority Registration"
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
          <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-full mb-4">
            <Shield className="h-12 w-12 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Tenant Privilege Program
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exclusive benefits designed for TDPK office tenants. Work smarter, save more, connect better.
          </p>
        </div>

        {/* Privilege Categories */}
        <div className="grid gap-8 mb-16">
          {privilegeCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Card key={idx} className="border-primary/10 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.benefits.map((benefit, benefitIdx) => (
                      <div key={benefitIdx} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-semibold">{benefit.name}</h4>
                          <Badge variant="secondary" className="shrink-0">{benefit.value}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Events */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Upcoming Tenant-Exclusive Events</h2>
            <Badge variant="secondary">Event Calendar — Coming Soon</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event, idx) => (
              <StandardCard key={idx}>
                <CardHeader>
                  <Badge className="w-fit mb-2">{event.type}</Badge>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium text-primary">{event.tenantBenefit}</p>
                  </div>
                  <Button className="w-full mt-4" variant="outline">Register Now</Button>
                </CardContent>
              </StandardCard>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">More events added monthly. Full calendar launching soon.</p>
          </div>
        </div>

        {/* Value Proposition */}
        <Card className="bg-muted/50 border-primary/10 mb-8">
          <CardContent className="py-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">฿50,000+</div>
                <p className="text-muted-foreground">Average Annual Savings</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <p className="text-muted-foreground">Partner Brands</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Concierge Support</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Become a TDPK Tenant</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Unlock all these privileges and more by choosing TDPK as your office space
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="premium">
                <Link to="/auth">Inquire About Office Space</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/partners">View Locations</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TenantPrivilege;
