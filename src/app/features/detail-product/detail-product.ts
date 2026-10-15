import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';

@Component({
  imports: [Header],
  selector: 'app-detail-product',
  styleUrl: './detail-product.css',
  templateUrl: './detail-product.html',
})
export class DetailProduct {
  header={
    title1:"Blog",
    description:"  Découvrez nos produits et services de qualité. Nous proposons une large gamme de produits et services pour répondre à tous vos besoins. Parcourez notre boutique en ligne et profitez de nos offres exclusives.",
    imageUrl:"images/post-1.jpg",
    btnText1:"Voir produits",
    btnUrl1:"/boutique",
    btnText2:"ajouter au panier",
    btnUrl2:"/panier"
  }
}
