import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  title1 =input<string>();
  title2 =input<string>();
  description = input<string>();
  imageUrl = input<string>();
  btnText1 = input<string>();
  btnUrl1 = input<string>();
  btnText2 = input<string>();
  btnUrl2 = input<string>();
}
