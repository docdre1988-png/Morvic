export type Category = { id: string; name: string; subtitle: string };
export type Product = {
  id: string; name: string; categoryId: string; price: number; description: string;
  image: string; color: string; sizes: string[]; available: boolean; visible: boolean;
  badge?: string; demo: boolean;
};
export type CartItem = { productId: string; size: string; quantity: number };
export type Catalog = { products: Product[]; categories: Category[] };
