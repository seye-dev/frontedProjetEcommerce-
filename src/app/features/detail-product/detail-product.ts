import { Component, inject, signal } from '@angular/core';
import { Header } from '../../shared/header/header';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/service/product-service';
import { Product } from '../../core/model/modelProduct';
import { PanierService } from '../../core/service/panier';

@Component({
  imports: [Header],
  selector: 'app-detail-product',
  styleUrl: './detail-product.css',
  templateUrl: './detail-product.html',
})
export class DetailProduct {

  header={
    title1:"Deatail produit",
    
  }

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private panierService = inject(PanierService);

  product = signal<Product|null>(null);
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.errorMessage = 'Identifiant de produit invalide.';
      this.loading = false;
      return;
    }

    this.productService.getProduct(id).subscribe({
      next: (response) => {
        //stocker le produit dans le singal product
        this.product.set(response.product);

        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur détail produit :', err);
        this.errorMessage =
          'Impossible de trouver ce produit.';
        this.loading = false;
      }
    });
  }


//gestion des paniers
messagePanier = '';
ajouterAuPanier(produit: any): void {
  const resultat = this.panierService.ajouterProduit(produit);

  this.messagePanier = resultat
    ? `${produit.name} ajouté au panier !`
    : 'Stock insuffisant ou quantité invalide.';
}





}
