import { Component } from '@angular/core';
import { AdminNav } from '../admin-nav/admin-nav';
import { AdminFooter } from '../admin-footer/admin-footer';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [AdminNav, RouterOutlet, AdminFooter],
  selector: 'app-main-admin',
  styleUrl: './main-admin.css',
  templateUrl: './main-admin.html',
})
export class MainAdmin {}
