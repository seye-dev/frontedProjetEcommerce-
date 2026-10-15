import { Component } from '@angular/core';
import { Nawbar } from '../nawbar/nawbar';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Nawbar, RouterOutlet, Footer],
  selector: 'app-main-client',
  styleUrl: './main-client.css',
  templateUrl: './main-client.html',
})
export class MainClient {}
