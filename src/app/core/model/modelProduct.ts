export interface Product {
   id: number;
  category_id: number;
  user_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image: string | null;
  image_url?:string|null;
  status?: boolean;
  utilisateur?: any;
  stock_status?: 'rupture' | 'stock_faible' | 'disponible';
  
}