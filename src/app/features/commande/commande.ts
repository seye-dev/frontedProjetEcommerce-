import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanierService } from '../../core/service/panier';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { API_URL } from '../../config/api.config';

@Component({
  imports: [ReactiveFormsModule, CommonModule, Header],
  selector: 'app-commande',
  styleUrl: './commande.css',
  templateUrl: './commande.html',
})
export class Commande {
  private apiUrl = API_URL;
   private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  panierService = inject(PanierService);

  chargement = false;
  messageErreur = '';

  formulaire = this.fb.group({
    nom_client: ['', Validators.required],
    telephone_client: ['', Validators.required],
    shipping_address: ['', Validators.required],
    modePaiement: ['livraison', Validators.required]
  });

  confirmerCommande(): void {
    if (this.panierService.panier().length === 0) {
      this.messageErreur = 'Votre panier est vide.';
      return;
    }

    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }

    const donnees = {
      ...this.formulaire.getRawValue(),
      items: this.panierService.panier().map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }))
    };

    this.chargement = true;
    this.messageErreur = '';

    this.http.post<any>(`${this.apiUrl}/ajoutOrders`, donnees).subscribe({
      next: (response:any) => {
        this.panierService.viderPanier();
        this.chargement = false;

        // À adapter à la réponse réelle de Laravel.
        this.router.navigate(['/mes-commandes']);
      },
      error: (erreur) => {
        this.chargement = false;
        this.messageErreur =
          erreur.error?.message ??
          'Impossible de confirmer la commande.';
      }
    });
  }


}
