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
      month: "January"
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
      month: "January"
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
      month: "February"
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
      month: "February"
    },
    // March 2026
    {
      id: "5",
      title: "AI & Machine Learning Workshop",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      date: "March 8, 2026",
      time: "09:00 - 16:00",
      location: "TDPK Innovation Lab",
      description: "Hands-on workshop covering practical applications of AI and ML in business. Bring your laptop and learn to build your first AI models with guidance from experts.",
      accessType: "tenant",
      month: "March"
    },
    {
      id: "6",
      title: "Monthly Startup Mixer",
      thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
      date: "March 20, 2026",
      time: "18:00 - 21:00",
      location: "TDPK Co-working Lounge",
      description: "Our popular monthly networking event bringing together founders, investors, and tech enthusiasts. Enjoy drinks and appetizers while expanding your professional network.",
      accessType: "free",
      month: "March"
    },
    // April 2026
    {
      id: "7",
      title: "Fintech Forum Bangkok",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      date: "April 10, 2026",
      time: "09:00 - 17:00",
      location: "TDPK Main Hall, 6th Floor",
      description: "Annual gathering of fintech leaders discussing the future of financial services in Thailand. Featuring regulatory updates, case studies, and partnership opportunities.",
      accessType: "tenant",
      month: "April"
    },
    // May 2026
    {
      id: "8",
      title: "UX/UI Design Sprint",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      date: "May 15-16, 2026",
      time: "09:00 - 18:00",
      location: "TDPK Design Studio",
      description: "Two-day intensive design sprint where teams tackle real product challenges. Learn design thinking methodology and collaborate with talented designers.",
      accessType: "tenant",
      month: "May"
    },
    {
      id: "9",
      title: "Entrepreneur Bootcamp",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      date: "May 28, 2026",
      time: "09:00 - 17:00",
      location: "TDPK Training Center",
      description: "Intensive one-day bootcamp for aspiring entrepreneurs covering business planning, fundraising, and go-to-market strategies.",
      accessType: "free",
      month: "May"
    },
    // June 2026
    {
      id: "10",
      title: "Cloud Computing Summit",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      date: "June 12, 2026",
      time: "09:00 - 17:00",
      location: "TDPK Main Hall",
      description: "Explore the latest in cloud infrastructure, DevOps practices, and enterprise solutions with industry-leading cloud providers.",
      accessType: "tenant",
      month: "June"
    },
    // July 2026
    {
      id: "11",
      title: "Product Management Workshop",
      thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop",
      date: "July 8, 2026",
      time: "13:00 - 17:00",
      location: "TDPK Training Room B",
      description: "Learn product management frameworks from experienced PMs. Topics include roadmap planning, stakeholder management, and metrics-driven development.",
      accessType: "tenant",
      month: "July"
    },
    {
      id: "12",
      title: "Mid-Year Networking Gala",
      thumbnail: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop",
      date: "July 25, 2026",
      time: "18:00 - 22:00",
      location: "TDPK Rooftop",
      description: "Celebrate the mid-year milestone with fellow ecosystem members. An elegant evening of networking, entertainment, and recognition of achievements.",
      accessType: "free",
      month: "July"
    },
    // August 2026
    {
      id: "13",
      title: "Cybersecurity Conference",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
      date: "August 20, 2026",
      time: "09:00 - 17:00",
      location: "TDPK Main Hall",
      description: "Stay ahead of threats with insights from cybersecurity experts. Learn about the latest vulnerabilities, protection strategies, and compliance requirements.",
      accessType: "tenant",
      month: "August"
    },
    // September 2026
    {
      id: "14",
      title: "Sustainability in Tech Summit",
      thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
      date: "September 10, 2026",
      time: "09:00 - 16:00",
      location: "TDPK Event Space",
      description: "Explore how technology companies can drive sustainable practices. Featuring case studies on green tech, ESG reporting, and carbon-neutral operations.",
      accessType: "free",
      month: "September"
    },
    // October 2026
    {
      id: "15",
      title: "E-commerce Excellence Forum",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      date: "October 15, 2026",
      time: "09:00 - 17:00",
      location: "TDPK Main Hall",
      description: "Deep dive into e-commerce trends, conversion optimization, and omnichannel strategies with leading retail technology experts.",
      accessType: "tenant",
      month: "October"
    },
    {
      id: "16",
      title: "Halloween Tech Mixer",
      thumbnail: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=300&fit=crop",
      date: "October 31, 2026",
      time: "18:00 - 22:00",
      location: "TDPK Rooftop",
      description: "A spooky networking night with costume contests, tech demos, and plenty of treats. Come dressed as your favorite tech icon!",
      accessType: "free",
      month: "October"
    },
    // November 2026
    {
      id: "17",
      title: "Data Science Symposium",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      date: "November 12, 2026",
      time: "09:00 - 17:00",
      location: "TDPK Innovation Lab",
      description: "Explore advanced analytics, big data processing, and data visualization techniques with leading data scientists from top tech companies.",
      accessType: "tenant",
      month: "November"
    },
    // December 2026
    {
      id: "18",
      title: "Year-End Tech Awards",
      thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
      date: "December 15, 2026",
      time: "18:00 - 22:00",
      location: "TDPK Main Hall",
      description: "Celebrate the year's achievements with awards recognizing outstanding startups, innovations, and ecosystem contributors. Gala dinner included.",
      accessType: "tenant",
      month: "December"
    },
    {
      id: "19",
      title: "Holiday Networking Party",
      thumbnail: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400&h=300&fit=crop",
      date: "December 20, 2026",
      time: "18:00 - 22:00",
      location: "TDPK Rooftop Lounge",
      description: "End the year on a high note with fellow ecosystem members. Festive decorations, live music, and great company to wrap up 2026.",
      accessType: "free",
      month: "December"
    },
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Group events by month
  const eventsByMonth = months.reduce((acc, month) => {
    acc[month] = events.filter(event => event.month === month);
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
            TDPK Events 2026
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover upcoming events, workshops, and networking opportunities at True Digital Park
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 justify-center mb-10 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-destructive">🔒 Tenant Access Only</span>
            <span className="text-sm text-muted-foreground">– Exclusive for TDPK tenants</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-destructive">✓ Free Access Event</span>
            <span className="text-sm text-muted-foreground">– Open to all visitors</span>
          </div>
        </div>

        {/* Events by Month - Full Year */}
        {months.map((month) => (
          <div key={month} className="mb-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 border-b pb-3">
              <Calendar className="h-6 w-6 text-primary" />
              {month} 2026
            </h2>
            {eventsByMonth[month].length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {eventsByMonth[month].map((event) => (
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
                        {event.date.split(",")[0].split(" ")[1] || event.date.split(" ")[1]}
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
            ) : (
              <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                <p>No events scheduled for this month yet. Check back soon!</p>
              </div>
            )}
          </div>
        ))}
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
