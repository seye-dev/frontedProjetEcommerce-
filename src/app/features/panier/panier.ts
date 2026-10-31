import { Component, inject } from '@angular/core';
import { Header } from '../../shared/header/header';
import { PanierService } from '../../core/service/panier';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Header, RouterLink ],
  selector: 'app-panier',
  styleUrl: './panier.css',
  templateUrl: './panier.html',
})
export class Panier {
  header={
    title1:"Panier",
    
  }

  panierService = inject(PanierService);

  message = '';

  diminuer(id: number, quantity: number): void {
    if (quantity <= 1) return;

    this.panierService.updateQuantity(id, quantity - 1);
  }

  augmenter(id: number, quantity: number): void {
    if (!this.panierService.updateQuantity(id, quantity + 1)) {
      this.message = 'Stock maximal atteint.';
      return;
    }

    this.message = '';
  }

  supprimer(id: number): void {
    this.panierService.supprimerProduit(id);
    this.message = 'Produit supprimé du panier.';
  }

  viderPanier(): void {
    this.panierService.viderPanier();
    this.message = '';
  }

  commander(): void {
    if (this.panierService.panier().length === 0) {
      this.message = 'Votre panier est vide.';
      return;
    }

    // La prochaine étape consistera à appeler l'API Laravel.
    this.message = 'Panier prêt pour la validation de commande.';
  }
  changerQuantity(id: number, event: Event): void {
  const input = event.target as HTMLInputElement;
  const quantite = input.valueAsNumber;

  // Vérifier que la quantité est valide
  if (!Number.isInteger(quantite) || quantite < 1) {
    return;
  }

  // Modifier la quantité dans le service
  this.panierService.updateQuantity(id, quantite);
}
}
