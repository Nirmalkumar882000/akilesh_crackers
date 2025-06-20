export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  price: number;
  discountPercentage: number;
  imageUrl: string;
  stockQuantity: number;
  isPopular: boolean;
  isNewArrival: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export type ThemeMode = 'light' | 'dark';