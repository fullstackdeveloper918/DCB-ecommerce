import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared-module';
import { GuestCartService } from '../../core/services/guest-cart.service';
import { Cart } from '../../core/services/cart';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [SharedModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit{
 isMobileMenuOpen = false;
 cartCount: number = 0;

  constructor(private cartService : Cart, private authService : Auth){}
  ngOnInit(): void {
    this.getCartCount();
  }

  // GET CART COUNT
  getCartCount(){
    this.cartService.cartCount$.subscribe(count => {
    this.cartCount = count;
  });
  }
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

   logout() {
    this.authService.logout();
  }

  
}
