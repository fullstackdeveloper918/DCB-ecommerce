import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwoImagesService {
   private featuredProducts = [
    {
      id: 1,
      title: 'Premium Hoodie Collection',
      subtitle: 'Sale Up To 25% Discount',
      discount: '25%',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1600&auto=format&fit=crop',
      category: 'hoodies',
      buttonText: 'SHOP HOODIES',
      position: 'left'
    },
    {
      id: 2,
      title: 'Stylish Sneaker Collection',
      subtitle: 'Sale Up To 30% Discount',
      discount: '30%',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop',
      category: 'shoes',
      buttonText: 'SHOP SNEAKERS',
      position: 'right'
    },
    {
      id: 3,
      title: 'Leather Wallet Collection',
      subtitle: 'Sale Up To 20% Discount',
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1600&auto=format&fit=crop',
      category: 'wallets',
      buttonText: 'SHOP WALLETS',
      position: 'left'
    },
    {
      id: 4,
      title: 'Casual T-Shirt Collection',
      subtitle: 'Sale Up To 15% Discount',
      discount: '15%',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1600&auto=format&fit=crop',
      category: 'tshirts',
      buttonText: 'SHOP TSHIRTS',
      position: 'right'
    }
  ];

  getFeaturedProducts(): Observable<any[]> {
    // Simulate API call with delay
    return of(this.featuredProducts).pipe(delay(300));
  }

  getRandomProducts(count: number = 2): Observable<any[]> {
    // Shuffle array and get random products
    const shuffled = [...this.featuredProducts].sort(() => 0.5 - Math.random());
    return of(shuffled.slice(0, count)).pipe(delay(300));
  }
}
