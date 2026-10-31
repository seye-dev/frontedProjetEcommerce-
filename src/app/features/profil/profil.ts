import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth-service';

@Component({
  imports: [],
  selector: 'app-profil',
  styleUrl: './profil.css',
  templateUrl: './profil.html',
})
export class Profil {
  private authService = inject(AuthService);

  user = signal<any | null>(null);
  loading = signal(true);
  errorMessage = signal('');


ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (response: any) => {
        const utilisateur = response?.user ?? response?.data ?? response;

        this.user.set(utilisateur);

        // Actualiser les données mises en cache
        localStorage.setItem('user', JSON.stringify(utilisateur));
      },
      error: (error: any) => {
        console.error('Erreur profil :', error);
        this.errorMessage.set(
          'Impossible de charger votre profil.'
        );
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }











}
