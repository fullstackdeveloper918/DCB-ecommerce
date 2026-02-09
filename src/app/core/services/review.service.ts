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
        image: '/Grey hoodie.jpeg',
        rating: 5,
        review:
          'The hoodie is incredibly soft and warm. The fabric feels premium, and the fit is perfect for everyday wear. Definitely one of my favorite purchases!',
        author: 'Alex Johnson',
        authorImage: 'https://www.gravatar.com/avatar/?d=mp'
      },
      {
        id: 2,
        image: '/Light pink pink hat.jpeg',
        rating: 5,
        review:
          'This cap is comfortable, fits perfectly, and looks great with every outfit. The material is high quality and it keeps its shape even after daily use. Highly recommended!',
        author: 'Sophia Miller',
        authorImage: 'https://www.gravatar.com/avatar/?d=mp'
      },
      {
        id: 3,
        image: '/White Polo.jpeg',
        rating: 5,
        review:
          'This t-shirt is soft, comfortable, and fits perfectly. The fabric feels premium and the design is stylish. It’s great for both casual and active wear. Highly recommended!',
        author: 'Emily Carter',
        authorImage: 'https://www.gravatar.com/avatar/?d=mp'
      }
    ]).pipe(delay(700)); // simulate API call
  }
}
