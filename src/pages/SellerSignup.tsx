
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  personalInfoSchema, 
  addressSchema, 
  identificationSchema, 
  businessInfoSchema, 
  bankingSchema 
} from "@/lib/form-validation";
import { User, MapPin, File, Briefcase, CreditCard, Eye, EyeOff, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { storeSellerData } from "@/services/sellerStorage";
import Navbar from "@/components/Navbar";

type FormStep = 1 | 2 | 3 | 4 | 5;

const SellerSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Personal Info Form
  const personalInfoForm = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Address Form
  const addressForm = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: "",
      pinCode: "",
      addressProof: undefined,
    },
  });

  // Identification Form
  const identificationForm = useForm({
    resolver: zodResolver(identificationSchema),
    defaultValues: {
      aadhaarNumber: "",
      idProof: undefined,
    },
  });

  // Business Info Form
  const businessInfoForm = useForm({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      goodsType: "",
      businessName: "",
      yearsExperience: "",
      productImages: [],
    },
  });

  // Banking Form
  const bankingForm = useForm({
    resolver: zodResolver(bankingSchema),
    defaultValues: {
      upiId: "",
    },
  });

  const handleNextStep = async () => {
    switch (currentStep) {
      case 1:
        const personalInfoValid = await personalInfoForm.trigger();
        if (personalInfoValid) setCurrentStep(2);
        break;
      case 2:
        const addressValid = await addressForm.trigger();
        if (addressValid) setCurrentStep(3);
        break;
      case 3:
        const identificationValid = await identificationForm.trigger();
        if (identificationValid) setCurrentStep(4);
        break;
      case 4:
        const businessInfoValid = await businessInfoForm.trigger();
        if (businessInfoValid) setCurrentStep(5);
        break;
      default:
        break;
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  const onSubmit = () => {
    // Normally we would collect all data from all steps and submit
    console.log({
      ...personalInfoForm.getValues(),
      ...addressForm.getValues(),
      ...identificationForm.getValues(),
      ...businessInfoForm.getValues(),
      ...bankingForm.getValues(),
    });

    const formData = {
      personalInfo: {
        fullName: personalInfoForm.getValues("fullName"),
        mobile: personalInfoForm.getValues("mobile"),
        email: personalInfoForm.getValues("email"),
        password: personalInfoForm.getValues("password"),
      },
      address: {
        address: addressForm.getValues("address"),
        pinCode: addressForm.getValues("pinCode"),
        addressProof: addressForm.getValues("addressProof"),
      },
      identification: {
        aadhaarNumber: identificationForm.getValues("aadhaarNumber"),
        idProof: identificationForm.getValues("idProof"),
      },
      businessInfo: {
        goodsType: businessInfoForm.getValues("goodsType"),
        businessName: businessInfoForm.getValues("businessName"),
        yearsExperience: businessInfoForm.getValues("yearsExperience"),
        productImages: businessInfoForm.getValues("productImages"),
      },
      banking: {
        upiId: bankingForm.getValues("upiId"),
      },
    };
    
    // Store form data
    storeSellerData(formData);
    
    // For now just log success
    toast.success("Registration successful!");
    // Navigate to sign in page after successful registration
    // For the prototype, you could redirect to a success page
    // navigate("/registration-success");
    setTimeout(() => {
      navigate("/signin");
    }, 1500);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((step) => (
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
            {step < 5 && (
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
          <h1 className="text-2xl font-bold text-center mb-2">Seller Registration</h1>
          <p className="text-center text-gray-600 mb-8">Join Spriggle as a seller to connect with urban buyers</p>

          {renderStepIndicator()}

          {currentStep === 1 && (
            <Form {...personalInfoForm}>
              <form className="space-y-6">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <User className="h-5 w-5" />
                  <h2 className="text-lg font-medium">Personal Information</h2>
                </div>
                
                <FormField
                  control={personalInfoForm.control}
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
                  control={personalInfoForm.control}
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
                  control={personalInfoForm.control}
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
                  control={personalInfoForm.control}
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
                  control={personalInfoForm.control}
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
              </form>
            </Form>
          )}

          {currentStep === 2 && (
            <Form {...addressForm}>
              <form className="space-y-6">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <MapPin className="h-5 w-5" />
                  <h2 className="text-lg font-medium">Address Details</h2>
                </div>
                
                <FormField
                  control={addressForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residential Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your residential address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addressForm.control}
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

                <FormField
                  control={addressForm.control}
                  name="addressProof"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Proof of Address</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              field.onChange(e.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500">Upload ration card, PAN card, or other address proof</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          {currentStep === 3 && (
            <Form {...identificationForm}>
              <form className="space-y-6">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <File className="h-5 w-5" />
                  <h2 className="text-lg font-medium">Identification</h2>
                </div>
                
                <FormField
                  control={identificationForm.control}
                  name="aadhaarNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your 12-digit Aadhaar number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={identificationForm.control}
                  name="idProof"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload ID Proof</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              field.onChange(e.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500">Upload Aadhaar Card</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          {currentStep === 4 && (
            <Form {...businessInfoForm}>
              <form className="space-y-6">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Briefcase className="h-5 w-5" />
                  <h2 className="text-lg font-medium">Business Information</h2>
                </div>
                
                <FormField
                  control={businessInfoForm.control}
                  name="goodsType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Goods Sold</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Organic produce, handcrafted items" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessInfoForm.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your business name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessInfoForm.control}
                  name="yearsExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter years of experience" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessInfoForm.control}
                  name="productImages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Sample Product Images</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            if (e.target.files) {
                              field.onChange(Array.from(e.target.files));
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          {currentStep === 5 && (
            <Form {...bankingForm}>
              <form className="space-y-6" onSubmit={bankingForm.handleSubmit(onSubmit)}>
                <div className="flex items-center gap-2 text-primary mb-4">
                  <CreditCard className="h-5 w-5" />
                  <h2 className="text-lg font-medium">Banking Details</h2>
                </div>
                
                <FormField
                  control={bankingForm.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPI ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your UPI ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

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

            {currentStep < 5 ? (
              <Button type="button" onClick={handleNextStep} className="bg-primary hover:bg-primary-hover flex items-center gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={bankingForm.handleSubmit(onSubmit)}
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

export default SellerSignup;
