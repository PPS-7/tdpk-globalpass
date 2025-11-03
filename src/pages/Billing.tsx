import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2, CreditCard, Loader2, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import InvoiceHistory from "@/components/InvoiceHistory";

interface Plan {
  id: string;
  code: string;
  name: string;
  amount: number;
  currency: string;
  interval: string;
  features_json: {
    features: string[];
    description?: string;
  };
}

interface Subscription {
  status: string;
  current_period_end: string;
  plan_id: string;
}

const Billing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    checkAuth();
    loadPlans();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    setMemberId(session.user.id);

    // Check for existing subscription
    const { data: subData } = await supabase
      .from("subscriptions")
      .select("status, current_period_end, plan_id")
      .eq("member_id", session.user.id)
      .maybeSingle();

    if (subData) {
      setSubscription(subData);
    }

    setLoading(false);
  };

  const loadPlans = async () => {
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .in("code", ["MEMBER_THB_1188", "MEMBER_PLUS_THB_2388", "GLOBAL_THB_3588"])
      .order("amount", { ascending: true });

    if (error) {
      console.error("Error loading plans:", error);
      return;
    }

    if (data) {
      setPlans(data.map(plan => ({
        ...plan,
        features_json: typeof plan.features_json === 'string' 
          ? JSON.parse(plan.features_json)
          : plan.features_json
      })) as Plan[]);
    }
  };

  const handleCheckout = async (planId: string) => {
    if (!memberId) return;

    setCheckoutLoading(planId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { planId, memberId, couponCode: couponCode || undefined }
      });

      if (error) throw error;

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast({
        title: "Checkout Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleManageBilling = async () => {
    setCheckoutLoading("portal");
    try {
      const { data, error } = await supabase.functions.invoke("create-portal-session", {
        body: { memberId }
      });

      if (error) throw error;

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast({
        title: "Portal Error",
        description: error.message || "Failed to access billing portal",
        variant: "destructive",
      });
    } finally {
      setCheckoutLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm">
            <Link to="/member">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
            Billing & Subscriptions
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        {subscription && subscription.status === "active" ? (
          <Card className="mb-8 border-secondary/20 bg-secondary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Subscription</CardTitle>
                  <CardDescription>
                    Your subscription is active until{" "}
                    {new Date(subscription.current_period_end).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge className="bg-secondary">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleManageBilling}
                disabled={checkoutLoading === "portal"}
                variant="outline"
              >
                {checkoutLoading === "portal" ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <CreditCard className="h-4 w-4 mr-2" />
                )}
                Manage Billing
              </Button>
            </CardContent>
          </Card>
        ) : null}

        {subscription && subscription.status === "active" && memberId && (
          <InvoiceHistory memberId={memberId} />
        )}

        <div className="text-center mb-8 mt-12">
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Select a yearly subscription that fits your coworking needs
          </p>
          
          <Card className="max-w-md mx-auto mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (couponCode) {
                      toast({
                        title: "Coupon Applied",
                        description: "Your discount will be applied at checkout",
                      });
                    }
                  }}
                  disabled={!couponCode}
                >
                  Apply
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Have a coupon? Enter it here for a discount
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const features = plan.features_json?.features || [];
            const isRecommended = plan.code.includes("PLUS");

            return (
              <Card
                key={plan.id}
                className={`relative ${
                  isRecommended ? "border-secondary shadow-lg" : "border-primary/10"
                }`}
              >
                {isRecommended && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary">
                    Recommended
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    {plan.features_json?.description || "Yearly subscription"}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {formatPrice(plan.amount, plan.currency)}
                    </span>
                    <span className="text-muted-foreground">/{plan.interval}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={isRecommended ? "premium" : "default"}
                    onClick={() => handleCheckout(plan.id)}
                    disabled={
                      checkoutLoading === plan.id ||
                      (subscription?.status === "active" && subscription?.plan_id === plan.id)
                    }
                  >
                    {checkoutLoading === plan.id ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : subscription?.status === "active" && subscription?.plan_id === plan.id ? (
                      "Current Plan"
                    ) : (
                      "Subscribe Now"
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Billing;
