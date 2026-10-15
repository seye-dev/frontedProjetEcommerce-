// core/session.store.ts

import { Injectable, computed, signal } from '@angular/core';
import { AuthResponse, User } from '../../model/modelUser';
//import { AuthResponse, User } from './auth.models';

@Injectable({ providedIn: 'root' })

export class SessionStore {
  private tokenState = signal<string | null>(null);

  private userState = signal<User | null>(null);

  readonly token = this.tokenState.asReadonly();

  readonly user = this.userState.asReadonly();

  readonly isAuthenticated = computed(() => this.user() !== null);

  setSession(response: AuthResponse) {

    this.tokenState.set(response.token);
    
    this.userState.set(response.user);
    //nouveau recuper le tocken au niveau du local storage et utilisateur
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }
  clear() {
    this.tokenState.set(null);
    this.userState.set(null);
    //nouveau supprimmer le tocken de l'utilisateur
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
//nouveau ajouter pour recuper ulisateur
private loadUser(): User | null {
    const savedUser = localStorage.getItem('user');

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser) as User;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  }

}
