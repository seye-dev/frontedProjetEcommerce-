import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categorie } from '../../../core/service/categorie';
import { Router } from '@angular/router';

@Component({
  imports: [ ReactiveFormsModule],
  selector: 'app-add-categorie',
  styleUrl: './add-categorie.css',
  templateUrl: './add-categorie.html',
})
export class AddCategorie {

   loading = false;
  successMessage = '';
  errorMessage = '';


  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    slug: new FormControl('', [Validators.required]),
  });

  constructor(private categorieService:Categorie, private router: Router){}

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
    

    /*if (this.formGroup.invalid) {

      // Faire apparaître les erreurs
      this.formGroup.markAllAsTouched();

      return;
    }*/
   if (this.formGroup.invalid || this.loading) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.loading = true;

    const data = this.formGroup.getRawValue();

    this.categorieService.createCategory(data).subscribe({
      next: (response) => {
        console.log('Réponse Laravel :', response);

        this.successMessage = 'Catégorie ajoutée avec succès !';
        this.formGroup.reset();
        this.loading = false;

        // Redirection après une création réussie
        this.router.navigate(['/admin/list-categorie']);
      },
       error: (err) => {
        console.error('Erreur API :', err);

        this.errorMessage =
          err.error?.message ??
          'Impossible d’ajouter la catégorie.';

        this.loading = false;
      }
    });




    
  }


}
