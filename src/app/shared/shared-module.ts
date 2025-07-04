import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductCard } from './product-card/product-card';



@NgModule({
  declarations: [ProductCard],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports : [
    ReactiveFormsModule,
    RouterModule,
    ProductCard,
    CommonModule
  ]
})
export class SharedModule { }
