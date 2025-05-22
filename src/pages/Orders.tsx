// import { useState } from "react";
// import DashboardNav from "@/components/DashboardNav";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Package, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

// // Mock order data
// const mockOrders = [
//   {
//     id: "ORD-2023-0001",
//     date: "2025-05-20",
//     status: "Delivered",
//     total: 58.45,
//     items: [
//       { id: 1, name: "Fresh Organic Tomatoes", price: 2.99, quantity: 2, total: 5.98 },
//       { id: 2, name: "Organic Spinach", price: 1.99, quantity: 1, total: 1.99 },
//       { id: 3, name: "Red Apples", price: 3.49, quantity: 3, total: 10.47 },
//       { id: 4, name: "Organic Potatoes", price: 4.99, quantity: 2, total: 9.98 },
//       { id: 5, name: "Fresh Milk", price: 3.99, quantity: 2, total: 7.98 },
//       { id: 6, name: "Brown Eggs", price: 4.49, quantity: 1, total: 4.49 },
//       { id: 7, name: "Artisanal Bread", price: 5.99, quantity: 1, total: 5.99 },
//       { id: 8, name: "Organic Honey", price: 6.59, quantity: 1, total: 6.59 },
//     ],
//     shippingAddress: "123 Main St, Anytown, CA 12345",
//     paymentMethod: "Credit Card (ending in 1234)",
//   },
//   {
//     id: "ORD-2023-0002",
//     date: "2025-05-15",
//     status: "Processing",
//     total: 32.97,
//     items: [
//       { id: 9, name: "Green Bell Peppers", price: 1.99, quantity: 3, total: 5.97 },
//       { id: 10, name: "Avocados", price: 2.50, quantity: 4, total: 10.00 },
//       { id: 11, name: "Organic Blueberries", price: 4.99, quantity: 2, total: 9.98 },
//       { id: 12, name: "Cucumber", price: 1.29, quantity: 2, total: 2.58 },
//       { id: 13, name: "Fresh Basil", price: 2.29, quantity: 1, total: 2.29 },
//       { id: 14, name: "Lemons", price: 0.75, quantity: 3, total: 2.25 },
//     ],
//     shippingAddress: "123 Main St, Anytown, CA 12345",
//     paymentMethod: "PayPal",
//   },
//   {
//     id: "ORD-2023-0003",
//     date: "2025-05-08",
//     status: "Delivered",
//     total: 45.23,
//     items: [
//       { id: 15, name: "Organic Chicken", price: 12.99, quantity: 1, total: 12.99 },
//       { id: 16, name: "Wild Caught Salmon", price: 15.99, quantity: 1, total: 15.99 },
//       { id: 17, name: "Fresh Rosemary", price: 1.99, quantity: 1, total: 1.99 },
//       { id: 18, name: "Olive Oil", price: 8.99, quantity: 1, total: 8.99 },
//       { id: 19, name: "Garlic", price: 1.29, quantity: 2, total: 2.58 },
//       { id: 20, name: "Black Pepper", price: 2.69, quantity: 1, total: 2.69 },
//     ],
//     shippingAddress: "123 Main St, Anytown, CA 12345",
//     paymentMethod: "Credit Card (ending in 5678)",
//   },
// ];

// const Orders = () => {
//   const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

//   const toggleOrderDetails = (orderId: string) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const getStatusBadgeClasses = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return 'bg-green-100 text-green-800 border border-green-300';
//       case 'processing':
//         return 'bg-amber-100 text-amber-800 border border-amber-300'; // Using amber for a warmer tone
//       case 'shipped':
//         return 'bg-teal-100 text-teal-800 border border-teal-300';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800 border border-red-300';
//       default:
//         return 'bg-gray-100 text-gray-800 border border-gray-300';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
      
//     </div>
//   );
// };

// export default Orders;


import { useState, useEffect } from "react";
import DashboardNav from "@/components/DashboardNav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

const Orders = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        const parsedOrders: Order[] = JSON.parse(storedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error("Error parsing orders from local storage:", error);
        // Optionally set orders to an empty array to avoid errors
        setOrders([]);
      }
    } else {
      setOrders([]); // Initialize with an empty array if no orders in local storage
    }
  }, []);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border border-green-300';
      case 'processing':
        return 'bg-amber-100 text-amber-800 border border-amber-300';
      case 'shipped':
        return 'bg-teal-100 text-teal-800 border border-teal-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DashboardNav userType="customer" />

      <div className="container mx-auto px-6 py-10 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brown-900">My Orders</h1>
          <p className="text-brown-500">Track and manage your delightful purchases</p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => (
              <Card key={order.id} className="overflow-hidden border border-brown-200 shadow-md">
                <CardHeader className="pb-3 border-b border-brown-200 bg-white/50 backdrop-blur-sm">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Package className="h-5 w-5 text-green-700" />
                      <div>
                        <CardTitle className="text-lg text-brown-800">Order #{order.id}</CardTitle>
                        <p className="text-sm text-brown-500">Placed on {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(order.status)}`}
                      >
                        {order.status}
                      </span>
                      <span className="font-semibold text-brown-900">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardHeader>

                <div className="p-4 bg-white/80 backdrop-blur-sm flex justify-between items-center">
                  <div className="text-sm text-brown-600">
                    <span>Items:</span> {order.items.length}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-700 hover:bg-green-100"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    {expandedOrder === order.id ? (
                      <>
                        Hide Details <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        View Details <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {expandedOrder === order.id && (
                  <CardContent className="pt-4 bg-white/90 backdrop-blur-sm">
                    <div className="mb-6">
                      <h3 className="font-semibold text-brown-800 mb-2">Order Items</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                          <thead className="bg-brown-100 text-brown-700 border-b border-brown-200">
                            <tr>
                              <th className="py-2 font-medium">Item</th>
                              <th className="py-2 font-medium text-right">Price</th>
                              <th className="py-2 font-medium text-right">Qty</th>
                              <th className="py-2 font-medium text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-brown-200">
                            {order.items.map(item => (
                              <tr key={item.id} className="bg-white">
                                <td className="py-2 text-brown-700">{item.name}</td>
                                <td className="py-2 text-right text-brown-700">${item.price.toFixed(2)}</td>
                                <td className="py-2 text-right text-brown-700">{item.quantity}</td>
                                <td className="py-2 text-right font-semibold text-brown-800">${item.total.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-brown-50 border-t border-brown-200">
                            <tr>
                              <td colSpan={3} className="py-2 font-semibold text-right text-brown-800">Order Total:</td>
                              <td className="py-2 font-bold text-right text-brown-900">${order.total.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-brown-800 mb-2">Shipping Information</h3>
                        <p className="text-brown-700">{order.shippingAddress}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-brown-800 mb-2">Payment Method</h3>
                        <p className="text-brown-700">{order.paymentMethod}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                      <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-100">
                        <ExternalLink className="mr-2 h-4 w-4" /> Track Order
                      </Button>
                      <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-100">
                        Download Invoice
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center border border-brown-200">
            <Package className="h-12 w-12 text-green-700 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-brown-800 mb-2">No orders yet</h2>
            <p className="text-brown-600 mb-8">You haven't placed any orders yet. Explore our fresh selections!</p>
            <Button
              className="bg-green-700 hover:bg-green-600 text-white"
              asChild
            >
              <a href="/customer-dashboard">Start Shopping</a>
            </Button>
          </div>
        )}
      </div>

      <footer className="border-t border-brown-200 bg-white py-6 mt-8">
        <div className="container mx-auto px-6">
          <p className="text-center text-brown-500 text-sm">© 2025 Spriggle. Crafted with care.</p>
        </div>
      </footer>
    </div>
  );
};

export default Orders;