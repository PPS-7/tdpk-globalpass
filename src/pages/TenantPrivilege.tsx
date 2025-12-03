import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";

interface Event {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  time: string;
  location: string;
  description: string;
  accessType: "tenant" | "free";
  month: string;
}

const TenantPrivilege = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    // January 2026
    {
      id: "1",
      title: "Tech Innovation Summit 2026",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      date: "January 15, 2026",
      time: "09:00 - 18:00",
      location: "TDPK Main Hall, 6th Floor",
      description: "Join industry leaders and innovators for a day of insights into emerging technologies. Features keynote speeches, panel discussions, and networking opportunities with top tech executives from across Southeast Asia.",
      accessType: "tenant",
      month: "January 2026"
    },
    {
      id: "2",
      title: "Startup Pitch Night",
      thumbnail: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=300&fit=crop",
      date: "January 22, 2026",
      time: "18:00 - 21:00",
      location: "TDPK Event Space, 5th Floor",
      description: "Watch promising startups pitch their ideas to a panel of investors. Great opportunity for networking and discovering the next big thing in Thai tech ecosystem.",
      accessType: "free",
      month: "January 2026"
    },
    // February 2026
    {
      id: "3",
      title: "Digital Marketing Masterclass",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      date: "February 5, 2026",
      time: "13:00 - 17:00",
      location: "TDPK Training Room A",
      description: "Learn advanced digital marketing strategies from industry experts. Topics include SEO, social media marketing, content strategy, and analytics-driven decision making.",
      accessType: "tenant",
      month: "February 2026"
    },
    {
      id: "4",
      title: "Women in Tech Networking",
      thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
      date: "February 14, 2026",
      time: "18:30 - 21:00",
      location: "TDPK Rooftop Lounge",
      description: "Celebrate and connect with women leaders in technology. An evening of inspiring talks, mentorship opportunities, and building meaningful professional connections.",
      accessType: "free",
      month: "February 2026"
    },
    {
      id: "5",
      title: "AI & Machine Learning Workshop",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      date: "February 20, 2026",
      time: "09:00 - 16:00",
      location: "TDPK Innovation Lab",
      description: "Hands-on workshop covering practical applications of AI and ML in business. Bring your laptop and learn to build your first AI models with guidance from experts.",
      accessType: "tenant",
      month: "February 2026"
    },
    // March 2026
    {
      id: "6",
      title: "Fintech Forum Bangkok",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      date: "March 8, 2026",
      time: "09:00 - 17:00",
      location: "TDPK Main Hall, 6th Floor",
      description: "Annual gathering of fintech leaders discussing the future of financial services in Thailand. Featuring regulatory updates, case studies, and partnership opportunities.",
      accessType: "tenant",
      month: "March 2026"
    },
    {
      id: "7",
      title: "Monthly Startup Mixer",
      thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
      date: "March 12, 2026",
      time: "18:00 - 21:00",
      location: "TDPK Co-working Lounge",
      description: "Our popular monthly networking event bringing together founders, investors, and tech enthusiasts. Enjoy drinks and appetizers while expanding your professional network.",
      accessType: "free",
      month: "March 2026"
    },
    {
      id: "8",
      title: "UX/UI Design Sprint",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      date: "March 25-26, 2026",
      time: "09:00 - 18:00",
      location: "TDPK Design Studio",
      description: "Two-day intensive design sprint where teams tackle real product challenges. Learn design thinking methodology and collaborate with talented designers from the ecosystem.",
      accessType: "tenant",
      month: "March 2026"
    },
  ];

  // Group events by month
  const eventsByMonth = events.reduce((acc, event) => {
    if (!acc[event.month]) {
      acc[event.month] = [];
    }
    acc[event.month].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

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
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-full mb-4">
            <Calendar className="h-12 w-12 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TDPK Events
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover upcoming events, workshops, and networking opportunities at True Digital Park
          </p>
        </div>

        {/* Events by Month */}
        {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
          <div key={month} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              {month}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {monthEvents.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-primary/10"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <Badge className="absolute top-2 right-2 bg-background/80 text-foreground">
                      {event.date.split(",")[0].split(" ")[1]}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-base line-clamp-2 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </p>
                    {/* Access Type Indicator */}
                    <p className="text-sm font-semibold text-destructive">
                      {event.accessType === "tenant" 
                        ? "🔒 Tenant Access Only" 
                        : "✓ Free Access Event"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="flex flex-wrap gap-6 justify-center mt-8 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-destructive">🔒 Tenant Access Only</span>
            <span className="text-sm text-muted-foreground">– Exclusive for TDPK tenants</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-destructive">✓ Free Access Event</span>
            <span className="text-sm text-muted-foreground">– Open to all visitors</span>
          </div>
        </div>
      </section>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedEvent && (
            <>
              <div className="aspect-video relative overflow-hidden rounded-lg mb-4 -mx-2 -mt-2">
                <img
                  src={selectedEvent.thumbnail}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
                <DialogDescription asChild>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <p className="text-sm font-semibold text-destructive pt-1">
                      {selectedEvent.accessType === "tenant" 
                        ? "🔒 Tenant Access Only" 
                        : "✓ Free Access Event"}
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
              <div className="mt-6">
                <Button className="w-full" variant="premium" size="lg">
                  Registration
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenantPrivilege;
