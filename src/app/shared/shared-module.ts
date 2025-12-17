import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductCard } from './product-card/product-card';
import { Spinner } from './components/spinner/spinner';
import { ThankYouComponent } from '../features/product-details/Thank-you/thank-you.component';
import { AboutUs } from './components/about-us/about-us';
import { Review } from './components/review/review';
import { TwoImages } from './components/two-images/two-images';


@NgModule({
  declarations: [ProductCard, Spinner, ThankYouComponent,AboutUs, Review, TwoImages],
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
    ThankYouComponent,
    AboutUs,
    Review,
    TwoImages
  ]
})
export class SharedModule { }
