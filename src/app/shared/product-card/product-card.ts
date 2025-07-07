import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  standalone : false
})
export class ProductCard {
  @Input() product!: any;
  
  constructor(private productService : ProductService){}

  addToCart(productId:number){
    console.log('productid', productId)
    const payload = {
      product_id : productId,
      quantity : 1,
      user_id : 2
    }
    this.productService.addToCart(payload).subscribe((res:any)=>{
      console.log('res',res)
    })
  }

}
