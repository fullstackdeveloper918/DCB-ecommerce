import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikedProducts } from './liked-products/liked-products';

const routes: Routes = [
  {
    path : '',
    component : LikedProducts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LikedProductsRoutingModule { }
