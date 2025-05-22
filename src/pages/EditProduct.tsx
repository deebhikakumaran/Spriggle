import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, updateProduct } from "@/services/sellerStorage";
import SellerNav from "@/components/SellerNav";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

// Define the validation schema
const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  category: z.string().min(1, { message: "Please select a category" }),
  inventory: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Inventory must be a non-negative number" }),
});

type ProductFormValues = z.infer<typeof productSchema>;

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      inventory: 0,
    },
  });

  useEffect(() => {
    if (id) {
      loadProductData(id);
    }
  }, [id]);

  const loadProductData = (productId: string) => {
    setIsLoading(true);
    const products = getProducts();
    const product = products.find((p) => p.id === productId);

    if (product) {
      // Set form values
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        inventory: product.inventory,
      });

      // Set image preview
      setImagePreview(product.imageUrl);
    } else {
      toast.error("Product not found");
      navigate("/seller-products");
    }

    setIsLoading(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProductFormValues) => {
    if (!id) {
      toast.error("Product ID is missing");
      return;
    }

    setIsSubmitting(true);

    try {
      // Ensure we have an image URL
      const imageUrl =
        imagePreview ||
        "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1";

      // Get existing product to preserve id and createdAt
      const products = getProducts();
      const existingProduct = products.find((p) => p.id === id);

      if (!existingProduct) {
        toast.error("Product not found");
        return;
      }

      // Update product
      updateProduct({
        id: existingProduct.id,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        inventory: data.inventory,
        imageUrl: imageUrl,
        createdAt: existingProduct.createdAt,
      });

      toast.success("Product updated successfully");

      // Navigate back to products page after short delay to show toast
      setTimeout(() => {
        navigate("/seller-products");
      }, 1000);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SellerNav />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading product data...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate("/seller-products")}
            className="rounded-md hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-semibold text-gray-900">Edit Product</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-md rounded-lg">
              <CardHeader className="py-4 px-6 border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-800">Product Information</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Update the details of your product
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Product Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Fresh Organic Basil"
                              {...field}
                              className="border-gray-300 rounded-md shadow-sm focus:border-[#8AB83D] focus-visible:ring-1 focus-visible:ring-[#8AB83D]"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your product and its unique qualities..."
                              className="min-h-[100px] border-gray-300 rounded-md shadow-sm focus:border-[#8AB83D] focus-visible:ring-1 focus-visible:ring-[#8AB83D]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Price ($)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                {...field}
                                className="border-gray-300 rounded-md shadow-sm focus:border-[#8AB83D] focus-visible:ring-1 focus-visible:ring-[#8AB83D]"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="inventory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Inventory</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                className="border-gray-300 rounded-md shadow-sm focus:border-[#8AB83D] focus-visible:ring-1 focus-visible:ring-[#8AB83D]"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-gray-300 rounded-md shadow-sm focus:border-[#8AB83D] focus-visible:ring-1 focus-visible:ring-[#8AB83D]">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-md shadow-md border border-gray-200">
                              <SelectItem value="Vegetables">Vegetables</SelectItem>
                              <SelectItem value="Fruits">Fruits</SelectItem>
                              <SelectItem value="Dairy">Dairy</SelectItem>
                              <SelectItem value="Bakery">Bakery</SelectItem>
                              <SelectItem value="Meat">Meat</SelectItem>
                              <SelectItem value="Organic">Organic</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-xs" />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Label htmlFor="product-image" className="text-sm font-medium text-gray-700">Product Image</Label>
                      <div className="mt-2">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center gap-4">
                          <Upload className="h-8 w-8 text-gray-500" />
                          <div className="text-center">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2 border-[#8AB83D] text-[#8AB83D] hover:bg-[#8AB83D]/10"
                              onClick={() => document.getElementById('product-image')?.click()}
                            >
                              Choose Image
                            </Button>
                            <Input
                              id="product-image"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              JPEG, PNG or GIF up to 5MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#8AB83D] hover:bg-[#7DA634] text-white font-semibold rounded-md shadow-sm focus-visible:ring-2 focus-visible:ring-[#8AB83D] focus-visible:ring-offset-1"
                      disabled={isSubmitting}
                    >
                      Update Product
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white shadow-md rounded-lg">
              <CardHeader className="py-4 px-6 border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Preview
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  How your product will look
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="aspect-square rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-sm text-gray-500">
                        No image selected
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {form.watch("name") || "Product Name"}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mt-1">
                      {form.watch("description") ||
                        "Product description will appear here"}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold text-lg text-gray-900">
                        {/* ${!isNaN(parseFloat(form.watch("price"))) ? parseFloat(form.watch("price")).toFixed(2) : "0.00"} */}
                        $
                        {form.watch("price")
                          ? parseFloat(form.watch("price")).toFixed(2)
                          : "0.00"}
                      </span>
                      <span className="text-sm text-gray-500">
                        In stock: {form.watch("inventory") || 0}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 bg-[#8AB83D]/10 text-[#8AB83D] rounded-full text-xs font-semibold">
                        {form.watch("category") || "Category"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EditProduct;
