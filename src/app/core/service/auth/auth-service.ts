import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { SessionStore } from './session.store';
import { AuthResponse, Credentials, Registration, User } from '../../model/modelUser';
import { API_URL } from '../../../config/api.config';
import { finalize, tap } from 'rxjs';

@Service()

export class AuthService {
  private apiUrl = API_URL;
  private http = inject(HttpClient);
  private session = inject(SessionStore);


  login(data: Credentials| any) {
    return this.authenticate('/login', data)
    // partie ajouter pour recuper la tocken
    .pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      })
    );

  }

  // Recuperation du tocken apres authentification
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }



  register(data: Registration) {
    return this.authenticate('/register', data);
  }

  private authenticate(path: string, data: Credentials | Registration) {
    return this.http
      .post<AuthResponse>(this.apiUrl + path, data)
      .pipe(tap((response) => this.session.setSession(response)));
  }

  me() {
    return this.http.get<User>(this.apiUrl + '/me');
  }

  logout() {
    return this.http
      .post<void>(this.apiUrl + '/logout',{})
      .pipe(finalize(() => this.session.clear()));
  }


}
