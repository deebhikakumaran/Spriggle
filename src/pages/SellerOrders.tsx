// import { useEffect, useState } from "react";
// import { 
//   getOrders, 
//   saveOrders,
//   Order,
//   updateOrderStatus
// } from "@/services/sellerStorage";
// import SellerNav from "@/components/SellerNav";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { Search } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

// const SellerOrders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");

//   useEffect(() => {
//     const loadedOrders = getOrders();
//     setOrders(loadedOrders);
//     setFilteredOrders(loadedOrders);
//   }, []);

//   const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
//     updateOrderStatus(orderId, newStatus);
    
//     // Update state
//     setOrders(prevOrders => {
//       const updatedOrders = prevOrders.map(order => {
//         if (order.id === orderId) {
//           return { ...order, status: newStatus };
//         }
//         return order;
//       });
//       setFilteredOrders(applyFilters(updatedOrders, searchQuery, statusFilter));
//       return updatedOrders;
//     });
    
//     toast.success(`Order #${orderId} status updated to ${newStatus}`);
//   };

//   const applyFilters = (orderList: Order[], query: string, status: string) => {
//     return orderList.filter(order => {
//       const matchesQuery = 
//         order.id.toLowerCase().includes(query.toLowerCase()) ||
//         order.customerName.toLowerCase().includes(query.toLowerCase()) ||
//         order.customerEmail.toLowerCase().includes(query.toLowerCase());
      
//       const matchesStatus = status === "all" || order.status === status;
      
//       return matchesQuery && matchesStatus;
//     });
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setFilteredOrders(applyFilters(orders, searchQuery, statusFilter));
//   };

//   const handleStatusFilterChange = (value: string) => {
//     setStatusFilter(value);
//     setFilteredOrders(applyFilters(orders, searchQuery, value));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <SellerNav />
      
//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-semibold text-gray-900 mb-6">Manage Orders</h1>
        
//         <Card className="mb-8 p-6">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
//               <div className="relative w-full md:w-64">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search orders..."
//                   className="pl-8"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <Button type="submit">Search</Button>
//             </form>
            
//             <div className="flex items-center gap-2">
//               <span className="text-sm whitespace-nowrap">Filter by:</span>
//               <Select
//                 value={statusFilter}
//                 onValueChange={handleStatusFilterChange}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="processing">Processing</SelectItem>
//                   <SelectItem value="shipped">Shipped</SelectItem>
//                   <SelectItem value="delivered">Delivered</SelectItem>
//                   <SelectItem value="cancelled">Cancelled</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </Card>
        
//         <div className="rounded-md border overflow-hidden">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Order ID</TableHead>
//                 <TableHead>Customer</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Products</TableHead>
//                 <TableHead>Total</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredOrders.length > 0 ? (
//                 filteredOrders.map((order) => (
//                   <TableRow key={order.id}>
//                     <TableCell className="font-medium">{order.id}</TableCell>
//                     <TableCell>
//                       <div>{order.customerName}</div>
//                       <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
//                     </TableCell>
//                     <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
//                     <TableCell>
//                       <div className="text-sm">
//                         {order.products.map((product, index) => (
//                           <div key={index}>
//                             {product.quantity}x {product.name}
//                           </div>
//                         ))}
//                       </div>
//                     </TableCell>
//                     <TableCell>${order.total.toFixed(2)}</TableCell>
//                     <TableCell>
//                       <span className={`px-2 py-1 rounded-full text-xs ${
//                         order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
//                         order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
//                         order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
//                         order.status === 'delivered' ? 'bg-green-100 text-green-800' :
//                         'bg-red-100 text-red-800'
//                       }`}>
//                         {order.status}
//                       </span>
//                     </TableCell>
//                     <TableCell>
//                       <Select
//                         value={order.status}
//                         onValueChange={(value) => handleStatusChange(
//                           order.id, 
//                           value as Order["status"]
//                         )}
//                       >
//                         <SelectTrigger className="w-[130px]">
//                           <SelectValue placeholder="Change status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="pending">Pending</SelectItem>
//                           <SelectItem value="processing">Processing</SelectItem>
//                           <SelectItem value="shipped">Shipped</SelectItem>
//                           <SelectItem value="delivered">Delivered</SelectItem>
//                           <SelectItem value="cancelled">Cancelled</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} className="text-center py-6">
//                     No orders found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SellerOrders;

import { useEffect, useState } from "react";
import {
  Order,
  updateOrderStatus
} from "@/services/sellerStorage";
import SellerNav from "@/components/SellerNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SellerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      const storedOrders = localStorage.getItem('orders'); // Corrected key
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
        setFilteredOrders(parsedOrders);
      } else {
        setOrders([]);
        setFilteredOrders([]);
        console.log("No orders found in localStorage under 'orders'.");
      }
    } catch (error) {
      console.error("Error loading orders from localStorage:", error);
      setOrders([]);
      setFilteredOrders([]);
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    // Update the status in the local 'orders' data
    console.log('Handle status change begins')
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(applyFilters(updatedOrders, searchQuery, statusFilter));

    // Save the updated 'orders' back to localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    toast.success(`Order #${orderId} status updated to ${newStatus}`);
  };

  // const applyFilters = (orderList: Order[], query: string, status: string) => {
  //   return orderList.filter(order => {
  //     <mark>const searchText = `${order.id} ${order.shipping?.firstName} ${order.shipping?.lastName} ${order.customerEmail}`.toLowerCase();
  //     const matchesQuery = searchText.includes(query.toLowerCase());</mark>
  //     const matchesStatus = status === "all" || order.status === status;
  //     return matchesQuery && matchesStatus;
  //   });
  // };

  const applyFilters = (orderList: Order[], query: string, status: string) => {
    return orderList.filter(order => {
      const matchesQuery =
        order.shipping?.firstName.toLowerCase().includes(query.toLowerCase()) ||
        order.shipping?.lastName.toLowerCase().includes(query.toLowerCase());

      const matchesStatus = status === "all" || order.status === status;

      return matchesQuery && matchesStatus;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching begins')
    setFilteredOrders(applyFilters(orders, searchQuery, statusFilter));
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setFilteredOrders(applyFilters(orders, searchQuery, value));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNav />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Manage Orders</h1>

        <Card className="mb-8 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">Filter by:</span>
              <Select
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>{order.shipping?.firstName} {order.shipping?.lastName}</div>
                      <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {order.items.map((item, index) => (
                          <div key={index}>
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(
                          order.id,
                          value as Order["status"]
                        )}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Change status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default SellerOrders;