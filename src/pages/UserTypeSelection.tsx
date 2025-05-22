import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

const UserTypeSelection = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-12">Join Spriggle</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-8 border border-gray-200 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">For Sellers</h2>
            <p className="mb-6 text-gray-600">
              Join our platform as a rural producer and connect directly with urban buyers. 
              Sell your fresh produce and handcrafted goods to a wider market.
            </p>
            <Link to="/seller-signup" className="mt-auto">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-2">
                Sign up as Seller
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg p-8 border border-gray-200 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">For Customers</h2>
            <p className="mb-6 text-gray-600">
              Get access to farm-fresh produce and authentic rural products delivered directly 
              to your doorstep. Support local farmers and artisans.
            </p>
            <Link to="/customer-signup" className="mt-auto">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-2">
                Sign up as Customer
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div> */}
      <div className="container mx-auto px-4 max-w-3xl py-12">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Join Spriggle</h1>
          <p className="text-gray-600 mb-8">Choose how you want to use our platform</p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-spriggle transition-colors">
              <h2 className="text-xl font-semibold mb-3">For Buyers</h2>
              <p className="text-gray-600 mb-6">Create an account to browse products and connect with sellers</p>
              <Link to="/customer-signup">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Join as Buyer
                </Button>
              </Link>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:border-spriggle transition-colors">
              <h2 className="text-xl font-semibold mb-3">For Sellers</h2>
              <p className="text-gray-600 mb-6">Register as a seller to showcase your products to urban buyers</p>
              <Link to="/seller-signup">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Join as Seller
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-spriggle hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="container mx-auto px-4 md:px-6 py-8 mt-12 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">© 2025 Spriggle. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a href="/" className="text-gray-600 hover:text-primary text-sm">Privacy Policy</a>
            <a href="/" className="text-gray-600 hover:text-primary text-sm">Terms of Service</a>
            <a href="/" className="text-gray-600 hover:text-primary text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserTypeSelection;