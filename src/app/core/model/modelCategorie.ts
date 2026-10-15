export interface Category {
  id: number;
  name: string;
  slug: string;
  utilisateur: any;
  created_at?: string;
  updated_at?: string;

  products?: Product[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
}