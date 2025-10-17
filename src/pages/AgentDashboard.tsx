import { Plus, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyCard } from "@/components/PropertyCard";
import { mockProperties } from "@/data/properties";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

export default function AgentDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const agentProperties = mockProperties.filter((p) => p.agentId === user?.id);
  
  const stats = [
    {
      title: "Total Listings",
      value: agentProperties.length.toString(),
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Active Listings",
      value: agentProperties.filter((p) => p.status === "published").length.toString(),
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "Trial Days Left",
      value: user?.trialEndsAt
        ? Math.ceil(
            (new Date(user.trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          ).toString()
        : "0",
      icon: Calendar,
      color: "text-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("agent.dashboard")}
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            {t("agent.addProperty")}
          </Button>
        </div>

        {/* Subscription Status */}
        {user?.subscriptionActive && (
          <Card className="mb-6 border-primary">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Free Trial Active</h3>
                  <p className="text-sm text-muted-foreground">
                    Your trial expires on{" "}
                    {user?.trialEndsAt
                      ? new Date(user.trialEndsAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <Button variant="outline">Upgrade Now</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Properties */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("agent.myListings")}</CardTitle>
                <CardDescription>Manage your property listings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {agentProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start adding properties to reach potential buyers
                </p>
                <Button>Add Your First Property</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Placeholder */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your subscription and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  M-PESA
                </div>
                <div className="flex-1">
                  <p className="font-medium">M-Pesa (Tanzania)</p>
                  <p className="text-sm text-muted-foreground">Mobile money payment</p>
                </div>
                <Badge variant="outline">Ready</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  Stripe
                </div>
                <div className="flex-1">
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-muted-foreground">International payments</p>
                </div>
                <Badge variant="outline">Ready</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
