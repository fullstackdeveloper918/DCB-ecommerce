import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/products.service';
import { SharedModule } from '../../../shared/shared-module';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [SharedModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  productId!: number;
  products:any
  isFavorite:any
  activeTab: string = 'detail';
  formData:any
  bulkForm!: FormGroup;
  submitting = false;
  submitSuccess = false;
  submitError = false;
  submitAttempted = false;
  productImages: string[] = [];

  selectTab(tab: string): void {
    this.activeTab = tab;
  }
  
  product :any = {
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

  constructor(
  private route: ActivatedRoute, 
  private productService : ProductService, 
  private userService : UserService,
  private location: Location,
  private fb :FormBuilder,
  private router : Router) 
  {
  this.productId = Number(this.route.snapshot.paramMap.get('id'));
  }

  
  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  addToCart() {
    // Implement cart logic here
  }


  ngOnInit() {
    // Subscribe to route params to detect changes when navigating between products
    this.route.params.subscribe(params => {
      this.productId = Number(params['id']);
      window.scrollTo(0, 0); // Scroll to top
      this.getProductById(this.productId);
    });

    this.bulkForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      company: [''],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{7,15}$')]],
      comments: [''],
      // If using reCAPTCHA you may add a control for token:
      // recaptchaToken: ['', Validators.required]
    });
    // Fetch product by ID here (call API or service)
  }

  // GET PRODUCT BY ID
  getProductById(productId:number){
    this.productService.getProductById(productId, this.userService?.user?.userRole).subscribe((res:any)=>{
      if(res){
      this.product = res;
      this.productImages = res.gallery_images || [];
      this.selectedImage = this.productImages[0];
      this.getRelatedProducts();
      }
    })
  }

  getRelatedProducts(){
     this.productService.getRelatedProducts(this.product.id).subscribe((res:any)=>{
      console.log('res', res)
      if(res){
      this.products = res.products;
      console.log('Related Products:', this.products);
      }     
    });
  }

  // productImages: string[] = [
  // 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600',
  // 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
  // 'https://images.pexels.com/photos/821749/pexels-photo-821749.jpeg',
  // ];

selectedImage: any = this.productImages[0];

selectImage(img: any) {
  this.selectedImage = img;
}

nextImage() {
  const index = this.productImages.indexOf(this.selectedImage);
  this.selectedImage = this.productImages[(index + 1) % this.productImages.length];
}

prevImage() {
  const index = this.productImages.indexOf(this.selectedImage);
  this.selectedImage =
    this.productImages[
      (index - 1 + this.productImages.length) % this.productImages.length
    ];
}

getStarArray(rating: number): string[] {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }
  
  if (hasHalfStar) {
    stars.push('half');
  }
  
  while (stars.length < 5) {
    stars.push('empty');
  }
  
  return stars;
}

formatDescription(description: string): string {
  if (!description) return '';
  // Replace \r\n with <br> tags for line breaks
  return description.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
}

goBack(){
  this.location.back();
}

toggleFavorite(){

}


onSubmit(){
      this.submitAttempted = true;
      if (this.bulkForm.invalid) {
        this.bulkForm.markAllAsTouched();
        this.bulkForm.updateValueAndValidity();
        this.submitting = false;
        this.submitError = false;
        return;
      }
      
      this.submitting = true;
      this.submitError = false;

      // Prepare API payload
      const payload = {
        name: this.bulkForm.value.name,
        email: this.bulkForm.value.email,
        phone: this.bulkForm.value.phone,
        company: this.bulkForm.value.company || '',
        products: [
          {
            product_name: this.product.name,
            quantity: this.bulkForm.value.quantity
          }
        ],
        message: this.bulkForm.value.comments || ''
      };

      // Call API
      this.productService.submitBulkOrder(payload).subscribe({
        next: (response:any) => {
          if(response.success == true){
          this.submitting = false;
          this.submitError = false;
          this.bulkForm.reset();
          this.submitAttempted = false;
          this.router.navigate(['/home/product/' + this.productId + '/thank-you']);
          }
        },
        error: (error) => {
          console.error('Bulk order submission error:', error);
          this.submitting = false;
          this.submitError = true;
        }
      });
  }


}
