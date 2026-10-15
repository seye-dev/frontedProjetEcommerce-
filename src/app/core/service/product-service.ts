import { Injectable } from '@angular/core';
import { API_URL } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';


export interface ProduitLoad {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  categorie_id: number;
  image?: File | null;
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
getProducts() {
  return this.http.get(`${this.apiUrl}/products`);
}

// recuperation d'un produit par son id
getProduct(id: number) {
  return this.http.get(`${this.apiUrl}/products/${id}`);
}

// Creation d'un produit
createProduct(data: any) {
  return this.http.post(`${this.apiUrl}/products`, data);
}

// Mise à jour d'un produit
UpdateProduct(id: number, data: any) {
  return this.http.put(`${this.apiUrl}/products/${id}`, data);
}

// Suppression d'un produit
deleteProduct(id: number) {
  return this.http.delete(`${this.apiUrl}/products/${id}`);
}

}
