export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface panier {
  productId: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
  stock: number;
}