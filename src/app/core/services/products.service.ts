import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { apiRoutes } from '../utils/api.routes';
import { Auth } from './auth';
import { GuestCartService } from './guest-cart.service';
import { buildHttpParams } from '../utils/http-params.util';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(
  private apiService : ApiService,
  private auth : Auth,
  private guestCart : GuestCartService){}

  getProducts(): any {
    return this.apiService.get(apiRoutes.products);
  }

  // GET PRODUCT BY ID
  getProductById(productId: number) {
    return this.apiService.get(`${apiRoutes.products}/${productId}`);
  }

  // ADD TO CART
  addToCart(payload :any){
    return this.apiService.post(apiRoutes.addToCart, payload)
  }

  // GET CART PRODUCTS
getCartProducts() {
  let queryParams: any = {};

  if (this.auth.isLoggedIn()) {
    const userId = this.auth.getUserId();
    if (userId) {
      queryParams.user_id = userId;
    }
  } else {
    queryParams.guest_id = this.guestCart.getGuestId();
  }

  const params = buildHttpParams(queryParams);
  return this.apiService.get(`${apiRoutes.getCart}`, params );
}


}
