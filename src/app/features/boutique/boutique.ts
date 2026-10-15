import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';

@Component({
  imports: [Header],
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
}
