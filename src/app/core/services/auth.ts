import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly USER_KEY = 'currentUser';

  constructor(private localStorage: LocalStorageService, private router : Router) {}

  isLoggedIn(): boolean {
    return this.localStorage.exists(this.USER_KEY);
  }

  getUserId(): number | null {
    const user = this.localStorage.get<{ id: number }>(this.USER_KEY);
    return user?.id ?? null;
  }

  setUserData(user: any): void {
    this.localStorage.set(this.USER_KEY, user);
  }

  clearUser(): void {
    this.localStorage.remove(this.USER_KEY);
  }

  logout(): void{
    this.localStorage.remove(this.USER_KEY)
    this.router.navigate(['/auth'])
  }
}
