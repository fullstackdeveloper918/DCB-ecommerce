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
        loadChildren: () =>
        import('./home/home-module').then((m) => m.HomeModule)
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
