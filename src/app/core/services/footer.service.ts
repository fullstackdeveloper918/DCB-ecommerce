import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  getFooterData(): Observable<any> {
    return of({
      storeInfo: {
        address: `11U, 175 Lower Gibbes Street
Chatswood 2067
Australia`,
        phone: '+61 2 8399 3333',
        email: 'info@dcb.com.au',
        socials: [
          {
            icon: 'fab fa-instagram',
            link: 'https://www.instagram.com/dcb.com.au/'
          },
          {
            icon: 'fab fa-linkedin-in',
            link: 'https://au.linkedin.com/in/david-campbell-1681b015'
          },
          {
            icon: 'fas fa-envelope',
            link: 'mailto:info@dcb.com.au',
            isEmail: true
          },
          {
            icon: 'fas fa-cube',
            link: 'https://diary.tradiesdiary.com/'
          }
        ]
      },
      newsletter: {
        title: "LET’S GET IN TOUCH"
      },
      copyright:
        'DCB David Campbell Building Pty Ltd. © 2024'
    }).pipe(delay(600)); // simulate API
  }
}
