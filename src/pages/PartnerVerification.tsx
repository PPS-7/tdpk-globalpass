import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import tdpkLogo from "@/assets/tdpk-logo.png";
import { QRScanner } from "@/components/QRScanner";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const PartnerVerification = () => {
  const [loading, setLoading] = useState(true);
  const [partnerName, setPartnerName] = useState("");
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

    const { data: partnerUserData } = await supabase
      .from("partner_users")
      .select("partner_id, partners(display_name)")
      .eq("id", session.user.id)
      .single();

    if (partnerUserData) {
      setPartnerName(partnerUserData.partners.display_name);
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
        <div className="animate-pulse text-muted-foreground">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={tdpkLogo} alt="True Digital Park" className="h-8" />
            <div>
              <p className="text-sm text-muted-foreground">{partnerName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('partner.scanVerify')}</h2>
          <p className="text-muted-foreground">
            Verify member subscriptions and access eligibility
          </p>
        </div>

        <QRScanner />
      </div>
    </div>
  );
};

export default PartnerVerification;
