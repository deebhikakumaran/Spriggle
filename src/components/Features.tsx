
import { Truck, Award, Leaf } from "lucide-react";

const Features = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="flex items-start gap-4">
            <div className="bg-green-50 p-3 rounded-full">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Fast shipping</h3>
              <p className="text-gray-600">
                We deliver products in any quantity throughout the country.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4">
            <div className="bg-green-50 p-3 rounded-full">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Quality products</h3>
              <p className="text-gray-600">
                We have all certificates of confirmation of product quality.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4">
            <div className="bg-green-50 p-3 rounded-full">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Eco food</h3>
              <p className="text-gray-600">
                We use only environmentally friendly food for livestock.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-4">
            <div className="bg-green-50 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Ecological places</h3>
              <p className="text-gray-600">
                Farms are located in ecologically clean places away from noisy cities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
