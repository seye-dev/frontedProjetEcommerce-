import { Component, inject, signal, Signal } from '@angular/core';
import { Categorie } from '../../../core/service/categorie';
import { Category } from '../../../core/model/modelCategorie';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-list-categorie',
  styleUrl: './list-categorie.css',
  templateUrl: './list-categorie.html',
})




export class ListCategorie {

  constructor(private categorieService: Categorie) {}
  private router = inject(Router);

  categories= signal<Category[]>([]);

  loading = false;
  errorMessage = '';
  
  ngOnInit(): void {

    this.listeCategorie();

  }

  listeCategorie():void {
    this.loading = true;
    this.loading = true;
    this.errorMessage = '';

    this.categorieService.getCategories().subscribe({
      next: (data: any) => {
        console.log('liste categorie:', data);
        this.categories.set(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement catégories :', err);
        this.errorMessage = err.error?.message ?? 'Impossible de charger les catégories.';
        this.loading = false;
      }
    });
  }


modifierCategorie(id: number): void {
  this.router.navigate(['/admin/edit-categorie', id]);
}

supprimerCategorie(id: number): void {
  const confirmation = confirm(
    'Voulez-vous vraiment supprimer cette catégorie ?'
  );

  if (!confirmation) {
    return;
  }

  this.categorieService.deleteCategory(id).subscribe({
    next: () => {
      alert('Catégorie supprimée avec succès.');
      this.listeCategorie();
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
