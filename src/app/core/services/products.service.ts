import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { apiRoutes } from '../utils/api.routes';
import { Auth } from './auth';
import { GuestCartService } from './guest-cart.service';
import { buildHttpParams } from '../utils/http-params.util';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/Product.interface';
import { buildParams } from '../utils/helper';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(
  private apiService : ApiService,
  private auth : Auth,
  private guestCart : GuestCartService){}

  getProducts(userRole?: string, searchValue?: string, sort?: string, category?: string): Observable<Product[]> {
    return this.apiService.get<Product[]>(
      apiRoutes.products,
      buildParams(userRole, searchValue, sort, category)
    );
  }

  // GET RELATED PRODUCTS
  getRelatedProducts(productId: number): Observable<Product[]> {
    const params = buildHttpParams({
      product_id: productId,
    });
    return this.apiService.get<Product[]>(apiRoutes.relatedProducts, params);
  } 

  // 🔹 Get product by ID
  getProductById(productId: number, userRole?: string): Observable<Product> {
    return this.apiService.get<Product>(
      `${apiRoutes.products}/${productId}`,
      buildParams(userRole)
    );
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

// GET LIKED PRODUCTS
getLikedProducts(userId: string) {
  const params = buildHttpParams({ user_id: userId });
  return this.apiService.get(`${apiRoutes.getLikedProducts}`, params);
}

// LIKE THE PRODUCTS
likeProduct(productId:number){
  console.log('productId', productId)
  // return this.apiService.
}

// SUBMIT BULK ORDER
submitBulkOrder(payload: any) {
  return this.apiService.post(apiRoutes.bulkOrderEmail, payload);
}

}
