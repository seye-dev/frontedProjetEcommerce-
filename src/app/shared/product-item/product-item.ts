import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-product-item',
  styleUrl: './product-item.css',
  templateUrl: './product-item.html',
})
export class ProductItem {

  title =input<string>();
  price = input<string>();
  imageUrl = input<string>();
  linkUrl = input<string>();

}
