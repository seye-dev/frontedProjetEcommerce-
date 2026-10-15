// core/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { SessionStore } from './session.store';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = () => {

  const session = inject(SessionStore);
  const auth = inject(AuthService);

  const router = inject(Router);

  const login = router.createUrlTree(['/login']);

  if (!session.token()) return login;

  return auth.me().pipe(
    map((user) => {
      session.setSession({ token: session.token()!, user });
      return true;
    }),
    
    catchError((error) => of(error.status === 401 ? login : false)),
  );
};
