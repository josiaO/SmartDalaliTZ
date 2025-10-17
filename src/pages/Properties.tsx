import { useState, useMemo } from "react";
import { Building2 } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { mockProperties } from "@/data/properties";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

export default function Properties() {
  const [selectedType, setSelectedType] = useState<"all" | "sale" | "rent" | "land">("all");
  const { t } = useLanguage();

  const filteredProperties = useMemo(() => {
    if (selectedType === "all") return mockProperties;
    return mockProperties.filter((property) => property.type === selectedType);
  }, [selectedType]);

  const types: Array<{ value: "all" | "sale" | "rent" | "land"; label: string }> = [
    { value: "all", label: t("filter.all") },
    { value: "sale", label: t("filter.sale") },
    { value: "rent", label: t("filter.rent") },
    { value: "land", label: t("filter.land") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {types.map((type) => (
              <Badge
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedType(type.value)}
              >
                {type.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">
            {selectedType === "all"
              ? t("filter.all")
              : types.find((t) => t.value === selectedType)?.label}
          </h2>
          <span className="text-muted-foreground">({filteredProperties.length})</span>
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No properties found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </section>
    </div>
  );
}
