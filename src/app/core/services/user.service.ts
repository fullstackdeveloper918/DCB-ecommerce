import { Injectable } from '@angular/core';
import { User } from '../interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'currentUser';
  private _user: User | null = null;

  constructor() {
    const userStr = localStorage.getItem(this.storageKey);
    this._user = userStr ? JSON.parse(userStr) : null;
  }

  // Public getter for templates/components
  get user(): User | null {
    return this._user;
  }

  setUser(user: User): void {
    this._user = user;
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  clearUser(): void {
    this._user = null;
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return !!this._user;
  }
}

