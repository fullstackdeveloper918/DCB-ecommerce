import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductCard } from './product-card/product-card';
import { Spinner } from './components/spinner/spinner';
import { ThankYouComponent } from '../features/product-details/Thank-you/thank-you.component';


@NgModule({
  declarations: [ProductCard, Spinner, ThankYouComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports : [
    ReactiveFormsModule,
    RouterModule,
    ProductCard,
    CommonModule,
    Spinner,
    FormsModule,
    ThankYouComponent
  ]
})
export class SharedModule { }
