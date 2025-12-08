import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductCard } from './product-card/product-card';
import { Spinner } from './components/spinner/spinner';



@NgModule({
  declarations: [ProductCard, Spinner],
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
    FormsModule
  ]
})
export class SharedModule { }
