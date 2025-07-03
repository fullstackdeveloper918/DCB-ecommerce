import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/products.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  productId!: number;

  constructor(private route: ActivatedRoute, private productService : ProductService) {
     this.productId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getProductById(this.productId)
    // Fetch product by ID here (call API or service)
  }

  // GET PRODUCT BY ID
  getProductById(productId:number){
    this.productService.getProductById(productId).subscribe((res:any)=>{
      console.log('res', res)
    })
    console.log('productid', productId)

  }
}
