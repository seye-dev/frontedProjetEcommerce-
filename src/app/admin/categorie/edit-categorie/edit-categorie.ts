import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../../../core/service/categorie';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-edit-categorie',
  styleUrl: './edit-categorie.css',
  templateUrl: './edit-categorie.html',
})
export class EditCategorie {
  loading = false;
  errorMessage = '';
  successMessage = '';
  id!: number;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categorieService = inject(Categorie);

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    slug: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
       console.log('ID reçu dans la route :', idParam);
       this.id = Number(idParam);
       
    if (!this.id || Number.isNaN(this.id)) {
      this.errorMessage = 'Identifiant de catégorie invalide.';
      return;
    }

    this.chargerCategorie();
  }

  chargerCategorie(): void {
    //this.loading = true;

    this.categorieService.getCategory(this.id).subscribe({
      next: (response: any) => {
        console.log('Catégorie récupérée :', response);

        // Adapte cette extraction à la réponse réelle de Laravel.
        const categorie = response.category ?? response.data ?? response;
        console.log('Catégorie extraite :', categorie);

        if (!categorie?.id) {
          this.errorMessage = 'Catégorie introuvable.';
          this.loading = false;
          return;
        }

        this.formGroup.patchValue({
          name: categorie.name ?? '',
          slug: categorie.slug ?? '',
        });

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message ?? 'Impossible de charger la catégorie.';
        this.loading = false;
      },
    });
  }

  enregistrer(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.formGroup.invalid || this.loading) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.categorieService.updateCategory(this.id, this.formGroup.getRawValue()).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.successMessage = response.message ?? 'Catégorie modifiée avec succès.';

        this.router.navigate(['/admin/list-categorie']);
      },
      error: (err) => {
        console.error('Erreur modification :', err);
        this.errorMessage = err.error?.message ?? 'La modification a échoué.';
        this.loading = false;
      },
    });
  }


}
