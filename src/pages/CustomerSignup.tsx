
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { personalInfoSchema, customerAddressSchema } from "@/lib/form-validation";
import { Link } from "react-router-dom";
import { User, MapPin, Eye, EyeOff, ArrowLeft, ArrowRight, Check } from "lucide-react";
import * as z from "zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { storeCustomerData } from "@/services/customerStorage";

type FormStep = 1 | 2;

// const customerSchema = z.object({
//   ...personalInfoSchema.shape,
//   ...customerAddressSchema.shape,
// });

// Define a schema without using .shape which causes the TypeScript error
const customerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  street: z.string().min(5, "Street address must be at least 5 characters"),
  village: z.string().min(2, "Village/Town/City must be at least 2 characters"),
  district: z.string().min(2, "District must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pinCode: z.string().min(6, "Pin code must be at least 6 digits"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type CustomerFormValues = z.infer<typeof customerSchema>;

const CustomerSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form for all customer data
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      street: "",
      village: "",
      district: "",
      state: "",
      pinCode: "",
    },
  });

  const handleNextStep = async () => {
    // Validate only the fields in the current step
    const fieldsToValidate = currentStep === 1 
      ? ["fullName", "mobile", "email", "password", "confirmPassword"]
      : ["street", "village", "district", "state", "pinCode"];
    
    const result = await form.trigger(fieldsToValidate as any);
    
    if (result && currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  const onSubmit = (data: CustomerFormValues) => {
    // Format data for storage
    const formattedData = {
      personalInfo: {
        fullName: data.fullName,
        mobile: data.mobile,
        email: data.email,
        password: data.password,
      },
      address: {
        street: data.street,
        village: data.village,
        district: data.district,
        state: data.state,
        pinCode: data.pinCode,
      },
    };
    
    // Store the data
    storeCustomerData(formattedData);
    
    toast.success("Registration successful!");
    // Navigate to sign in page after successful registration
    setTimeout(() => {
      navigate("/signin");
    }, 1500);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center">
        {[1, 2].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === step
                  ? "bg-primary text-white"
                  : currentStep > step
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > step ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < 2 && (
              <div
                className={`w-10 h-1 ${
                  currentStep > step ? "bg-green-500" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-center mb-2">Customer Registration</h1>
          <p className="text-center text-gray-600 mb-8">Join Spriggle to get fresh produce delivered to your door</p>

          {renderStepIndicator()}

          <Form {...form}>
            <form className="space-y-6">
              {currentStep === 1 && (
                <>
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <User className="h-5 w-5" />
                    <h2 className="text-lg font-medium">Personal Information</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <MapPin className="h-5 w-5" />
                    <h2 className="text-lg font-medium">Delivery Address</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="village"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Village/Town/City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your village, town or city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your district" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pinCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pin Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pin code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </form>
          </Form>

          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={handlePreviousStep} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
            ) : (
              <Link to="/user-type-selection">
                <Button type="button" variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              </Link>
            )}

            {currentStep < 2 ? (
              <Button type="button" onClick={handleNextStep} className="bg-primary hover:bg-primary-hover flex items-center gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={form.handleSubmit(onSubmit)}
                className="bg-primary hover:bg-primary-hover"
              >
                Complete Registration
              </Button>
            )}
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

export default CustomerSignup;
