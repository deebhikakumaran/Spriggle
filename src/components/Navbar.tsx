
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full py-4 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-primary">SPRIGGLE</Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/signin" className="text-primary font-medium hover:underline">Sign in</Link>
          <Link to="/signup" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors">Sign Up</Link>
        </nav>
        
        <button className="md:hidden text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;