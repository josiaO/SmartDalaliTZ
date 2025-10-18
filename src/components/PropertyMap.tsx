import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Property } from "@/data/properties";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface PropertyMapProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export function PropertyMap({ 
  properties, 
  center = [-6.7924, 39.2083], // Dar es Salaam coordinates
  zoom = 12,
  height = "600px"
}: PropertyMapProps) {
  const navigate = useNavigate();

  // Custom icon for properties
  const propertyIcon = new L.Icon({
    iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%23ea580c' stroke='white' stroke-width='2'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const validProperties = properties.filter(
    p => p.location.coordinates?.lat && p.location.coordinates?.lng
  );

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height, width: "100%", borderRadius: "0.5rem" }}
      className="z-0"
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MarkerClusterGroup chunkedLoading>
        {validProperties.map((property) => (
          <Marker
            key={property.id}
            position={[property.location.coordinates!.lat, property.location.coordinates!.lng]}
            icon={propertyIcon}
          >
            <Popup>
              <Card className="border-0 shadow-none p-2 min-w-[250px]">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-sm mb-1">{property.title}</h3>
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {property.location.city}
                </p>
                <p className="text-primary font-bold text-lg mb-2">
                  TZS {property.price.toLocaleString()}
                  {property.type === "rent" && <span className="text-xs font-normal">/month</span>}
                </p>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => navigate(`/properties?id=${property.id}`)}
                >
                  View Details
                </Button>
              </Card>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
