import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetails } from './product-details/product-details';
import { ThankYouComponent } from './Thank-you/thank-you.component';

const routes: Routes = [
  {
    path : '',
    component : ProductDetails
  },
  {
    path : 'thank-you',
    component : ThankYouComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailsRoutingModule { }
