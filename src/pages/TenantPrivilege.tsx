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
import { ArrowLeft, Calendar, Clock, MapPin, Users, Building, Globe, Lock } from "lucide-react";

interface Event {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  time: string;
  location: string;
  description: string;
  accessType: "tdpk" | "partner" | "free" | "tenant" | "public";
  month: string;
}

const TenantPrivilege = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Filter categories for events
  const filterCategories = [
    { id: "all", label: "All Events", icon: Calendar },
    { id: "tdpk", label: "TDPK Event", icon: Building },
    { id: "partner", label: "Partner Event", icon: Users },
    { id: "free", label: "Free Event", icon: Globe },
    { id: "tenant", label: "Tenant Free Access", icon: Lock },
    { id: "public", label: "Free for Public", icon: Users },
  ];

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
      accessType: "tdpk",
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
      accessType: "public",
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
      accessType: "partner",
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
      accessType: "public",
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
      accessType: "tdpk",
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
      accessType: "partner",
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
      accessType: "public",
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
      accessType: "tdpk",
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
      accessType: "partner",
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
      accessType: "public",
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
      accessType: "tdpk",
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

  // Filter events by accessType
  const filteredEvents = activeFilter === "all" 
    ? events 
    : events.filter(event => event.accessType === activeFilter);

  // Group filtered events by month
  const eventsByMonth = months.reduce((acc, month) => {
    acc[month] = filteredEvents.filter(event => event.month === month);
    return acc;
  }, {} as Record<string, Event[]>);

  // Access type badge styling
  const getAccessBadge = (accessType: string) => {
    switch (accessType) {
      case "tdpk":
        return { label: "TDPK Event", className: "bg-primary text-primary-foreground" };
      case "partner":
        return { label: "Partner Event", className: "bg-secondary text-secondary-foreground" };
      case "free":
        return { label: "Free Event", className: "bg-green-500 text-white" };
      case "tenant":
        return { label: "Tenant Free Access", className: "bg-purple-500 text-white" };
      case "public":
        return { label: "Free for Public", className: "bg-blue-500 text-white" };
      default:
        return { label: "Event", className: "bg-muted text-muted-foreground" };
    }
  };

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
        <div className="text-center mb-8">
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

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 p-4 bg-muted/50 rounded-xl">
          {filterCategories.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {filter.label}
              </Button>
            );
          })}
        </div>

        {/* Events by Month */}
        {months.map((month) => {
          if (eventsByMonth[month].length === 0) return null;
          return (
            <div key={month} className="mb-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 border-b pb-3">
                <Calendar className="h-6 w-6 text-primary" />
                {month} 2026
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {eventsByMonth[month].map((event) => {
                  const badge = getAccessBadge(event.accessType);
                  return (
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
                        <Badge className={`absolute top-2 right-2 ${badge.className}`}>
                          {badge.label}
                        </Badge>
                        <Badge className="absolute top-2 left-2 bg-background/80 text-foreground">
                          {event.date.split(",")[0].split(" ")[1] || event.date.split(" ")[1]}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-base line-clamp-2 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          Coming Soon
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* No events message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-lg">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No events found for this filter.</p>
            <Button variant="outline" className="mt-4" onClick={() => setActiveFilter("all")}>
              View All Events
            </Button>
          </div>
        )}
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
                <Badge className={`absolute top-3 right-3 ${getAccessBadge(selectedEvent.accessType).className}`}>
                  {getAccessBadge(selectedEvent.accessType).label}
                </Badge>
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
                  <Lock className="h-4 w-4 mr-2" />
                  Coming Soon
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