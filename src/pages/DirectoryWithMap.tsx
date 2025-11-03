import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MapView } from "@/components/MapView";
import { GlobalSearch } from "@/components/GlobalSearch";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

interface Partner {
  id: string;
  display_name: string;
  address: string;
  lat: number;
  lng: number;
  country_code: string;
  amenities: string[];
}

const DirectoryWithMap = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | undefined>();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    loadPartners();
    const highlighted = searchParams.get('highlight');
    if (highlighted) {
      setSelectedPartnerId(highlighted);
    }
  }, [searchParams]);

  const loadPartners = async () => {
    try {
      const { data, error } = await supabase
        .from("partners")
        .select("id, display_name, address, lat, lng, country_code, amenities")
        .eq("is_active", true)
        .not("lat", "is", null)
        .not("lng", "is", null);

      if (error) throw error;

      setPartners(data || []);
    } catch (error) {
      console.error("Error loading partners:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('nav.home')}
            </Link>
          </Button>
          
          <GlobalSearch />
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button asChild variant="premium" size="sm">
              <Link to="/auth">{t('common.signIn')}</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
            {t('nav.partners')} {t('map.showMap')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover coworking spaces near you with our interactive map
          </p>
        </div>

        <MapView
          partners={partners}
          selectedPartnerId={selectedPartnerId}
          onPartnerSelect={setSelectedPartnerId}
        />
      </section>
    </div>
  );
};

export default DirectoryWithMap;
