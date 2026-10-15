import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { API_URL } from '../../config/api.config';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})

export class Auth{

  private apiUrl = API_URL;

  constructor(private http: HttpClient) {}

  /*login(credentials: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials )
      .pipe(
        tap(response => {

          // Stocker le token Sanctum
          localStorage.setItem('token', response.token);

          // Stocker éventuellement l'utilisateur
          localStorage.setItem(
            'user',
            JSON.stringify(response.user)
          );

        })
      );
  }*/

  login(credentials: LoginRequest): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }


  //deconnexion des utilisateurs
  logout():Observable<any> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return this.http.get<any>('${this.apiUrl}/logout');
    
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}