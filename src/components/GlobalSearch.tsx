import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Gift, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

interface SearchResult {
  type: 'partner' | 'offer';
  id: string;
  title: string;
  subtitle: string;
  location?: string;
}

export const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.length >= 2) {
        performSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const searchTerm = `%${query}%`;

      // Search partners
      const { data: partners } = await supabase
        .from("partners")
        .select("id, display_name, address, country_code")
        .or(`display_name.ilike.${searchTerm},address.ilike.${searchTerm}`)
        .eq("is_active", true)
        .limit(5);

      // Search offers
      const { data: offers } = await supabase
        .from("offers")
        .select("id, title, partner_id, partners(display_name)")
        .ilike("title", searchTerm)
        .eq("status", "active")
        .limit(5);

      const searchResults: SearchResult[] = [
        ...(partners || []).map(p => ({
          type: 'partner' as const,
          id: p.id,
          title: p.display_name,
          subtitle: p.address || p.country_code,
          location: p.country_code,
        })),
        ...(offers || []).map(o => ({
          type: 'offer' as const,
          id: o.id,
          title: o.title,
          subtitle: o.partners?.display_name || 'Unknown Partner',
        })),
      ];

      setResults(searchResults);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'partner') {
      navigate(`/partners?highlight=${result.id}`);
    } else {
      navigate(`/perks?highlight=${result.id}`);
    }
    setShowResults(false);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          className="pl-10 pr-10"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {showResults && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg">
          <CardContent className="p-2">
            {results.filter(r => r.type === 'partner').length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-muted-foreground px-2 py-1">
                  {t('search.partners')}
                </p>
                {results
                  .filter(r => r.type === 'partner')
                  .map(result => (
                    <div
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="flex items-start gap-3 p-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
                    >
                      <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{result.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {result.subtitle}
                        </p>
                      </div>
                      {result.location && (
                        <Badge variant="outline" className="text-xs shrink-0">
                          {result.location}
                        </Badge>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {results.filter(r => r.type === 'offer').length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground px-2 py-1">
                  {t('search.offers')}
                </p>
                {results
                  .filter(r => r.type === 'offer')
                  .map(result => (
                    <div
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="flex items-start gap-3 p-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
                    >
                      <Gift className="h-4 w-4 text-secondary mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{result.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {result.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {showResults && results.length === 0 && query.length >= 2 && !loading && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg">
          <CardContent className="p-4 text-center text-sm text-muted-foreground">
            {t('search.noResults')}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
