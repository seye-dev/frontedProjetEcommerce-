import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';

@Component({
  imports: [Header],
  selector: 'app-panier',
  styleUrl: './panier.css',
  templateUrl: './panier.html',
})
export class Panier {
  header={
    title1:"Panier",
    
  }
}
