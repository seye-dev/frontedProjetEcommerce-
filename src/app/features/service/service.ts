import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';

@Component({
  imports: [Header],
  selector: 'app-service',
  styleUrl: './service.css',
  templateUrl: './service.html',
})
export class Service {
  header={
    title1:"Services",
    description:"Découvrez nos services de qualité. Nous proposons une large gamme de services pour répondre à tous vos besoins. Parcourez notre boutique en ligne et profitez de nos offres exclusives.",
    imageUrl:"images/couch.png",
    btnText1:"Voir produits",
    btnUrl1:"/boutique",
    btnText2:"Services",
    btnUrl2:"/service"
  }
}
