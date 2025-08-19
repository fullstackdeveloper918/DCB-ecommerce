import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../core/services/products.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-liked-products',
  imports: [SharedModule],
  templateUrl: './liked-products.html',
  styleUrl: './liked-products.scss'
})
export class LikedProducts implements OnInit {
likedProducts!:any
subscription! : Subscription

constructor(
private productService : ProductService,
private userService : UserService){}

ngOnInit(): void {
this.getLikedProducts();
}

getLikedProducts() {
  const userId = this.userService?.user?.user_id;

  if (!userId) {
    console.warn("No userId found, cannot fetch liked products.");
    return;
  }

  this.subscription = this.productService.getLikedProducts(userId).subscribe((res: any) => {
    console.log('res', res);
  });
}
}
