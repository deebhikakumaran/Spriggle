
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-secondary py-16 md:py-20 rounded-3xl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Powered by Rural,<br /> Loved by Urban
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Farm-picked fruits, vegetables, dairy, and more — brought to your doorstep with love from rural growers.
            </p>
            <Button className="bg-primary hover:bg-primary-hover text-white px-8 py-6 text-lg">
              Get Started
            </Button>
            
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-primary rounded-full w-[350px] h-[350px] md:w-[450px] md:h-[450px] mx-auto overflow-hidden relative">
                <img 
                  src="./Hero.png" 
                  alt="Farmer with fresh produce" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
