import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

// Pre-registered admin credentials
const ADMIN_EMAIL = "admin@spriggle.com";
const ADMIN_PASSWORD = "admin123";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check for admin credentials
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        toast.success("Welcome Admin!");
        setTimeout(() => navigate("/admin-dashboard"), 1000);
        return;
      }

      // Check local storage for customer credentials
      const storedCustomers = localStorage.getItem("customerFormData");
      if (storedCustomers) {
        try {
          const customers = JSON.parse(storedCustomers);

          // Assuming 'customerFormData' stores an object with 'personalInfo'

          if (
            customers &&
            customers.personalInfo &&
            customers.personalInfo.email === email &&
            customers.personalInfo.password === password
          ) {
            toast.success("Welcome back, Customer!");

            setTimeout(() => navigate("/customer-dashboard"), 1000);

            return;
          }
        } catch (error) {
          console.error("Error parsing customer data:", error);

          toast.error("Error during login. Please try again.");
        }
      }

      // Check local storage for seller credentials
      const storedSellers = localStorage.getItem("sellerFormData");
      if (storedSellers) {
        try {
          const sellers = JSON.parse(storedSellers);

          // Assuming 'sellerFormData' stores an object with 'personalInfo'

          if (
            sellers &&
            sellers.personalInfo &&
            sellers.personalInfo.email === email &&
            sellers.personalInfo.password === password
          ) {
            toast.success("Welcome back, Seller!");

            setTimeout(() => navigate("/seller-dashboard"), 1000);

            return;
          }
        } catch (error) {
          console.error("Error parsing seller data:", error);

          toast.error("Error during login. Please try again.");
        }
      }

      // If no match found
      toast.error("Invalid email or password. Please try again.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Login to Spriggle
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:text-primary/90"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* <Button
              type="submit"
              className="w-full bg-[#8AB83D] hover:bg-[#7DA634]"
              disabled={isLoading}
            ></Button> */}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="text-center mb-8 mt-5">
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              {/* <Link to="/user-type-selection" className="font-medium text-[#8AB83D] hover:text-[#7DA634]"></Link> */}
              <Link
                to="/signup"
                className="font-medium text-primary hover:text-primary/90"
              >
                Create a new account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="container mx-auto px-4 md:px-6 py-8 mt-12 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © 2025 Spriggle. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8">
            <a href="/" className="text-gray-600 hover:text-primary text-sm">
              Privacy Policy
            </a>
            <a href="/" className="text-gray-600 hover:text-primary text-sm">
              Terms of Service
            </a>
            <a href="/" className="text-gray-600 hover:text-primary text-sm">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
