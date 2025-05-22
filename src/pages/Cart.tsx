import { useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { state, removeItem, updateQuantity, getSubtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "fresh10") {
      setCouponApplied(true);
      setDiscount(10);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  // Calculate totals
  const subtotal = getSubtotal();
  const discountAmount = couponApplied ? (subtotal * discount / 100) : 0;
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNav userType="customer" />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">Review and modify your items before checkout</p>
        </div>
        
        {state.items.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Cart Items ({state.items.length})</h2>
                  
                  <div className="divide-y">
                    {state.items.map(item => (
                      <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-4">
                        <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{item.unit}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center border rounded">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="flex-1 px-3 py-2 border rounded-md"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button 
                      onClick={applyCoupon}
                      variant="outline" 
                      className="border-[#8AB83D] text-[#8AB83D] hover:bg-[#8AB83D]/10"
                    >
                      Apply
                    </Button>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#8AB83D] hover:bg-[#7DA634]"
                    asChild
                  >
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  
                  <div className="text-center">
                    <Link 
                      to="/customer-dashboard" 
                      className="text-sm text-[#8AB83D] hover:underline"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to your cart and they will appear here</p>
            <Button 
              asChild
              className="bg-[#8AB83D] hover:bg-[#7DA634]"
            >
              <Link to="/customer-dashboard">Browse Products</Link>
            </Button>
          </div>
        )}
      </div>
      
      <footer className="border-t bg-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">© 2025 Spriggle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
