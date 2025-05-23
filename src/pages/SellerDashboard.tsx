import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  MessageSquare, 
  ShoppingBag,
  TrendingUp,
  Users
} from "lucide-react";
import SellerNav from "@/components/SellerNav";
import { 
  getProducts, 
  getOrders, 
  getMessages, 
  initializeSampleData,
  Product,
  Order,
  Message
} from "@/services/sellerStorage";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    // Initialize sample data if needed
    initializeSampleData();
    
    // Load data from localStorage
    setProducts(getProducts());
    setMessages(getMessages());
  }, []);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      const storedOrders = localStorage.getItem('orders'); // Corrected key
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
      } else {
        setOrders([]);
        console.log("No orders found in localStorage under 'orders'.");
      }
    } catch (error) {
      console.error("Error loading orders from localStorage:", error);
      setOrders([]);
    }
  };
  
  // Calculate stats
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;
  const pendingOrders = orders.filter(order => order.status === 'Processing').length;
  const unreadMessages = messages.filter(message => !message.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#8AB83D]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+4.3% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <ShoppingBag className="h-4 w-4 text-[#8AB83D]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                <Link to="/seller-products" className="text-[#8AB83D]">Manage products</Link>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Package className="h-4 w-4 text-[#8AB83D]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders}</div>
              <p className="text-xs text-muted-foreground">
                <Link to="/seller-orders" className="text-[#8AB83D]">View all orders</Link>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-[#8AB83D]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadMessages} unread</div>
              <p className="text-xs text-muted-foreground">
                <Link to="/seller-messages" className="text-[#8AB83D]">Check messages</Link>
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You have {orders.length} total orders</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Order ID</th>
                      <th className="text-left py-3 px-2">Customer</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-right py-3 px-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-2">{order.id}</td>
                        <td className="py-3 px-2">{order.shipping?.firstName}</td>
                        <td className="py-3 px-2">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">${order.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-4">No orders yet</p>
            )}
            
            {orders.length > 5 && (
              <div className="mt-4 text-center">
                <Link 
                  to="/seller-orders" 
                  className="text-sm text-[#8AB83D] font-medium hover:underline"
                >
                  View all orders
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Messages */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>You have {unreadMessages} unread messages</CardDescription>
          </CardHeader>
          <CardContent>
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.slice(0, 3).map((message) => (
                  <div key={message.id} className="flex items-start gap-4 p-3 border rounded-md">
                    <div className="bg-[#8AB83D]/20 h-10 w-10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-[#8AB83D]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">
                          {message.from}
                          {!message.read && (
                            <span className="ml-2 inline-block w-2 h-2 bg-[#8AB83D] rounded-full"></span>
                          )}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{message.subject}</p>
                      <p className="text-sm mt-1 line-clamp-1">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4">No messages yet</p>
            )}
            
            {messages.length > 3 && (
              <div className="mt-4 text-center">
                <Link 
                  to="/seller-messages" 
                  className="text-sm text-[#8AB83D] font-medium hover:underline"
                >
                  View all messages
                </Link>
              </div>
            )}
          </CardContent>
        </Card> */}
      </main>
    </div>
  );
};

export default SellerDashboard;