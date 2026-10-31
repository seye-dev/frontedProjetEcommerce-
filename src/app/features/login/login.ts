import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth/auth-service';


@Component({
  imports: [ReactiveFormsModule, FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  email = '';
  password = '';

  errorMessage = '';
  
  
  formGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
  });

// appeler le service Auth pour dans le constructeur
constructor(private authService:AuthService, private router: Router){}


login(): void {

    this.errorMessage = '';
    console.log(this.formGroup.value);
    this.authService.login(this.formGroup.value)
    .subscribe({

      next: (response) => {

        console.log('Utilisateur connecté :', response.user);
        console.log('Token :', response.token);

        this.router.navigate(['/admin/dasbord']);
      },
       error: (error) => {

        console.error(error);

        this.errorMessage =
          error.error?.errors?.email?.[0] ??
          error.error?.error ??
          error.error?.message ??
          'Erreur de connexion';
      }

    });
  }

 /* onSubmit() {
// verification du formulaire
    if (this.formGroup.invalid) {

      // Faire apparaître les erreurs
      this.formGroup.markAllAsTouched();

      return;
    }

        //  Récupérer les valeurs
    const email = this.formGroup.controls.email.value;
    const password = this.formGroup.controls.password.value;

    console.log('EMAIL envoyé :', email);
console.log('PASSWORD envoyé :', password);

    // 3. Appeler Laravel
    this.authService.login(email!, password!).subscribe({

      next: (response) => {

        console.log('Connexion réussie');
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
 
        //redirection vers le  dasbord
      },

      error: (error) => {

        this.loginError = error.error?.message ??
        'Email ou mot de passe incorrect';

        console.log('Erreur de connexion');
        console.log(error);

      }

    });


   
   //console.log(this.formGroup.value);
  } */



}
