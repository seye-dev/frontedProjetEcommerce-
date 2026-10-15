import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { ProductItem } from '../../shared/product-item/product-item';
import { BlogItem } from '../../shared/blog-item/blog-item';

@Component({
  imports: [Header, ProductItem, BlogItem],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  header={
    title1:"Bienvenue",
    title2:"sur notre boutique en ligne",
    description:"Découvrez nos produits et services de qualité.Nous proposons une large gamme de produits et services pour répondre à tous vos besoins. Parcourez notre boutique en ligne et profitez de nos offres exclusives.",
    imageUrl:"images/couch.png",
    btnText1:"Voir produits",
    btnUrl1:"/boutique",
    btnText2:"Services",
    btnUrl2:"/service"
  } 

  product1 = [
    {
      title:"Nordic Chair",
      price:"$50.00",
      imageUrl:"images/product-1.png",
      linkUrl:"/detail-product"
    },
    {
      title:"Kruzo Aero Chair",
      price:"$78.00",
      imageUrl:"images/product-2.png",
      linkUrl:"/detail-product"
    },
    {
      title:"Ergonomic Chair",
      price:"$43.00",
      imageUrl:"images/product-3.png",
      linkUrl:"/detail-product"
    }
  ];

  product2 = [
    {
      title:"Nordic Chair",
      price:"$50.00",
      imageUrl:"images/product-1.png",
      linkUrl:"/detail-product"
    },
    {
      title:"Kruzo Aero Chair",
      price:"$78.00",
      imageUrl:"images/product-2.png",
      linkUrl:"/detail-product"
    },
    {
      title:"Ergonomic Chair",
      price:"$43.00",
      imageUrl:"images/product-3.png",
      linkUrl:"/detail-product"
    }
  ];

  blog = [
    {
      title:"First Time Home Owner Ideas",
      description:"By Kristin Watson Dec 19, 2021",
      imageUrl:"images/post-1.jpg",
      linkUrl:"/detail-blog"
    },
    {
      title:"Kruzo Aero Chair",
      description:"By Kristin Watson Dec 19, 2021",
      imageUrl:"images/post-2.jpg",
      linkUrl:"/detail-blog"
    },
    {
      title:"Ergonomic Chair",
      description:"By Kristin Watson Dec 19, 2021",
      imageUrl:"images/post-3.jpg",
      linkUrl:"/detail-blog"
    }
  ];

  
}
