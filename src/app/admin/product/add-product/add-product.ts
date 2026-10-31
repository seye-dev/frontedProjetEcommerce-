import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../core/service/product-service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-add-product',
  styleUrl: './add-product.css',
  templateUrl: './add-product.html',
})
export class AddProduct {
  loading = false;
  successMessage = '';
  errorMessage = '';

  /*formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    slug: new FormControl('', [Validators.required]),
    desription: new FormControl(''),
    price: new FormControl<number|null>(null, [Validators.required, Validators.min(0)]),
    stock: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    image: new FormControl('', [Validators.required]),
  });*/

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}
  private fb = inject(FormBuilder);
  imageFile: File | null = null;
  imagePreview: string | null = null;

  formGroup = this.fb.group({
    category_id: [null as number | null, [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: [''],
    price: [null as number | null, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    status: [true],
    image: [null],
  });

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.imageFile = file;

    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }

    this.imagePreview = file ? URL.createObjectURL(file) : null;
  }

  onSubmit(): void {
  this.successMessage = '';
  this.errorMessage = '';

  console.log('Clic sur le bouton Enregistrer');
  console.log('Formulaire valide :', this.formGroup.valid);
  console.log('Valeurs :', this.formGroup.getRawValue());

  if (this.formGroup.invalid) {
    this.formGroup.markAllAsTouched();
    this.errorMessage = 'Veuillez remplir correctement les champs obligatoires.';
    return;
  }

  const values = this.formGroup.getRawValue();
  const data = new FormData();

  data.append('name', values.name ?? '');
  data.append('category_id', String(values.category_id));
  data.append('description', values.description ?? '');
  data.append('price', String(values.price));
  data.append('stock', String(values.stock));

  // Si Laravel utilise une valeur par défaut pour status,
  // tu peux ne pas envoyer ce champ.
  if (this.imageFile) {
    data.append('image', this.imageFile);
  }

  this.loading = true;

  this.productService.createProduct(data).subscribe({
    next: (response: any) => {
      console.log('Réponse Laravel :', response);

      this.successMessage =
        response.message ?? 'Produit ajouté avec succès !';

      this.formGroup.reset({
        category_id: null,
        name: '',
        description: '',
        price: null,
        stock: 0,
        image: null
      });

      this.imageFile = null;

      if (this.imagePreview) {
        URL.revokeObjectURL(this.imagePreview);
        this.imagePreview = null;
      }

      this.loading = false;
    },

    error: (error: any) => {
      console.error('Erreur API :', error);

      this.loading = false;

      if (error.status === 422) {
        this.errorMessage =
          'Les données envoyées sont invalides. Vérifiez les champs.';
        console.error('Détails validation :', error.error?.errors);
      } else if (error.status === 401) {
        this.errorMessage =
          'Vous devez vous reconnecter pour ajouter un produit.';
      } else {
        this.errorMessage =
          error.error?.message ?? 'Impossible d’ajouter le produit.';
      }
    }
  });
}

  /* onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
    
   
   if (this.formGroup.invalid) {
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




    
  }*/
}
