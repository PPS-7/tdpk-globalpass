import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, List, Map as MapIcon } from "lucide-react";
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

interface MapViewProps {
  partners: Partner[];
  selectedPartnerId?: string;
  onPartnerSelect?: (partnerId: string) => void;
}

export const MapView = ({ partners, selectedPartnerId, onPartnerSelect }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const { t } = useTranslation();

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || viewMode !== 'map') return;

    // Note: You'll need to add MAPBOX_PUBLIC_TOKEN as a secret
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN';

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [100.5, 13.75], // Bangkok center
        zoom: 10,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
    };
  }, [viewMode]);

  // Add markers for partners
  useEffect(() => {
    if (!map.current || viewMode !== 'map') return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    partners.forEach(partner => {
      if (partner.lat && partner.lng) {
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxNSIgZmlsbD0iI2ZmNTczMyIvPjxwYXRoIGQ9Ik0xNSA4QzEyLjIzIDggMTAgMTAuMjMgMTAgMTNDMTAgMTYuMjUgMTUgMjIgMTUgMjJDMTUgMjIgMjAgMTYuMjUgMjAgMTNDMjAgMTAuMjMgMTcuNzcgOCAxNSA4Wk0xNSAxNUMxMy45IDE1IDEzIDE0LjEgMTMgMTNDMTMgMTEuOSAxMy45IDExIDE1IDExQzE2LjEgMTEgMTcgMTEuOSAxNyAxM0MxNyAxNC4xIDE2LjEgMTUgMTUgMTVaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==)';
        el.style.backgroundSize = 'cover';
        el.style.cursor = 'pointer';

        const marker = new mapboxgl.Marker(el)
          .setLngLat([partner.lng, partner.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div class="p-2">
                <h3 class="font-semibold">${partner.display_name}</h3>
                <p class="text-sm text-gray-600">${partner.address}</p>
              </div>`
            )
          )
          .addTo(map.current!);

        el.addEventListener('click', () => {
          onPartnerSelect?.(partner.id);
        });

        markers.current.push(marker);
      }
    });

    // Fit bounds to show all markers
    if (partners.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      partners.forEach(partner => {
        if (partner.lat && partner.lng) {
          bounds.extend([partner.lng, partner.lat]);
        }
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [partners, viewMode, onPartnerSelect]);

  const findNearMe = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(coords);
          
          if (map.current) {
            map.current.flyTo({ center: coords, zoom: 12 });
            
            // Add user location marker
            new mapboxgl.Marker({ color: '#3b82f6' })
              .setLngLat(coords)
              .setPopup(new mapboxgl.Popup().setHTML('<p>You are here</p>'))
              .addTo(map.current);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  const filteredPartners = partners.filter(p =>
    p.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.country_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Input
          placeholder={t('common.search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
          >
            <MapIcon className="h-4 w-4 mr-2" />
            {t('map.showMap')}
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4 mr-2" />
            {t('map.showList')}
          </Button>
          <Button variant="outline" size="sm" onClick={findNearMe}>
            <Navigation className="h-4 w-4 mr-2" />
            {t('map.nearMe')}
          </Button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div ref={mapContainer} className="w-full h-[600px] rounded-lg shadow-lg" />
      ) : (
        <div className="grid gap-4">
          {filteredPartners.map(partner => (
            <Card
              key={partner.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedPartnerId === partner.id
                  ? 'border-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() => onPartnerSelect?.(partner.id)}
            >
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{partner.display_name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{partner.address}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{partner.country_code}</Badge>
                    {partner.amenities.slice(0, 3).map((amenity, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
