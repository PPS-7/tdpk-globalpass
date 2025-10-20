import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { QrCode, MapPin, Gift, CreditCard, User, LogOut, Sparkles } from "lucide-react";

interface MemberData {
  id: string;
  first_name: string;
  last_name: string;
  status: string;
  tier: string;
}

const MemberDashboard = () => {
  const [member, setMember] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    // Fetch member data
    const { data: memberData, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setMember(memberData);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "trial":
        return "bg-blue-500";
      case "expired":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-secondary" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              TDPK
            </h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {member?.first_name}!
          </h2>
          <p className="text-muted-foreground">
            Your membership status and quick actions
          </p>
        </div>

        {/* Status Card */}
        <Card className="mb-8 bg-gradient-to-br from-card to-card/50 shadow-xl border-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Member Status</CardTitle>
                <CardDescription className="mt-2">
                  {member?.first_name} {member?.last_name}
                </CardDescription>
              </div>
              <div className="text-right space-y-2">
                <Badge className={`${getStatusColor(member?.status || "")} text-white`}>
                  {member?.status?.toUpperCase()}
                </Badge>
                <div className="text-sm font-medium text-muted-foreground">
                  Tier: <span className="text-secondary font-bold">{member?.tier}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {member?.status === "trial" 
                ? "You're on a trial membership. Subscribe to unlock all benefits!"
                : "Your membership is active. Enjoy exclusive perks across our partner network."}
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/10">
            <CardHeader>
              <QrCode className="h-8 w-8 text-secondary mb-2" />
              <CardTitle className="text-lg">My Pass</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View your digital membership pass and QR code
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/10">
            <CardHeader>
              <MapPin className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore partner locations and amenities
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/10">
            <CardHeader>
              <Gift className="h-8 w-8 text-secondary mb-2" />
              <CardTitle className="text-lg">Offers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browse exclusive perks and discounts
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/10">
            <CardHeader>
              <CreditCard className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage subscription and payment methods
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA for trial users */}
        {member?.status === "trial" && (
          <Card className="mt-8 bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
            <CardHeader>
              <CardTitle>Upgrade Your Membership</CardTitle>
              <CardDescription>
                Get full access to all partner locations and exclusive perks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="hero" size="lg">
                View Plans
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;
