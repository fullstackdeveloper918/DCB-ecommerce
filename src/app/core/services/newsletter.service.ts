import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  subscribe(email: string): Observable<{success: boolean, message: string}> {
    // Simulate API call with delay
    return of({
      success: true,
      message: 'Thank you for contacting us!'
    }).pipe(delay(1000));
  }
}
