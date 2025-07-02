import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/products.service';
import { ProductCard } from "../../../shared/product-card/product-card";

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
 products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log('home workd')
    this.products = this.productService.getProducts();
  }
}
