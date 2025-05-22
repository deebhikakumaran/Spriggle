
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 py-6">
        <Hero />
        <Features />
      </main>
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

export default Index;
