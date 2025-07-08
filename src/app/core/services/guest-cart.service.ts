import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GuestCartService {
  private readonly GUEST_ID_KEY = 'guest_id';


  constructor(private localStorage: LocalStorageService) {}

  getGuestId(): string {
    let guestId = this.localStorage.get<string>(this.GUEST_ID_KEY);
    if (!guestId) {
      guestId = uuidv4();
      this.localStorage.set(this.GUEST_ID_KEY, guestId);
    }
    return guestId;
  }



  clearGuestId(): void {
    this.localStorage.remove(this.GUEST_ID_KEY);
  }
}
