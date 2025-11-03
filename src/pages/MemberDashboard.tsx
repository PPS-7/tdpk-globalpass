import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, MapPin, Gift, Users, LogOut, Lock, QrCode } from "lucide-react";
import tdpkLogo from "@/assets/tdpk-logo.png";
import { GlobalSearch } from "@/components/GlobalSearch";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

interface MemberData {
  id: string;
  name: string;
  status: string;
  tier: string;
}

interface Subscription {
  status: string;
  current_period_end: string;
}

const MemberDashboard = () => {
  const [member, setMember] = useState<MemberData | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: memberData, error: memberError } = await supabase
      .from("members")
      .select("id, first_name, last_name, status, tier")
      .eq("id", session.user.id)
      .single();

    if (memberError) {
      console.error("Error fetching member:", memberError);
      navigate("/auth");
      return;
    }

    if (memberData) {
      setMember({
        id: memberData.id,
        name: `${memberData.first_name} ${memberData.last_name}`,
        status: memberData.status,
        tier: memberData.tier,
      });
    }

    // Check subscription status
    const { data: subData } = await supabase
      .from("subscriptions")
      .select("status, current_period_end")
      .eq("member_id", session.user.id)
      .maybeSingle();

    if (subData) {
      setSubscription(subData);
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!member) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-secondary";
      case "trial":
        return "bg-primary/70";
      case "expired":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center">
            <img src={tdpkLogo} alt="True Digital Park" className="h-8" />
          </div>
          <GlobalSearch />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{member.name}</CardTitle>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                  <Badge variant="outline">{member.tier} Tier</Badge>
                </div>
                {subscription && subscription.status === "active" && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Active until {new Date(subscription.current_period_end).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Subscription Check */}
        {!subscription || subscription.status !== "active" ? (
          <Card className="mb-8 border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Lock className="h-12 w-12 text-destructive" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Subscription Required</h3>
                  <p className="text-muted-foreground mb-4">
                    Subscribe to unlock your QR pass, exclusive perks, and access to partner spaces worldwide.
                  </p>
                  <Button asChild variant="premium">
                    <Link to="/billing">View Plans & Subscribe</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            className={`border-primary/10 transition-all ${
              subscription?.status === "active"
                ? "hover:shadow-xl cursor-pointer hover:border-primary/30"
                : "opacity-60"
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full relative">
                  <QrCode className="h-8 w-8 text-primary" />
                  {subscription?.status !== "active" && (
                    <Lock className="h-4 w-4 absolute -top-1 -right-1 text-destructive" />
                  )}
                </div>
                <h3 className="font-semibold">My Pass</h3>
                <p className="text-sm text-muted-foreground">
                  {subscription?.status === "active"
                    ? "View your digital QR membership"
                    : "Locked - Subscribe to unlock"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`border-primary/10 transition-all ${
              subscription?.status === "active"
                ? "hover:shadow-xl cursor-pointer hover:border-primary/30"
                : "opacity-60"
            }`}
            {...(subscription?.status === "active" && {
              onClick: () => navigate("/partners"),
            })}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-secondary/10 rounded-full relative">
                  <MapPin className="h-8 w-8 text-secondary" />
                  {subscription?.status !== "active" && (
                    <Lock className="h-4 w-4 absolute -top-1 -right-1 text-destructive" />
                  )}
                </div>
                <h3 className="font-semibold">Directory</h3>
                <p className="text-sm text-muted-foreground">
                  {subscription?.status === "active"
                    ? "Find coworking spaces near you"
                    : "Locked - Subscribe to access"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`border-primary/10 transition-all ${
              subscription?.status === "active"
                ? "hover:shadow-xl cursor-pointer hover:border-primary/30"
                : "opacity-60"
            }`}
            {...(subscription?.status === "active" && {
              onClick: () => navigate("/perks"),
            })}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full relative">
                  <Gift className="h-8 w-8 text-primary" />
                  {subscription?.status !== "active" && (
                    <Lock className="h-4 w-4 absolute -top-1 -right-1 text-destructive" />
                  )}
                </div>
                <h3 className="font-semibold">Offers</h3>
                <p className="text-sm text-muted-foreground">
                  {subscription?.status === "active"
                    ? "Exclusive member discounts"
                    : "Locked - Subscribe to unlock"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-primary/10 hover:shadow-xl transition-all cursor-pointer hover:border-primary/30"
            onClick={() => navigate("/billing")}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold">Billing</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your subscription
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trial or Inactive CTA */}
        {(member.status === "trial" || !subscription || subscription.status !== "active") && (
          <Card className="mt-8 bg-gradient-to-r from-secondary/10 to-primary/10 border-primary/20">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {member.status === "trial" ? "Enjoying Your Trial?" : "Unlock Full Access"}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {member.status === "trial"
                  ? "Upgrade to a full membership to unlock unlimited access to all partner spaces"
                  : "Subscribe now to access your digital pass, exclusive perks, and global coworking network"}
              </p>
              <Button asChild variant="premium" size="lg">
                <Link to="/billing">View Plans</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default MemberDashboard;
