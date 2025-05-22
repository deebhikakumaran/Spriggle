
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare,
  User,
  ShoppingBag,
  Plus,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SellerNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/seller-dashboard",
    },
    {
      icon: ShoppingBag,
      label: "My Products",
      href: "/seller-products",
    },
    {
      icon: Package,
      label: "Orders",
      href: "/seller-orders",
    },
    // {
    //   icon: MessageSquare,
    //   label: "Inbox",
    //   href: "/seller-messages",
    // },
    
    // {
    //   icon: Plus,
    //   label: "Add Product",
    //   href: "/add-product",
    // },
    // {
    //   icon: User,
    //   label: "Profile",
    //   href: "/profile",
    // }
  ];

  return (
    <header className="w-full py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-[#8AB83D]">SPRIGGLE</Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              to={item.href} 
              className={`px-4 py-2 flex items-center gap-2 rounded-md ${
                location.pathname === item.href
                  ? "text-[#8AB83D] font-medium"
                  : "text-gray-700 hover:text-[#8AB83D]"
              } transition-colors`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
          <Button 
            variant="outline"
            className="border-[#8AB83D] text-[#8AB83D] hover:bg-[#8AB83D]/10"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </nav>
        
        {/* Mobile menu button will go here in a full implementation */}
      </div>
    </header>
  );
};

export default SellerNav;