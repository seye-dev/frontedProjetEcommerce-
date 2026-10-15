import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nawbar } from './layout/nawbar/nawbar';
import { Footer } from './layout/footer/footer';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontendEcommerce');
}
