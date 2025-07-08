import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/products.service';
import { ProductCard } from "../../../shared/product-card/product-card";
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-home',
  imports: [SharedModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
 products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res:any)=>{
      this.products = res
    });
  }
}
