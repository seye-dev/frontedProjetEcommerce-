import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Boutique } from './features/boutique/boutique';
import { Contact } from './features/contact/contact';
import { Login } from './features/login/login';
import { Panier } from './features/panier/panier';
import { Service } from './features/service/service';
import { DetailBlog } from './features/detail-blog/detail-blog';
import { DetailProduct } from './features/detail-product/detail-product';
import { Blog } from './features/blog/blog';
import { AddCategorie } from './admin/categorie/add-categorie/add-categorie';
import { authGuard } from './core/service/auth/auth-gard';
import { Dasbar } from './admin/dasbar/dasbar';
import { ListProduct } from './admin/product/list-product/list-product';
import { ListCategorie } from './admin/categorie/list-categorie/list-categorie';
import { AddProduct } from './admin/product/add-product/add-product';
import { AddUtilisateur } from './admin/utilisateur/add-utilisateur/add-utilisateur';
import { ProfilUtilisateur } from './admin/utilisateur/profil-utilisateur/profil-utilisateur';
import { MainClient } from './layout/main-client/main-client';
import { MainAdmin } from './layout/main-admin/main-admin';
import { ListUtilisateur } from './admin/utilisateur/list-utilisateur/list-utilisateur';
import { EditCategorie } from './admin/categorie/edit-categorie/edit-categorie';

export const routes: Routes = [

    // main route public
    { 
        path:'',
        component:MainClient,
        children:[
            {
        path: '',
        component: Home
        },
        {
            path: 'boutique',
            component: Boutique
        },
        {
            path: 'contact',
            component: Contact
        },
        {
            path: 'service',
            component: Service
        },
        {
            path: 'login',
            component: Login
        },
        {
            path: 'panier',
            component: Panier
        },
        {
            path: 'blog',
            component: Blog
            
        },
        {
            path: 'detail-blog',
            component: DetailBlog
        },
        {
            path: 'detail-product',
            component: DetailProduct,
        }

        ]

    },
    
    
    //partie admin

    {
        path:'admin',
        component:MainAdmin,
        children:[
            {
            path:'addcategorie',
            component:AddCategorie
    
            },
            {
                path:'list-categorie',
                component:ListCategorie
                
            },
            {
                path:'edit-categorie',
                component:EditCategorie
                
            },
            {
                path:'ajout-produit',
                component:AddProduct
                
            },
            {
                path:'list-produit',
                component:ListProduct
            },
            {
                path:'utilisateur',
                component:AddUtilisateur
                
            },
            {
                path:'list-utilisateur',
                component:ListUtilisateur
                
            },
            {
                path:'profil',
                component:ProfilUtilisateur,
                canActivate:[authGuard]
            },
            {
                path:'dasbord',
                component:Dasbar
            },

        ]
    },

    {
    path: '**',
    redirectTo: ''
  }
];
