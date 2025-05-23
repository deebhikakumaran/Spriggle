import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "@/components/DashboardNav";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  verified: boolean;
  createdAt: string;
}

const SellerVerification = () => {
  const [seller, setSeller] = useState<Seller | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load seller from localStorage (sellerFormData)
    const loadSeller = () => {
      try {
        const sellerDataString = localStorage.getItem("sellerFormData");
        if (sellerDataString) {
          const sellerInfo = JSON.parse(sellerDataString);
          const sellerData = {
            id: 1,
            name: sellerInfo.personalInfo.fullName,
            email: sellerInfo.personalInfo.email,
            phone: sellerInfo.personalInfo.mobile,
            company: sellerInfo.businessInfo.businessName,
          }
          // Assuming the object in sellerFormData directly represents the seller
          // You might need to adjust this based on the actual structure
          setSeller(sellerData);
        }
      } catch (error) {
        console.error("Error loading seller data:", error);
        toast.error("Failed to load seller data");
      }
    };

    loadSeller();
  }, []);

  const handleVerify = (id: string) => {
    if (seller && seller.id === id) {
      const updatedSeller = { ...seller, verified: true };
      localStorage.setItem("sellerData", JSON.stringify(updatedSeller));
      setSeller(updatedSeller);
      toast.success("Seller verified successfully");
    }
  };

  const handleUnverify = (id: string) => {
    if (seller && seller.id === id) {
      const updatedSeller = { ...seller, verified: false };
      localStorage.setItem("sellerFormData", JSON.stringify(updatedSeller));
      setSeller(updatedSeller);
      toast.success("Seller unverified");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNav userType="admin" />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Verification</h1>
            <p className="text-gray-600">Review and verify seller accounts</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Seller</CardTitle>
          </CardHeader>
          <CardContent>
            {seller ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead>Joined</TableHead> */}
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={seller.id}>
                    <TableCell className="font-medium">{seller.name}</TableCell>
                    <TableCell>{seller.email}</TableCell>
                    <TableCell>{seller.company}</TableCell>
                    <TableCell>
                      {seller.verified ? (
                        <Badge className="bg-green-500 hover:bg-green-600">Verified</Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </TableCell>
                    {/* <TableCell>{new Date(seller.createdAt).toLocaleDateString()}</TableCell> */}
                    <TableCell>
                      {seller.verified ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnverify(seller.id)}
                        >
                          Unverify
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleVerify(seller.id)}
                        >
                          Verify
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No seller data found
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <footer className="border-t bg-white py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">© 2025 Spriggle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SellerVerification;