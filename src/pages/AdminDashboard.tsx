import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardNav from "@/components/DashboardNav";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalSellers: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    // Load stats from localStorage
    const loadStats = () => {
      try {
        const customerData = JSON.parse(localStorage.getItem("customerData") || "[]");
        const sellerData = JSON.parse(localStorage.getItem("sellerData") || "[]");
        // Placeholder for orders
        const orders = [];
        
        setStats({
          totalCustomers: customerData.length,
          totalSellers: sellerData.length,
          totalOrders: 0, // No orders yet
          pendingOrders: 0, // No orders yet
        });
      } catch (error) {
        console.error("Error loading stats:", error);
        toast.error("Failed to load dashboard stats");
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNav userType="admin" />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin. Here's an overview of your platform.</p>
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
        
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Customers</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.totalCustomers > 0 ? (
                <div className="text-gray-600">Customer list would appear here</div>
              ) : (
                <div className="text-gray-400 text-center py-8">No customers registered yet</div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Sellers</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.totalSellers > 0 ? (
                <div className="text-gray-600">Seller list would appear here</div>
              ) : (
                <div className="text-gray-400 text-center py-8">No sellers registered yet</div>
              )}
            </CardContent>
          </Card>
        </div>
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
