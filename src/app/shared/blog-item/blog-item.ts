import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-blog-item',
  styleUrl: './blog-item.css',
  templateUrl: './blog-item.html',
})
export class BlogItem {
   title =input<string>();
  description = input<string>();
  imageUrl = input<string>();
  linkUrl = input<string>();
  
}
