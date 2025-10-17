import { Users, Building2, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockProperties } from "@/data/properties";

export default function AdminDashboard() {
  const { t } = useLanguage();

  const stats = [
    {
      title: t("admin.users"),
      value: "156",
      change: "+12%",
      icon: Users,
      color: "text-primary",
    },
    {
      title: t("admin.properties"),
      value: mockProperties.length.toString(),
      change: "+8%",
      icon: Building2,
      color: "text-success",
    },
    {
      title: "Revenue",
      value: "TSh 45.2M",
      change: "+23%",
      icon: DollarSign,
      color: "text-accent",
    },
    {
      title: "Active Agents",
      value: "42",
      change: "+5%",
      icon: TrendingUp,
      color: "text-info",
    },
  ];

  const recentUsers = [
    { name: "John Agent", email: "agent@smartdalali.com", role: "Agent", status: "Active" },
    { name: "Jane Doe", email: "user@smartdalali.com", role: "User", status: "Active" },
    { name: "Bob Smith", email: "bob@example.com", role: "Agent", status: "Trial" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("admin.dashboard")}
          </h1>
          <p className="text-muted-foreground">
            Platform overview and management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <p className="text-xs text-success mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{user.role}</p>
                      <p className="text-xs text-muted-foreground">{user.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Properties */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Listings</CardTitle>
              <CardDescription>Latest property submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProperties.slice(0, 3).map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{property.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {property.location.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        TSh {property.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {property.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
            <CardDescription>Configure system-wide settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Company Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Manage company information and branding
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Property Types</h4>
                <p className="text-sm text-muted-foreground">
                  Configure available property categories
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Payment Gateway</h4>
                <p className="text-sm text-muted-foreground">
                  M-Pesa and Stripe integration settings
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
