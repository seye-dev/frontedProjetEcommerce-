import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';

@Component({
  imports: [Header],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
   header={
    title1:"Contactez-nous",
    title2:"",
    description:"Contactez notre équipe d'assistance pour toute question ou demande d'information.",
    imageUrl:"images/couch.png",
    btnText1:"Voir produits",
    btnUrl1:"/boutique",
    btnText2:"Services",
    btnUrl2:"/service"
  }
}
