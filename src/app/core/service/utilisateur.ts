import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../config/api.config';
import { Observable } from 'rxjs';
import { User, UserData, UserResponse } from '../model/modelUser';



export interface InscriptionData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: string;
  phone?: string;
  adresse?: string;
}

export interface InscriptionResponse {
  success: boolean;
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    phone?: string;
    adresse?: string;
  };
}

@Injectable({
  providedIn: 'root'
})



export class UtilisateurService {


 private http = inject(HttpClient);
 private apiUrl = API_URL;

  // Créer un utilisateur
  inscription(data: InscriptionData): Observable<InscriptionResponse> {
    return this.http.post<InscriptionResponse>(`${this.apiUrl}/AddUser`, data);
  }

  getUtilisateurs(){
    return this.http.get<{categories:User[]}>(`${this.apiUrl}/categorie`);
  }
  
  // recuperation d'un categorie par son id
  getUtilisateur(id: number) {
    return this.http.get(`${this.apiUrl}/getCategorie/${id}`);
  }
  

 // 7. MODIFIER UN UTILISATEUR
  updateUser(id: number, data: Partial<UserData>): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      `${this.apiUrl}/updateUser/${id}`,
      data
    );
  }



  // 8. SUPPRIMER UN UTILISATEUR
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/deleteUser/${id}`
    );
  }

  // 9. CHANGER LE MOT DE PASSE
  changePassword(data: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/change-password`,
      data
    );
  }







}
