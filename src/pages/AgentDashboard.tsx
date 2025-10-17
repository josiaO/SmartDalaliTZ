import { useState } from "react";
import { Plus, TrendingUp, DollarSign, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyCard } from "@/components/PropertyCard";
import { mockProperties } from "@/data/properties";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MpesaPaymentForm } from "@/components/MpesaPaymentForm";
import { StripePaymentForm } from "@/components/StripePaymentForm";

export default function AgentDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("monthly");
  
  const agentProperties = mockProperties.filter((p) => p.agentId === user?.id);
  
  const trialDaysLeft = user?.trialEndsAt
    ? Math.ceil((new Date(user.trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  const monthlyPrice = 50000; // TSh 50,000 per month
  const annualPrice = 500000; // TSh 500,000 per year (2 months free)

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
      value: trialDaysLeft.toString(),
      icon: Calendar,
      color: trialDaysLeft <= 7 ? "text-destructive" : "text-warning",
    },
  ];

  const handleUpgrade = (plan: "monthly" | "annual") => {
    setSelectedPlan(plan);
    setShowPaymentDialog(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentDialog(false);
    // In real app, this would update the subscription status
  };

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
        {user?.subscriptionActive && trialDaysLeft > 0 && (
          <Card className={`mb-6 ${trialDaysLeft <= 7 ? "border-destructive" : "border-primary"}`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">
                    {trialDaysLeft <= 7 ? "⚠️ Trial Ending Soon" : "🎉 Free Trial Active"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your trial expires on{" "}
                    {user?.trialEndsAt
                      ? new Date(user.trialEndsAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <Button onClick={() => handleUpgrade("monthly")}>
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Monthly Plan</CardTitle>
                <Badge>Popular</Badge>
              </div>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="text-3xl font-bold">TSh {monthlyPrice.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
              <ul className="space-y-2 mb-4 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Unlimited property listings
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Priority customer support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Advanced analytics
                </li>
              </ul>
              <Button 
                className="w-full" 
                onClick={() => handleUpgrade("monthly")}
              >
                Subscribe Monthly
              </Button>
            </CardContent>
          </Card>

          <Card className="border-accent">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Annual Plan</CardTitle>
                <Badge variant="secondary">Save 17%</Badge>
              </div>
              <CardDescription>Best value for serious agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="text-3xl font-bold">TSh {annualPrice.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  per year (TSh {Math.round(annualPrice / 12).toLocaleString()}/month)
                </div>
              </div>
              <ul className="space-y-2 mb-4 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Everything in Monthly plan
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  2 months free
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Featured listings priority
                </li>
              </ul>
              <Button 
                className="w-full" 
                variant="default"
                onClick={() => handleUpgrade("annual")}
              >
                Subscribe Annually
              </Button>
            </CardContent>
          </Card>
        </div>

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

        {/* Payment Methods Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Available Payment Methods</CardTitle>
            <CardDescription>Choose your preferred payment option</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  M-PESA
                </div>
                <div className="flex-1">
                  <p className="font-medium">M-Pesa (Tanzania)</p>
                  <p className="text-sm text-muted-foreground">Pay directly from your mobile money account</p>
                </div>
                <Badge variant="outline">✓ Ready</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  Stripe
                </div>
                <div className="flex-1">
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-muted-foreground">International payments via Visa, Mastercard</p>
                </div>
                <Badge variant="outline">✓ Ready</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Subscribe to {selectedPlan === "monthly" ? "Monthly" : "Annual"} Plan
            </DialogTitle>
            <DialogDescription>
              Choose your payment method to complete subscription
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="mpesa" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
              <TabsTrigger value="stripe">Card</TabsTrigger>
            </TabsList>
            <TabsContent value="mpesa" className="mt-4">
              <MpesaPaymentForm
                amount={selectedPlan === "monthly" ? monthlyPrice : annualPrice}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowPaymentDialog(false)}
              />
            </TabsContent>
            <TabsContent value="stripe" className="mt-4">
              <StripePaymentForm
                amount={selectedPlan === "monthly" ? monthlyPrice : annualPrice}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowPaymentDialog(false)}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
