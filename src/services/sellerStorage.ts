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