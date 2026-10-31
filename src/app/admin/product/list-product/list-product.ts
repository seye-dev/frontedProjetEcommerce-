import { Component, inject, signal } from '@angular/core';
import { ProductService, ProduitLoad } from '../../../core/service/product-service';
import { Router } from '@angular/router';
import { Product } from '../../../core/model/modelProduct';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule,FormsModule],
  selector: 'app-list-product',
  styleUrl: './list-product.css',
  templateUrl: './list-product.html',
})
export class ListProduct {
  constructor(private productService: ProductService) {}
  private router = inject(Router);

  products = signal<Product[]>([]);

  loading = false;
  errorMessage = '';
  //part of stock product stock
  stockEnEdition: number | null = null;
  nouveauStock: number | null = null;
  stockLoadingId: number | null = null;

  messageStock = '';
  erreurStock = '';
  seuilStock = 10;

  ngOnInit(): void {
    this.listeProduct();
  }

  listeProduct(): void {
    this.loading = true;
    this.loading = true;
    this.errorMessage = '';

    this.productService.getProductAll().subscribe({
      next: (data: any) => {
        console.log('liste categorie:', data);
        this.products.set(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement produit :', err);
        this.errorMessage = err.error?.message ?? 'Impossible de charger les produits.';
        this.loading = false;
      },
    });
  }

  modifierCategorie(id: number): void {
    this.router.navigate(['/admin/edit-product', id]);
  }

  supprimerCategorie(id: number): void {
    const confirmation = confirm('Voulez-vous vraiment supprimer cette produit ?');

    if (!confirmation) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        alert('Produit supprimée avec succès.');
        this.listeProduct();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);

        this.errorMessage = err.error?.message ?? 'Impossible de supprimer cette produit.';
      },
    });
  }

  // get staatus of stock
  getStockStatus(stock: number): string {
    if (stock <= 3) return 'Rupture';
    if (stock <= this.seuilStock) return 'Stock faible';
    return 'Disponible';
  }
  modificationStock(product: Product): void {
    this.stockEnEdition = product.id;
    this.nouveauStock = product.stock;
    this.messageStock = '';
    this.erreurStock = '';
  }

  annulerModificationStock(): void {
    this.stockEnEdition = null;
    this.nouveauStock = null;
  }

  enregistrerStock(product: Product): void {
    this.messageStock = '';
    this.erreurStock = '';

    if (
      this.nouveauStock === null ||
      !Number.isInteger(Number(this.nouveauStock)) ||
      Number(this.nouveauStock) < 0
    ) {
      this.erreurStock = 'La quantité doit être un entier positif ou nul.';
      return;
    }

    this.stockLoadingId = product.id;

    this.productService.updateStock(product.id, Number(this.nouveauStock)).subscribe({
      next: (response) => {
        // Met à jour la quantité affichée immédiatement
        product.stock = Number(response.product.stock);
        this.products.set([...this.products()]);

        this.messageStock = response.message;
        this.stockEnEdition = null;
        this.nouveauStock = null;
        this.stockLoadingId = null;
      },
      error: (error) => {
        this.stockLoadingId = null;

        this.erreurStock = error.error?.message ?? 'Impossible de mettre à jour le stock.';

        console.error('Erreur mise à jour stock :', error);
      },
    });
  }


//pagination 

pageActuelle = 1;
produitsParPage = 5;

get nombrePages(): number {
  return Math.ceil(this.products().length / this.produitsParPage);
}

get produitsAffiches(): Product[] {
  const debut = (this.pageActuelle - 1) * this.produitsParPage;

  return this.products().slice(
    debut,
    debut + this.produitsParPage
  );
}

changerPage(page: number): void {
  if (page >= 1 && page <= this.nombrePages) {
    this.pageActuelle = page;
  }
}











}
