import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Check, MapPin, Truck, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

enum DeliveryOption {
  Standard = "standard",
  Express = "express",
}

const Checkout = () => {
  const navigate = useNavigate();
  const { state, getSubtotal, clearCart } = useCart();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>(
    DeliveryOption.Standard
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate order totals
  const subtotal = getSubtotal();
  const deliveryFee = deliveryOption === DeliveryOption.Standard ? 4.99 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !city ||
      !postalCode ||
      !cardNumber ||
      !expiryDate ||
      !cvv ||
      !nameOnCard
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (state.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Simulate order processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success("Order placed successfully!");

      // Create order in local storage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const newOrder = {
        id: Date.now(),
        items: state.items,
        total,
        date: new Date().toISOString(),
        status: "Processing",
        shipping: {
          firstName,
          lastName,
          address,
          city,
          postalCode,
          deliveryOption,
        },
      };
      orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));

      // Redirect to orders page
      navigate("/orders");
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, "");
    // Add a space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, "");
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNav userType="customer" />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brown-900">Checkout</h1>
          <p className="text-brown-500">
            Review your order and complete your purchase
          </p>
        </div>

        {state.items.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleFormSubmit}>
                {/* Shipping Information */}
                <Card className="bg-white border border-brown-200 shadow-md">
                  <CardHeader className="flex flex-row items-center gap-2 border-b border-brown-200 p-4">
                    <MapPin className="h-5 w-5 text-green-700" />
                    <CardTitle className="text-lg text-brown-800">
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-brown-700">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="border-brown-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-brown-700">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="border-brown-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-brown-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-brown-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-brown-700">
                        Street Address
                      </Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="border-brown-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-brown-700">
                          City
                        </Label>
                        <Input
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          className="border-brown-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-brown-700">
                          Postal Code
                        </Label>
                        <Input
                          id="postalCode"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          required
                          className="border-brown-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Options */}
                <Card className="bg-white border border-brown-200 shadow-md">
                  <CardHeader className="flex flex-row items-center gap-2 border-b border-brown-200 p-4">
                    <Truck className="h-5 w-5 text-green-700" />
                    <CardTitle className="text-lg text-brown-800">
                      Delivery Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-brown-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            id="standard"
                            name="deliveryOption"
                            className="h-4 w-4 text-green-700 focus:ring-green-500"
                            checked={deliveryOption === DeliveryOption.Standard}
                            onChange={() =>
                              setDeliveryOption(DeliveryOption.Standard)
                            }
                          />
                          <div>
                            <label
                              htmlFor="standard"
                              className="font-medium text-brown-700 cursor-pointer"
                            >
                              Standard Delivery
                            </label>
                            <p className="text-sm text-brown-500">
                              3-5 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-brown-800">
                          $4.99
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-brown-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            id="express"
                            name="deliveryOption"
                            className="h-4 w-4 text-green-700 focus:ring-green-500"
                            checked={deliveryOption === DeliveryOption.Express}
                            onChange={() =>
                              setDeliveryOption(DeliveryOption.Express)
                            }
                          />
                          <div>
                            <label
                              htmlFor="express"
                              className="font-medium text-brown-700 cursor-pointer"
                            >
                              Express Delivery
                            </label>
                            <p className="text-sm text-brown-500">
                              1-2 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-brown-800">
                          $9.99
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}

                <Card className="bg-white border border-brown-200 shadow-md">
                  <CardHeader className="flex flex-row items-center gap-2 border-b border-brown-200 p-4">
                    <CreditCard className="h-5 w-5 text-green-700" />
                    <CardTitle className="text-lg text-brown-800">
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-brown-700">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        placeholder="•••• •••• •••• ••••"
                        maxLength={19}
                        required
                        className="border-brown-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard" className="text-brown-700">
                        Name on Card
                      </Label>
                      <Input
                        id="nameOnCard"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        required
                        className="border-brown-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className="text-brown-700">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiryDate"
                          value={expiryDate}
                          onChange={(e) =>
                            setExpiryDate(formatExpiryDate(e.target.value))
                          }
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                          className="border-brown-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-brown-700">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          type="text"
                          inputMode="numeric"
                          value={cvv}
                          onChange={(e) =>
                            setCvv(
                              e.target.value.replace(/\D/g, "").slice(0, 3)
                            )
                          }
                          maxLength={3}
                          required
                          className="border-brown-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  className="w-full mt-4 bg-[#8AB83D] hover:bg-[#7DA634] text-white font-semibold py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 disabled:bg-gray-400"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Complete Order"}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="sticky top-6 md:top-8 lg:top-10">
              <div className="bg-white rounded-lg shadow-md p-6 border border-brown-200">
                <h2 className="text-xl font-semibold text-brown-800 mb-4 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-green-700" />
                  Order Summary
                </h2>

                <div className="space-y-4 mb-4 mt-3">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border border-brown-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-sm text-brown-700">
                          {item.name}
                        </p>
                        <div className="flex justify-between">
                          <span className="text-xs text-brown-500">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </span>
                          <span className="text-sm font-semibold text-brown-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-brown-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-brown-600">
                    <span>Subtotal</span>
                    <span className="text-brown-800">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-brown-600">
                    <span>Shipping</span>
                    <span className="text-brown-800">
                      ${deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-brown-600">
                    <span>Tax (8%)</span>
                    <span className="text-brown-800">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-brown-200 pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-brown-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Add some products to your cart and they will appear here
            </p>
            <Button asChild className="bg-[#8AB83D] hover:bg-[#7DA634]">
              <Link to="/customer-dashboard">Browse Products</Link>
            </Button>
          </div>
        )}
      </div>

      <footer className="border-t bg-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Spriggle. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
