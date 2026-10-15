import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';

@Component({
  imports: [Header],
  selector: 'app-detail-blog',
  styleUrl: './detail-blog.css',
  templateUrl: './detail-blog.html',
})
export class DetailBlog {
  header={
    title1:"Blog",
    description:"  Découvrez nos produits et services de qualité. Nous proposons une large gamme de produits et services pour répondre à tous vos besoins. Parcourez notre boutique en ligne et profitez de nos offres exclusives.",
    imageUrl:"images/post-1.jpg",
    btnText1:"Retour au blog",
    btnUrl1:"/blog",
    btnText2:"ajouter au panier",
    btnUrl2:"/panier"
  }
}
