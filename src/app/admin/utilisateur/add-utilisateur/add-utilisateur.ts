import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { HttpClient } from '@angular/common/http';
import { UtilisateurService } from '../../../core/service/utilisateur';
//import { API_URL } from '../../../config/api.config';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-add-utilisateur',
  styleUrl: './add-utilisateur.css',
  templateUrl: './add-utilisateur.html',
})
export class AddUtilisateur {
  //  private http = inject(HttpClient);
    private router = inject(Router);
   // private apiUrl = API_URL;

  messageErreur = '';
  messageSucces = '';
  chargement = false;

  formGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators:[Validators.required]}),
    email: new FormControl('',{ nonNullable: true, validators:[Validators.required, Validators.email]}),
    password: new FormControl('',{ nonNullable: true, validators:[Validators.required, Validators.minLength(8)]}),
    password_confirmation: new FormControl('',{ nonNullable: true, validators:[Validators.required]}),
    role: new FormControl('client',{ nonNullable: true, validators:[Validators.required]}),
    phone: new FormControl('',{ nonNullable: true, validators:[Validators.required]}),
    adresse: new FormControl('',{ nonNullable: true, validators:[Validators.required]}),
   
   
  });
  constructor( private utilisateurService:UtilisateurService, ){}

   inscription() {

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const donnees = this.formGroup.getRawValue();

    this.messageErreur = '';
    this.messageSucces = '';

  // Vérification des mots de passe
    if (donnees.password !== donnees.password_confirmation) {
      this.messageErreur = 'Les mots de passe ne correspondent pas.';
      return;
    }
    console.log('Donnes envoyees:', donnees);
    this.chargement = true;


    this.utilisateurService.inscription(donnees).subscribe({

      next: (response) => {
        this.chargement = false;
        console.log("Reponse Laravel:", response);


        this.messageSucces = response.message || 'Utilisateur créé avec succès.';

        //console.log('Utilisateur créé :', response.user);

        this.formGroup.reset({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          role: 'client',
          phone: '',
          adresse: ''
        });


       this.router.navigate(['/admin/list-utilisateur']);
      },

     error: (erreur) => {
  this.chargement = false;

  console.log('Erreur complète :', erreur);
  console.log('Message Laravel :', erreur.error.message);
  console.log('Erreurs de validation :', erreur.error.errors);

  if (erreur.error?.errors) {
    this.messageErreur = Object.values(erreur.error.errors)
      .flat()
      .join(' ');
  } else {
    this.messageErreur = erreur.error?.message
      ?? 'Une erreur est survenue.';
  }
}
    });
  }
  
  
}
