import { Component, inject, signal } from '@angular/core';
import { UtilisateurService } from '../../../core/service/utilisateur';
import { Router } from '@angular/router';
import { User } from '../../../core/model/modelUser';

@Component({
  imports: [],
  selector: 'app-list-utilisateur',
  styleUrl: './list-utilisateur.css',
  templateUrl: './list-utilisateur.html',
})
export class ListUtilisateur {


   constructor(private utilisateurService: UtilisateurService) {}
  private router = inject(Router);

  utilisateur= signal<User[]>([]);

  loading = false;
  errorMessage = '';
  
  ngOnInit(): void {

    this.listeUtilisatur();

  }

  listeUtilisatur():void {
    this.loading = true;
    this.loading = true;
    this.errorMessage = '';

    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data: any) => {
        console.log('liste Utilisatur:', data);
        this.utilisateur.set(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement catégories :', err);
        this.errorMessage = err.error?.message ?? 'Impossible de charger les catégories.';
        this.loading = false;
      }
    });
  }


modifierUtilisatur(id: number): void {
  this.router.navigate(['/admin/edit-utilisateur', id]);
}

supprimerUtilisatur(id: number): void {
  const confirmation = confirm(
    'Voulez-vous vraiment supprimer cette catégorie ?'
  );

  if (!confirmation) {
    return;
  }

  this.utilisateurService.deleteUser(id).subscribe({
    next: () => {
      alert('Catégorie supprimée avec succès.');
      this.listeUtilisatur();
    },
    error: (err) => {
      console.error('Erreur lors de la suppression :', err);

      this.errorMessage =
        err.error?.message ??
        'Impossible de supprimer cette catégorie.';
    }
  });
}



}
