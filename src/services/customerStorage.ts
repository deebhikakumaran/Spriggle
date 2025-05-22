// Types for customer form data
export interface CustomerFormData {
  personalInfo: {
    fullName: string;
    mobile: string;
    email: string;
    password: string;
  };
  address: {
    street: string;
    village: string;
    district: string;
    state: string;
    pinCode: string;
  };
}

// Store customer data in local storage
export const storeCustomerData = (data: CustomerFormData): void => {
  try {
    localStorage.setItem('customerFormData', JSON.stringify(data));
    
    // Also save form data to JSON file (simulated in browser environment)
    console.log('Customer data saved:', data);
    
    // For prototype purposes, we can simulate a file download
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Error saving customer data:', error);
  }
};

// Retrieve stored customer data
export const getStoredCustomerData = (): CustomerFormData | null => {
  try {
    const data = localStorage.getItem('customerFormData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving customer data:', error);
    return null;
  }
};