// Types for form data
export interface SellerFormData {
  personalInfo: {
    fullName: string;
    mobile: string;
    email: string;
    password: string;
  };
  address: {
    address: string;
    pinCode: string;
    addressProof?: File;
  };
  identification: {
    aadhaarNumber: string;
    idProof?: File;
  };
  businessInfo: {
    goodsType: string;
    businessName: string;
    yearsExperience: string;
    productImages?: File[];
  };
  banking: {
    upiId: string;
  };
}

// Store form data in local storage
export const storeSellerData = (data: SellerFormData): void => {
  try {
    // We need to handle File objects specially since they can't be directly stringified
    const serializedData = {
      ...data,
      address: {
        ...data.address,
        addressProof: data.address.addressProof ? data.address.addressProof.name : undefined,
      },
      identification: {
        ...data.identification,
        idProof: data.identification.idProof ? data.identification.idProof.name : undefined,
      },
      businessInfo: {
        ...data.businessInfo,
        productImages: data.businessInfo.productImages 
          ? data.businessInfo.productImages.map(file => file.name)
          : undefined,
      }
    };

    localStorage.setItem('sellerFormData', JSON.stringify(serializedData));
    
    // Also save form data to JSON file (simulated in browser environment)
    console.log('Form data saved:', serializedData);
    
    // In a real development environment, you might want to:
    // 1. Save to IndexedDB for larger data
    // 2. Potentially use the File System Access API (for newer browsers)
    // 3. Or implement a download functionality to save as a file
    
    // For prototype purposes, we can simulate a file download
    const blob = new Blob([JSON.stringify(serializedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seller-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Error saving form data:', error);
  }
};

// Retrieve stored form data
export const getStoredSellerData = (): SellerFormData | null => {
  try {
    const data = localStorage.getItem('sellerFormData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving form data:', error);
    return null;
  }
};


// Types for seller data
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inventory: number;
  imageUrl: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Message {
  id: string;
  from: string;
  email: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: string;
}

// Get products from local storage
export const getProducts = (): Product[] => {
  try {
    const products = localStorage.getItem('sellerProducts');
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error('Error retrieving products:', error);
    return [];
  }
};

// Save products to local storage
export const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem('sellerProducts', JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products:', error);
  }
};

// Add a new product
export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

// Update a product
export const updateProduct = (product: Product): void => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  
  if (index !== -1) {
    products[index] = product;
    saveProducts(products);
  }
};

// Delete a product
export const deleteProduct = (id: string): void => {
  const products = getProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  saveProducts(filteredProducts);
};

// Get orders from local storage
export const getOrders = (): Order[] => {
  try {
    const orders = localStorage.getItem('sellerOrders');
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return [];
  }
};

// Save orders to local storage
export const saveOrders = (orders: Order[]): void => {
  try {
    localStorage.setItem('sellerOrders', JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders:', error);
  }
};

// Update order status
export const updateOrderStatus = (id: string, status: Order['status']): void => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  
  if (index !== -1) {
    orders[index].status = status;
    saveOrders(orders);
  }
};

// Get messages from local storage
export const getMessages = (): Message[] => {
  try {
    const messages = localStorage.getItem('sellerMessages');
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return [];
  }
};

// Save messages to local storage
export const saveMessages = (messages: Message[]): void => {
  try {
    localStorage.setItem('sellerMessages', JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving messages:', error);
  }
};

// Mark message as read
export const markMessageAsRead = (id: string): void => {
  const messages = getMessages();
  const index = messages.findIndex(m => m.id === id);
  
  if (index !== -1) {
    messages[index].read = true;
    saveMessages(messages);
  }
};

// Initialize with sample data if storage is empty
export const initializeSampleData = (): void => {
  // Initialize products if empty
  if (getProducts().length === 0) {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Organic Tomatoes',
        price: 2.99,
        description: 'Fresh organic tomatoes grown locally',
        category: 'Vegetables',
        inventory: 50,
        imageUrl: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Organic Apples',
        price: 3.49,
        description: 'Sweet and crisp organic apples',
        category: 'Fruits',
        inventory: 40,
        imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Organic Lettuce',
        price: 1.99,
        description: 'Fresh organic lettuce from our farm',
        category: 'Vegetables',
        inventory: 30,
        imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1',
        createdAt: new Date().toISOString()
      },
    ];
    saveProducts(sampleProducts);
  }
  
  // Initialize orders if empty
  if (getOrders().length === 0) {
    const sampleOrders: Order[] = [
      {
        id: '1',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        products: [
          {
            productId: '1',
            name: 'Organic Tomatoes',
            quantity: 5,
            price: 2.99
          },
          {
            productId: '2',
            name: 'Organic Apples',
            quantity: 3,
            price: 3.49
          }
        ],
        total: 25.42,
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        products: [
          {
            productId: '3',
            name: 'Organic Lettuce',
            quantity: 2,
            price: 1.99
          }
        ],
        total: 3.98,
        status: 'shipped',
        createdAt: new Date(Date.now() - 86400000).toISOString() // Yesterday
      }
    ];
    saveOrders(sampleOrders);
  }
  
  // Initialize messages if empty
  if (getMessages().length === 0) {
    const sampleMessages: Message[] = [
      {
        id: '1',
        from: 'John Doe',
        email: 'john@example.com',
        subject: 'Question about tomatoes',
        content: 'Hi, I would like to know if your tomatoes are available for wholesale purchase. Thanks!',
        read: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        from: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Order delivery',
        content: 'When can I expect my order to be delivered? Thank you.',
        read: true,
        createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      }
    ];
    saveMessages(sampleMessages);
  }
};
