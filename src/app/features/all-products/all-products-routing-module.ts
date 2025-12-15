import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProducts } from './all-products';

const routes: Routes = [
  {
    path : '',
    component : AllProducts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllProductsRoutingModule { }
