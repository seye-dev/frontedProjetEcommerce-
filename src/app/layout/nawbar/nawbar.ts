import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanierService } from '../../core/service/panier';

@Component({
  imports: [RouterLink],
  selector: 'app-nawbar',
  styleUrl: './nawbar.css',
  templateUrl: './nawbar.html',
})
export class Nawbar {
  private panierService = inject(PanierService);
}
