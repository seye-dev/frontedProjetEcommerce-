import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../core/service/product-service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-add-utilisateur',
  styleUrl: './add-utilisateur.css',
  templateUrl: './add-utilisateur.html',
})
export class AddUtilisateur {
    successMessage = '';
    errorMessage = '';

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    slug: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0 , [Validators.required, Validators.min(0)]),
    stock: new FormControl(0 , [Validators.required, Validators.min(0)]),
    image_url: new FormControl('', [Validators.required]),
  });
  constructor(private productService:ProductService, private router: Router){}
  addProduct(){
    this.successMessage = '';
    this.errorMessage = '';
  }
}
