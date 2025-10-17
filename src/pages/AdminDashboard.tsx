import { Users, Building2, DollarSign, TrendingUp, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
    { id: "1", name: "John Agent", email: "agent@smartdalali.com", role: "Agent", status: "Active" },
    { id: "2", name: "Jane Doe", email: "user@smartdalali.com", role: "User", status: "Active" },
    { id: "3", name: "Bob Smith", email: "bob@example.com", role: "Agent", status: "Trial" },
  ];

  const recentPayments = [
    { id: "1", agent: "John Agent", amount: 50000, plan: "Monthly", status: "success", date: "2025-10-15" },
    { id: "2", agent: "Bob Smith", amount: 500000, plan: "Annual", status: "success", date: "2025-10-14" },
    { id: "3", agent: "Sarah Wilson", amount: 50000, plan: "Monthly", status: "pending", date: "2025-10-16" },
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

        {/* Management Tabs */}
        <Tabs defaultValue="users" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Management</CardTitle>
                <CardDescription>Review and manage all property listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProperties.slice(0, 5).map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-20 h-20 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">{property.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {property.location.city} • {property.type}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          TSh {property.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant={property.status === "published" ? "default" : "secondary"}>
                          {property.status}
                        </Badge>
                        <Button variant="outline" size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Track all subscription payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.agent}</TableCell>
                        <TableCell>{payment.plan}</TableCell>
                        <TableCell>TSh {payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {payment.status === "success" ? (
                            <Badge className="gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Success
                            </Badge>
                          ) : payment.status === "pending" ? (
                            <Badge variant="secondary" className="gap-1">
                              <Clock className="w-3 h-3" />
                              Pending
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="gap-1">
                              <XCircle className="w-3 h-3" />
                              Failed
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
            <CardDescription>Configure system-wide settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col items-start">
                <h4 className="font-medium mb-2">Company Settings</h4>
                <p className="text-sm text-muted-foreground text-left">
                  Manage company information and branding
                </p>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col items-start">
                <h4 className="font-medium mb-2">Property Types</h4>
                <p className="text-sm text-muted-foreground text-left">
                  Configure available property categories
                </p>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col items-start">
                <h4 className="font-medium mb-2">Payment Gateway</h4>
                <p className="text-sm text-muted-foreground text-left">
                  M-Pesa and Stripe integration settings
                </p>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
