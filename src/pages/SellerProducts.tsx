import { useEffect, useState } from "react";
import { 
  getProducts, 
  deleteProduct,
  updateProduct,
  Product 
} from "@/services/sellerStorage";
import SellerNav from "@/components/SellerNav";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  ArrowUpDown
} from "lucide-react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const SellerProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
    filterAndSortProducts(loadedProducts, searchQuery, categoryFilter, sortField, sortDirection);
  };

  const filterAndSortProducts = (
    productList: Product[], 
    query: string, 
    category: string,
    field: string,
    direction: "asc" | "desc"
  ) => {
    // Filter
    let filtered = productList.filter(product => {
      const matchesQuery = 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.id.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = category === "all" || product.category === category;
      
      return matchesQuery && matchesCategory;
    });
    
    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (field === "price") {
        return direction === "asc" ? a.price - b.price : b.price - a.price;
      }
      else if (field === "inventory") {
        return direction === "asc" ? a.inventory - b.inventory : b.inventory - a.inventory;
      }
      else if (field === "name") {
        return direction === "asc" 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      else { // createdAt (default)
        return direction === "asc" 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    
    setFilteredProducts(sorted);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterAndSortProducts(products, searchQuery, categoryFilter, sortField, sortDirection);
  };

  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value);
    filterAndSortProducts(products, searchQuery, value, sortField, sortDirection);
  };

  const handleSortChange = (field: string) => {
    const direction = field === sortField && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
    filterAndSortProducts(products, searchQuery, categoryFilter, field, direction);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
      toast.success("Product deleted successfully");
      loadProducts();
    }
  };

  // Extract unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Manage Products</h1>
          <Button asChild className="bg-[#8AB83D] hover:bg-[#7DA634] text-white font-semibold rounded-md shadow-sm focus-visible:ring-2 focus-visible:ring-[#8AB83D] focus-visible:ring-offset-1">
            <Link to="/add-product" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 rounded-md shadow-sm focus:border-[#8AB83D] focus-visible:ring-1 focus-visible:ring-[#8AB83D]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
              {/* <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form> */}
              
              <div className="flex items-center gap-2">
                <span className="text-sm whitespace-nowrap">Filter by:</span>
                <Select
                  value={categoryFilter}
                  onValueChange={handleCategoryFilterChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>
                  <button 
                    onClick={() => handleSortChange("name")} 
                    className="flex items-center gap-1 hover:text-[#8AB83D] transition-colors"
                  >
                    Name
                    <ArrowUpDown size={14} />
                  </button>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <button 
                    onClick={() => handleSortChange("price")} 
                    className="flex items-center gap-1 hover:text-[#8AB83D] transition-colors"
                  >
                    Price
                    <ArrowUpDown size={14} />
                  </button>
                </TableHead>
                <TableHead>
                  <button 
                    onClick={() => handleSortChange("inventory")} 
                    className="flex items-center gap-1 hover:text-[#8AB83D] transition-colors"
                  >
                    Inventory
                    <ArrowUpDown size={14} />
                  </button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="h-16 w-16 rounded overflow-hidden bg-gray-100">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="line-clamp-2">{product.name}</div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {product.description}
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={product.inventory < 10 ? "text-red-500 font-medium" : ""}>
                        {product.inventory}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/edit-product/${product.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    {products.length === 0 
                      ? "You haven't added any products yet" 
                      : "No products match your search"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default SellerProducts;
