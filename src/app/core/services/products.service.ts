import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { apiRoutes } from '../utils/api.routes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private apiService : ApiService){}

  getProducts(): any {
    return this.apiService.get(apiRoutes.products);
  }

  // GET PRODUCT BY ID
  getProductById(productId: number) {
    return this.apiService.get(`${apiRoutes.products}/${productId}`);
  }
}
