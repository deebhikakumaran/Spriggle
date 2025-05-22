import { useState, useEffect } from "react";
import DashboardNav from "@/components/DashboardNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Home, Edit2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Import Label
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

// Type for customer data
interface CustomerData {
  fullName: string;
  email: string;
  mobile: string;
  street: string;
  village: string;
  district: string;
  state: string;
  pinCode: string;
  [key: string]: string;
}

const Profile = () => {
  const location = useLocation();
  const [userType, setUserType] = useState<"admin" | "customer" | "seller">(
    "customer"
  );
  const [userData, setUserData] = useState<CustomerData>({
    fullName: "",
    email: "",
    mobile: "",
    street: "",
    village: "",
    district: "",
    state: "",
    pinCode: "",
  });
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [formData, setFormData] = useState<CustomerData>(userData);

  useEffect(() => {
    // Determine user type from pathname
    if (location.pathname.includes("admin")) {
      setUserType("admin");
    } else if (location.pathname.includes("seller")) {
      setUserType("seller");
    } else {
      setUserType("customer");
    }

    // Load user data based on type
    const loadUserData = () => {
      try {
        let storedData;
        if (userType === "admin") {
          storedData = {
            fullName: "Admin User",
            email: "admin@spriggle.com",
            mobile: "123-456-7890",
            street: "Admin Street",
            village: "Admin Village",
            district: "Admin District",
            state: "Admin State",
            pinCode: "123456",
          };
        } else if (userType === "customer") {
          const customers = JSON.parse(
            localStorage.getItem("customerFormData") || "[]"
          );
          const customer = {
            fullName: customers.personalInfo.fullName,
            email: customers.personalInfo.email,
            mobile: customers.personalInfo.mobile,
            street: customers.address.street,
            village: customers.address.village,
            district: customers.address.district,
            state: customers.address.state,
            pinCode: customers.address.pinCode,
          };
          storedData = customer || null;
        } else if (userType === "seller") {
          const sellers = JSON.parse(
            localStorage.getItem("sellerFormData") || "[]"
          );
          const seller = {
            fullName: sellers.personalInfo.fullName,
            email: sellers.personalInfo.email,
            mobile: sellers.personalInfo.mobile,
            street: sellers.address.street,
            village: sellers.address.village,
            district: sellers.address.district,
            state: sellers.address.state,
            pinCode: sellers.address.pinCode,
          };
          storedData = seller || null;
        }

        if (storedData) {
          setUserData(storedData);
          setFormData(storedData); // Initialize form data as well
        } else if (userType === "customer") {
          toast.info("No customer data found in local storage.");
        } else if (userType === "seller") {
          toast.info("No seller data found in local storage.");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        toast.error("Failed to load profile data");
      }
    };

    loadUserData();
  }, [userType, location.pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const savePersonalInfo = () => {
    try {
      if (userType === "customer") {
        localStorage.setItem(
          "customerData",
          JSON.stringify([{ ...userData, ...formData }])
        );
      } else if (userType === "seller") {
        localStorage.setItem(
          "sellerData",
          JSON.stringify([{ ...userData, ...formData }])
        );
      }
      setUserData(formData);
      setIsEditingPersonal(false);
      toast.success("Personal information updated successfully");
    } catch (error) {
      console.error("Error saving personal info:", error);
      toast.error("Failed to update personal information");
    }
  };

  const saveAddressInfo = () => {
    try {
      if (userType === "customer") {
        localStorage.setItem(
          "customerData",
          JSON.stringify([{ ...userData, ...formData }])
        );
      } else if (userType === "seller") {
        localStorage.setItem(
          "sellerData",
          JSON.stringify([{ ...userData, ...formData }])
        );
      }
      setUserData(formData);
      setIsEditingAddress(false);
      toast.success("Address information updated successfully");
    } catch (error) {
      console.error("Error saving address info:", error);
      toast.error("Failed to update address information");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <DashboardNav userType={userType} />

      <div className="container mx-auto px-6 py-10 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">
            Manage your personal and account details
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="bg-gradient-to-br from-green-100 to-green-200 shadow-xl rounded-lg p-8 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center mb-6">
                <User className="h-14 w-14 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-green-700 mb-3">
                {userData.fullName}
              </h2>
              <p className="text-gray-600 text-lg mb-5 capitalize">
                {userType}
              </p>
              <div className="text-gray-700 text-md space-y-4 w-full max-w-sm">
                <div className="flex items-center justify-start rounded-md bg-green-50 p-3">
                  <Mail className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                  <span className="truncate">{userData.email}</span>
                </div>
                <div className="flex items-center justify-start rounded-md bg-green-50 p-3">
                  <Phone className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                  <span>{userData.mobile}</span>
                </div>
              </div>
            </Card>
            {/* <Card className="bg-white shadow-md rounded-lg p-6">
              <div className="w-24 h-24 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">
                {userData.fullName}
              </h2>
              <p className="text-gray-500 text-center mb-4">
                {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </p>
              <div className="text-gray-600 text-sm space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{userData.mobile}</span>
                </div>
              </div>
            </Card> */}
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">
                  Personal Information
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                  className="text-green-500 hover:bg-green-50"
                >
                  {isEditingPersonal ? (
                    <Save className="h-4 w-4" />
                  ) : (
                    <Edit2 className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditingPersonal}
                      className="border-brown-300 focus:border-green-500 focus:ring-green-500 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditingPersonal}
                      className="border-brown-300 focus:border-green-500 focus:ring-green-500 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile">Phone Number</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      disabled={!isEditingPersonal}
                      className="border-brown-300 focus:border-green-500 focus:ring-green-500 mt-2"
                    />
                  </div>
                </div>
                {isEditingPersonal && (
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditingPersonal(false);
                        setFormData(userData);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={savePersonalInfo}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">
                  Address Information
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-green-500 hover:bg-green-50"
                >
                  {isEditingAddress ? (
                    <Save className="h-4 w-4" />
                  ) : (
                    <Edit2 className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      disabled={!isEditingAddress}
                      className="border-brown-300 focus:border-green-500 focus:ring-green-500 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="village">Village/Town/City</Label>
                    <Input
                      id="village"
                      name="village"
                      value={formData.village}
                      onChange={handleInputChange}
                      disabled={!isEditingAddress}
                      className="border-brown-300 focus:border-green-500 focus:ring-green-500 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      disabled={!isEditingAddress}
                      className="border-brown-300 focus:border-green-500 focus:ring-green-500 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={!isEditingAddress}
                      className="border-brown-300 focus:border-green-500 focus:ring-green-500 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pinCode">Pin Code</Label>
                    <Input
                      id="pinCode"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      disabled={!isEditingAddress}
                      className="border-brown-300 focus:border-green-500 focus:ring-green-500 mt-2"
                    />
                  </div>
                </div>
                {isEditingAddress && (
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditingAddress(false);
                        setFormData(userData);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={saveAddressInfo}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Change Password</h3>
                    <p className="text-sm text-gray-500">
                      Update your account password
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-50"
                  >
                    Change
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Manage your email preferences
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-50"
                  >
                    Settings
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Delete Account</h3>
                    <p className="text-sm text-red-500">
                      Permanently remove your account
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="border-t bg-white py-6 mt-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Spriggle. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
