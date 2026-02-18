import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo : "all-products", 
        pathMatch: "full"
      },
      {
        path : 'all-products',
        loadChildren: () => import('./all-products/all-products-routing-module').then((m)=>m.AllProductsRoutingModule)
      },
      {
        path : 'product/:id',
        loadChildren: () => import('./product-details/product-details-module').then((m)=>m.ProductDetailsModule)
      }, 
      {
        path : 'cart',
        loadChildren : () => import('./cart/cart-module').then((m)=>m.CartModule)
      },
      {
        path : 'checkout',
        loadChildren : () => import('./checkout/checkout-module').then((m)=>m.CheckoutModule)
      },
      {
        path : 'liked-products',
        loadChildren : () => import('./liked-products/liked-products-module').then((m)=> m.LikedProductsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
