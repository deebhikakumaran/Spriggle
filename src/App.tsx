
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserTypeSelection from "./pages/UserTypeSelection";
import SellerSignup from "./pages/SellerSignup";
import CustomerSignup from "./pages/CustomerSignup";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import SellerDashboard from "./pages/SellerDashboard";
import SellerOrders from "./pages/SellerOrders";
import SellerMessages from "./pages/SellerMessages";
import SellerProducts from "./pages/SellerProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/user-type-selection" element={<UserTypeSelection />} />
            <Route path="/seller-signup" element={<SellerSignup />} />
            <Route path="/customer-signup" element={<CustomerSignup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/seller-orders" element={<SellerOrders />} />
            <Route path="/seller-messages" element={<SellerMessages />} />
            <Route path="/seller-products" element={<SellerProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
