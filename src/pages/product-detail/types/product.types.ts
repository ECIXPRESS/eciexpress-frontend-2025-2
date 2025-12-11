export interface ProductOption {
  id: string;
  label: string;
  values: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'cafeteria' | 'papeleria';
  stock: number;
  rating: number;
  reviewCount: number;
  vendor: string;
  vendorLogo?: string;
  options?: ProductOption[];
  tags?: string[];
  preparationTime?: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  category: string;
}