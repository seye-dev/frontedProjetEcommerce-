import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { API_URL } from '../../../config/api.config';
import { SessionStore } from './session.store';
import { AuthService } from './auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const session = inject(SessionStore);
  const authService = inject(AuthService);

  if (!req.url.startsWith(API_URL + '/')) return next(req);
  

   //const token = session.token(); //nouveau recuperation du tocken sur authService
  
  const token = authService.getToken();

  const headers: Record<string, string> = { Accept: 'application/json' };

  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  return next(req.clone({ setHeaders: headers })).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && token && session.token() === token) {
        session.clear();
      }
      return throwError(() => error);
    }),
  );


}
