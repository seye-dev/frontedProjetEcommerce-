import { Injectable } from '@angular/core';
import { API_URL } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/modelProduct';


export interface ProduitLoad {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  categorie_id: number;
  image?: File | null;
  image_url?:string;
}

export interface ProduitResponse {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string | null;
  categorie: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) {}

    //recuperer l'url de l'api depuis le fichier de configuration
     private apiUrl = API_URL;


//recupration de tous les produits
getProductAll() {
  return this.http.get<{
    success: boolean;
    products: Product[];
  }>(`${this.apiUrl}/products`);
}

// recuperation d'un produit par son id
getProduct(id: number) {
  return this.http.get<{success: boolean;  product: Product;}>(`${this.apiUrl}/getProducts/${id}`);
}

// Creation d'un produit
createProduct(data: FormData) {
  return this.http.post(`${this.apiUrl}/AjoutProducts`, data);
}

// Mise à jour d'un produit
UpdateProduct(id: number, data: any) {
  return this.http.put(`${this.apiUrl}/updateProducts/${id}`, data);
}

// Suppression d'un produit
deleteProduct(id: number) {
  return this.http.delete(`${this.apiUrl}/deleteProducts/${id}`);
}

//gestion de stock
getStocks() {
  return this.http.get<{ success: boolean; products: Product[] }>(
    `${this.apiUrl}/stocks`
  );
}

// update stock

updateStock(id: number, stock: number) {
  return this.http.put<{ success: boolean; message: string; product: Product }>(
    `${this.apiUrl}/updateStock/${id}/`,
    { stock }
  );
}

}
