import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerReviewService {

  getCustomerReviews(): Observable<any[]> {
    return of([
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&fit=crop',
        rating: 5,
        review:
          'The hoodie is incredibly soft and warm. The fabric feels premium, and the fit is perfect for everyday wear. Definitely one of my favorite purchases!',
        author: 'Alex Johnson',
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&fit=crop',
        rating: 5,
        review:
          'These sneakers are stylish, lightweight, and extremely comfortable. I’ve been wearing them daily and they still look brand new.',
        author: 'Sophia Miller',
      },
      {
        id: 3,
image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&fit=crop',
        rating: 5,
        review:
          'I love this purse! It’s elegant, spacious, and matches perfectly with both casual and formal outfits. The quality is outstanding.',
        author: 'Emily Carter',
      }
    ]).pipe(delay(700)); // simulate API call
  }
}
