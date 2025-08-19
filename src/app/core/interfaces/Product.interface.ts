export interface Product {
  id: number;
  name: string;
  description: string;
  categories: string[];
  image: string;
  price: string;
  regular_price: string;
  sale_price: string;
  sku: string;
  stock_status: 'instock' | 'outofstock' | 'onbackorder' | string; 
}
