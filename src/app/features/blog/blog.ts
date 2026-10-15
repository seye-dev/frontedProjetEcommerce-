import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { BlogItem } from '../../shared/blog-item/blog-item';

@Component({
  imports: [Header, BlogItem],
  selector: 'app-blog',
  styleUrl: './blog.css',
  templateUrl: './blog.html',
})
export class Blog {
  header={
    title1:"Blog",
    description:"  Découvrez nos produits et services de qualité. Nous proposons une large gamme de produits et services pour répondre à tous vos besoins. Parcourez notre boutique en ligne et profitez de nos offres exclusives.",
    imageUrl:"images/couch.png",
    btnText1:"Voir produits",
    btnUrl1:"/boutique",
    btnText2:"Services",
    btnUrl2:"/service"
  } 

  product1 = [
    {
      title:"First Time Home Owner Ideas",
      description:"By Kristin Watson Dec 19, 2021",
      imageUrl:"images/post-1.jpg",
      linkUrl:"/blog-detail"
    },
    {
      title:"Kruzo Aero Chair",
      description:"By Kristin Watson Dec 19, 2021",
      imageUrl:"images/post-2.jpg",
      linkUrl:"/blog-detail"
    },
    {
      title:"Ergonomic Chair",
      description:"By Kristin Watson Dec 19, 2021",
      imageUrl:"images/post-3.jpg",
      linkUrl:"/blog-detail"
    }
  ];

   product2 = [
    {
      title:"First Time Home Owner Ideas",
      description:"By Kristin Watson Dec 19, 2021",
      imageUrl:"images/post-1.jpg",
      linkUrl:"/blog-detail"
    },
    {
      title:"Kruzo Aero Chair",
      description:"By Kristin Watson Dec 19, 2021",
      imageUrl:"images/post-2.jpg",
      linkUrl:"/blog-detail"
    },
    {
      title:"Ergonomic Chair",
      description:"By Kristin Watson Dec 19, 2021",
      imageUrl:"images/post-3.jpg",
      linkUrl:"/blog-detail"
    }
  
  ];
  
}
