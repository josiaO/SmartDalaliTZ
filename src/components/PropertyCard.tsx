import { MapPin, Bed, Bath, Maximize, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Property } from "@/data/properties";
import { useLanguage } from "@/contexts/LanguageContext";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { t } = useLanguage();
  
  const formatPrice = (price: number, type: string) => {
    if (type === "rent") {
      return `TSh ${price.toLocaleString()}/mo`;
    }
    return `TSh ${price.toLocaleString()}`;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      sale: t("property.forSale"),
      rent: t("property.forRent"),
      land: t("property.land"),
    };
    return labels[type] || type;
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {property.featured && (
          <Badge className="absolute top-3 right-3 bg-accent">Featured</Badge>
        )}
        <Badge
          className={`absolute top-3 left-3 ${
            property.type === "sale"
              ? "bg-primary"
              : property.type === "rent"
              ? "bg-info"
              : "bg-warning"
          }`}
        >
          {getTypeLabel(property.type)}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
            {property.title}
          </CardTitle>
          <span className="text-lg font-bold text-primary whitespace-nowrap">
            {formatPrice(property.price, property.type)}
          </span>
        </div>
        <CardDescription className="flex items-center gap-1 text-sm">
          <MapPin className="w-3 h-3" />
          {property.location.address}, {property.location.city}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{property.area} m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="text-sm">
            <p className="font-medium text-foreground">{property.agentName}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {property.agentPhone}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
