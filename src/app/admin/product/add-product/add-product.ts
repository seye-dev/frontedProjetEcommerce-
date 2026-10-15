import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../core/service/product-service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-add-product',
  styleUrl: './add-product.css',
  templateUrl: './add-product.html',
})
export class AddProduct {


   loading = false;
  successMessage = '';
  errorMessage = '';


  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    slug: new FormControl('', [Validators.required]),
    desription: new FormControl(''),
    price: new FormControl<number|null>(null, [Validators.required, Validators.min(0)]),
    stock: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    image: new FormControl('', [Validators.required]),
  });

  constructor(private productService:ProductService, private router: Router){}

  

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

    this.productService.createProduct(data).subscribe({
      next: (response) => {
        console.log('Réponse Laravel :', response);

        this.successMessage = 'Le produit ajoutée avec succès !';
        this.formGroup.reset();
        this.loading = false;

        // Redirection après une création réussie
        this.router.navigate(['/admin/list-product']);
      },
       error: (err) => {
        console.error('Erreur API :', err);

        this.errorMessage =
          err.error?.message ??
          'Impossible d’ajouter le produit.';

        this.loading = false;
      }
    });




    
  }






}
