
import { Injectable, signal, computed } from '@angular/core';

export interface Panier {
  id: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})

export class PanierService {

  private readonly storageKey = 'lunea_cart';

  private lirePanier(): Panier[] {
    try {
      const donnees = localStorage.getItem(this.storageKey);
      return donnees ? JSON.parse(donnees) as Panier[] : [];
    } catch {
      return [];
    }
  }

  panier = signal<Panier[]>(this.lirePanier());

  panierCount = computed(() =>
    this.panier().reduce((total, item) => total + item.quantity, 0)
  );
// prix total selon la quantite choisi pour chaque produit
  sousTotal = computed(() =>
    this.panier().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );
  fraisLivraison = computed(() =>
  this.panier().length === 0 ? 0 : 0
);

// Total final à payer
total = computed(() =>
  this.sousTotal() + this.fraisLivraison()
);

  private sauvegarder(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.panier()));
  }
 private chargerPanier(): Panier[] {
    try {
      if (typeof localStorage === 'undefined') return [];

      const saved = localStorage.getItem(this.storageKey);
      if (!saved) return [];

      const data: unknown = JSON.parse(saved);

      if (!Array.isArray(data)) return [];

      return data.filter((item: any) =>
        Number.isInteger(item.productId) &&
        Number.isFinite(item.price) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      ) as Panier[];
    } catch {
      return [];
    }
  }
  
  ajouterProduit(produit: {
    id: number;
    name: string;
    price: number;
    image?: string | null;
    image_url?: string | null;
    stock: number;
  }, quantity = 1): boolean {
    if (
      !Number.isInteger(produit.id) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      !Number.isFinite(Number(produit.price)) ||
      Number(produit.price) < 0
    ) {
      return false;
    }

    const panier = this.panier();
    const existant = panier.find(item => item.id === produit.id);
    const quantiteActuelle = existant?.quantity ?? 0;

    if (quantiteActuelle + quantity > produit.stock) {
      return false;
    }

    const image = produit.image_url ?? produit.image ?? null;

    if (existant) {
      this.panier.update(items =>
        items.map(item =>
          item.id === produit.id
            ? { ...item, quantity: item.quantity + quantity, image }
            : item
        )
      );
    } else {
      this.panier.update(items => [
        ...items,
        {
          id: produit.id,
          name: produit.name,
          price: Number(produit.price),
          image,
          quantity: quantity,
          stock: produit.stock
        }
      ]);
    }

    this.sauvegarder();
    return true;
  }
   private saveapanier(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.panier()));
    }
  }
  // Modifier la quantité
  updateQuantity(productId: number, quantity: number): boolean {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return false;
    }

    const panier = this.panier().find(
      produit => produit.id === productId
    );

    if (!panier || quantity > panier.stock) return false;

    this.panier.update(panier =>
      panier.map(produit =>
        produit.id === productId
          ? { ...produit, quantity }
          : produit
      )
    );

    this.saveapanier();
    return true;
  }
    // Augmenter la quantité
  augmenterQuantity(item: Panier): void {
    this.updateQuantity(item.id, item.quantity + 1);
  }
  // Diminuer la quantité
  diminuerQuantity(item: Panier): void {
    this.updateQuantity(item.id, item.quantity - 1);
  }
  supprimerProduit(id: number): void {
    this.panier.update(panier => panier.filter(item => item.id !== id));
    this.sauvegarder();
  }

  viderPanier(): void {
    this.panier.set([]);
    this.sauvegarder();
  }
}
