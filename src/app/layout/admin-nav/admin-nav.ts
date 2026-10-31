import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth/auth-service';

@Component({
  imports: [RouterLink],
  selector: 'app-admin-nav',
  styleUrl: './admin-nav.css',
  templateUrl: './admin-nav.html',
})
export class AdminNav {

private authService = inject(AuthService);
private router = inject(Router);

get Connecter(): boolean {
  return this.authService.isLoggedIn();
}

deconnexion(): void {
  this.authService.logout().subscribe({
    next: () =>{ this.terminerDeconnexion();
    },
    error: (erreur) => {
      console.error('Erreur api deconnexion:',erreur)
      // Nettoyer aussi la session locale si l'API échoue.
      this.terminerDeconnexion();
    }
  });
}

private terminerDeconnexion(): void {
  this.authService.clearSession();
  this.router.navigate(['/login']);
}


}
