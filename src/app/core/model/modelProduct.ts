export interface Product {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description:string;
  price: number;
  stock: number;
  image_url: string | null;
  status: boolean;
  utilisateur: any;
  
}