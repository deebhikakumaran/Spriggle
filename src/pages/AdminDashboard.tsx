import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardNav from "@/components/DashboardNav";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { UserCheck, ShoppingBag } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalSellers: 0,
    totalOrders: 0,
    pendingOrders: 0,
    verifiedSellers: 0,
    unverifiedSellers: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load stats from localStorage
    const loadStats = () => {
      try {
        // const customerData = JSON.parse(localStorage.getItem("customerFormData") || "[]");
        // const sellerData = JSON.parse(localStorage.getItem("sellerFormData") || "[]");
        const customerData = JSON.parse(localStorage.getItem("customerData") || "[]");
        const sellerData = JSON.parse(localStorage.getItem("sellerData") || "[]");
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        
        const verifiedSellers = sellerData.filter(seller => seller.verified).length;
        
        // Generate placeholder monthly data for the charts
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
        const generatedMonthlyData = months.map(month => ({
          name: month,
          customers: Math.floor(Math.random() * 50) + 10,
          sellers: Math.floor(Math.random() * 20) + 5,
          orders: Math.floor(Math.random() * 100) + 20,
        }));
        
        setMonthlyData(generatedMonthlyData);
        
        setStats({
          totalCustomers: 1,
          totalSellers: 1,
          totalOrders: orders.length,
          pendingOrders: orders.filter(order => order.status === 'Processing').length,
          verifiedSellers: verifiedSellers,
          unverifiedSellers: sellerData.length - verifiedSellers,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
        toast.error("Failed to load dashboard stats");
      }
    };

    loadStats();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const sellerVerificationData = [
    { name: 'Verified', value: stats.verifiedSellers },
    { name: 'Unverified', value: stats.unverifiedSellers },
  ];

  const chartConfig = {
    customers: {
      label: "Customers",
      theme: {
        light: "#6366f1", // Indigo color
        dark: "#818cf8",
      },
    },
    sellers: {
      label: "Sellers",
      theme: {
        light: "#2563eb", // Blue color
        dark: "#3b82f6",
      },
    },
    orders: {
      label: "Orders",
      theme: {
        light: "#16a34a", // Green color
        dark: "#22c55e",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNav userType="admin" />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin. Here's an overview of your platform.</p>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-gray-500 mt-1">Registered users</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Sellers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalSellers}</div>
              <p className="text-xs text-gray-500 mt-1">Active vendors</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingOrders}</div>
              <p className="text-xs text-gray-500 mt-1">Require attention</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Growth</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ChartContainer config={chartConfig}>
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="customers" fill="#6366f1" name="customers" />
                    <Bar dataKey="sellers" fill="#2563eb" name="sellers" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Trends</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ChartContainer config={chartConfig}>
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#16a34a" 
                      name="orders"
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Seller Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                {stats.totalSellers > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sellerVerificationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sellerVerificationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-8 text-gray-400">No seller data available</div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.totalCustomers > 0 || stats.totalSellers > 0 ? (
                  <>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCheck className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New seller registration</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New order placed</p>
                        <p className="text-xs text-gray-500">15 minutes ago</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-400">No recent activity</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
      
      <footer className="border-t bg-white py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">© 2025 Spriggle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;