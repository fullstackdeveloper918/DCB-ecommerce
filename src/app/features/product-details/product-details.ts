import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/products.service';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-product-details',
  imports: [SharedModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  productId!: number;
  products:any
  
  product = {
    image: 'https://via.placeholder.com/400',
    name: "Manttu Women's Solid Slim Fit Classic Round Neck Cotton Fabric T-Shirt",
    ratings: 992,
    discountedPrice: 664.00,
    originalPrice: 2999.00,
    discount: 78,
    sku: 'WH12',
    visitors: 56,
    timeRemaining: '453 Days 20:1:8',
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry...',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#ADD8E6', '#98FB98', '#F0E68C', '#DDA0DD'],
    selectedSize: '',
    selectedColor: ''
  };

  relatedProducts = [
    { image: 'https://via.placeholder.com/150', name: 'T-Shirt', description: 'Cotton fabric', price: 120 },
    { image: 'https://via.placeholder.com/150', name: 'Shoes', description: 'Special sport shoes', price: 55 },
    { image: 'https://via.placeholder.com/150', name: 'Watch', description: 'Smart watch', price: 200 },
    { image: 'https://via.placeholder.com/150', name: 'Bag', description: 'Leather purse', price: 90 }
  ];

  selectedSize: string = '';
  selectedColor: string = '';

  constructor(private route: ActivatedRoute, private productService : ProductService) {
     this.productId = Number(this.route.snapshot.paramMap.get('id'));
  }


  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  addToCart() {
    console.log('Added to cart:', this.product);
    // Implement cart logic here
  }

  ngOnInit() {
    this.getProductById(this.productId)
       console.log('home workd')
    this.productService.getProducts().subscribe((res:any)=>{
      this.products = res
      console.log('products', res)
    });
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
