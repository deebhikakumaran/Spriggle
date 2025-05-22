import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

// Mock products for display - Initial set
const initialProducts = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 2.99,
    unit: "500g",
    category: "Vegetables",
  },
  {
    id: 2,
    name: "Organic Spinach",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 1.99,
    unit: "250g",
    category: "Vegetables",
  },
  {
    id: 3,
    name: "Red Apples",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 3.49,
    unit: "1 kg",
    category: "Fruits",
  },
  {
    id: 4,
    name: "Organic Carrots",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 2.49,
    unit: "500g",
    category: "Vegetables",
  },
];

// More mock products
const moreProducts = [
  {
    id: 5,
    name: "Fresh Blueberries",
    image: "https://images.unsplash.com/photo-1593104943730-2b06d49557b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 4.99,
    unit: "200g",
    category: "Fruits",
  },
  {
    id: 6,
    name: "Whole Wheat Bread",
    image: "https://images.unsplash.com/photo-1591534831369-e3a8a9589c5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 3.99,
    unit: "1 loaf",
    category: "Bakery",
  },
  {
    id: 7,
    name: "Free-Range Eggs",
    image: "https://images.unsplash.com/photo-1618897970421-1f191b252c48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 5.50,
    unit: "1 dozen",
    category: "Dairy & Eggs",
  },
  {
    id: 8,
    name: "Avocado",
    image: "https://images.unsplash.com/photo-1559278832-118929711f03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: 1.79,
    unit: "each",
    category: "Fruits",
  },
];

const CustomerDashboard = () => {
  const [customerName, setCustomerName] = useState("Customer");
  const [featuredProducts, setFeaturedProducts] = useState(initialProducts);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const { addToCart, getTotalItems } = useCart();

  useEffect(() => {
    // Load customer data
    try {
      const customers = JSON.parse(localStorage.getItem("customerData") || "[]");
      // In a real app, you would get the logged in user from context or similar
      if (customers.length > 0) {
        setCustomerName(customers[0].fullName || "Customer");
      }
    } catch (error) {
      console.error("Error loading customer data:", error);
    }
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      unit: product.unit,
    });
  };

  const handleViewAll = () => {
    setFeaturedProducts([...featuredProducts, ...moreProducts]);
    setShowAllProducts(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNav userType="customer" />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {customerName}</h1>
          <p className="text-gray-600">Browse fresh produce and manage your orders</p>
        </div>

        {/* <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-[#8AB83D] mb-2" />
              <CardTitle>My Orders</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Track and manage your orders</p>
              <Button asChild className="bg-[#8AB83D] hover:bg-[#7DA634] w-full">
                <Link to="/orders">View Orders</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex items-center justify-center">
              <Heart className="h-10 w-10 text-[#8AB83D] mb-2" />
              <CardTitle>Wish List</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Products you've saved for later</p>
              <Button variant="outline" className="w-full border-[#8AB83D] text-[#8AB83D] hover:bg-[#8AB83D]/10">
                View Wish List
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex items-center justify-center">
              <Clock className="h-10 w-10 text-[#8AB83D] mb-2" />
              <CardTitle>Recent Items</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Products you've recently viewed</p>
              <Button variant="outline" className="w-full border-[#8AB83D] text-[#8AB83D] hover:bg-[#8AB83D]/10">
                Browse History
              </Button>
            </CardContent>
          </Card>
        </div> */}

        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            {!showAllProducts && (
              <Button variant="link" className="text-[#8AB83D]" onClick={handleViewAll}>
                View All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-[#8AB83D] font-medium">{product.category}</p>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold">${product.price}</span>
                      <span className="text-gray-500 text-sm"> / {product.unit}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#8AB83D] hover:bg-[#7DA634]"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {showAllProducts && (
            <div className="mt-6 text-center text-gray-500">
              Showing all available products.
            </div>
          )}
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

export default CustomerDashboard;

