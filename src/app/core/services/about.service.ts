import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  getAboutData(): Observable<any> {
    return of({
      header: {
        subtitle: 'WHO WE ARE',
        title: 'About Our Brand'
      },
      badge: 'Trusted by 10k+ Happy Customers',
      sectionTitle: 'Crafted with Purpose',
      description: [
        'We believe great products are created at the intersection of design, quality, and functionality. Every item we offer is carefully curated to bring timeless style and lasting value into your everyday life.',
      ],
      stats: [
        { value: '500+', label: 'Products' },
        { value: '10k+', label: 'Happy Clients' },
        { value: '5', label: 'Average Rating' }
      ],
      image: '/about-us.png',
      cta: {
        label: 'Learn More About Us',
        link: '/about'
      }
    }).pipe(delay(600));
  }
}
