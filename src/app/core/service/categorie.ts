import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { API_URL } from '../../config/api.config';
import { Category } from '../model/modelCategorie'; 
import { SessionStore } from './auth/session.store';
import { Observable } from 'rxjs';

export interface Categorie {
  id: number;
  libelle: string;
  slug: string;
  created_at?: string;
}

@Injectable({ 
    providedIn: 'root'  
})

export class Categorie {

private http = inject(HttpClient);
private session = inject(SessionStore);

 //recuperer l'url de l'api depuis le fichier de configuration
private apiUrl = API_URL;


//recupration de tous les categories
getCategories(){
  return this.http.get<{categories:Category[]}>(`${this.apiUrl}/categorie`);
}

// recuperation d'un categorie par son id
getCategory(id: number) {
  return this.http.get(`${this.apiUrl}/getCategorie/${id}`);
}


// Creation d'un categorie
createCategory(data: any) {
  return this.http.post(`${this.apiUrl}/AjoutCategorie`, data);
}


// Mise à jour d'un categorie
updateCategory(id: number, data: any) {
  return this.http.put(`${this.apiUrl}/updateCategorie/${id}`, data);
}


// Suppression d'un categorie
deleteCategory(id: number) {
  return this.http.delete(`${this.apiUrl}/deleteCategorie/${id}`);
}




}
