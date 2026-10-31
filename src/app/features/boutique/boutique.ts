import { Component, inject, signal } from '@angular/core';
import { Header } from '../../shared/header/header';
import { ProductService } from '../../core/service/product-service';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../core/model/modelProduct';
import { PanierService } from '../../core/service/panier';

@Component({
  imports: [Header, RouterLink],
  selector: 'app-boutique',
  styleUrl: './boutique.css',
  templateUrl: './boutique.html',
})
export class Boutique {
  header={
    title1:"Boutique",
    description:"Découvrez nos produits et services de qualité.Nous proposons une large gamme de produits et services pour répondre à tous vos besoins. Parcourez notre boutique en ligne et profitez de nos offres exclusives.",
    imageUrl:"images/couch.png",
    btnText1:"Voir produits",
    btnUrl1:"/boutique",
    btnText2:"Services",
    btnUrl2:"/service"
  }
  // exposition des produits dans la boutique
  
  constructor(private productService: ProductService) {}
  private panierService = inject(PanierService);
  private router = inject(Router);
  products = signal<Product[]>([]);
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct():void{

    this.productService.getProductAll().subscribe({
      next: (response) => {
        this.products.set(response.products);
        console.log('Réponse de Laravel :', response);

        const liste = Array.isArray(response)
        ? response
        : response.products ?? [];

      this.products.set(liste);

      console.log('Nombre de produits :', this.products().length);
      console.log('Liste utilisée par Angular :', this.products());

        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement produit :', err);
        this.errorMessage = err.error?.message ?? 'Impossible de charger les produits.';
        this.loading = false;
      },
    });
  }

// partie gestion panier de commande

messagePanier = '';

ajouterAuPanier(produit: any): void {
  const resultat = this.panierService.ajouterProduit(produit);

  this.messagePanier = resultat
    ? `${produit.name} ajouté au panier !`
    : 'Stock insuffisant ou quantité invalide.';
}


}
