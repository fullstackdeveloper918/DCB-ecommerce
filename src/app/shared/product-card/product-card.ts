import { Component, Input } from '@angular/core';
import { ProductService } from '../../core/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { messages } from '../../core/utils/message';
import { Auth } from '../../core/services/auth';
import { GuestCartService } from '../../core/services/guest-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  standalone : false
})
export class ProductCard {
  @Input() product!: any;
  
  constructor(
  private productService : ProductService, 
  private toastr : ToastrService ,
  private auth : Auth,
  private guestCart : GuestCartService
  ){}

// addToCart(productId: number) {
//   const quantity = 1;
//   let payload: any = {
//     product_id: productId,
//     quantity,
//   };

//   if (this.auth.isLoggedIn()) {
//     payload.user_id = this.auth.getUserId(); 
//   } else {
//     payload.guest_id = this.guestCart.getGuestId();
//   }

//   this.productService.addToCart(payload).subscribe((res: any) => {
//     if (res) {
//       console.log('res', res)
//       this.toastr.success(messages.toastrSuccessMessage);
//     }
//   });

// }

likeProduct(productID:any){
  // this.productService.likeProduct(productID)
}
}
