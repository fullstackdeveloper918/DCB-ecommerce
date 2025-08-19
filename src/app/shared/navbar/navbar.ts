import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared-module';
import { GuestCartService } from '../../core/services/guest-cart.service';
import { Cart } from '../../core/services/cart';
import { Auth } from '../../core/services/auth';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [SharedModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit{
 isMobileMenuOpen = false;
 cartCount: number = 0;
 showProfileMenu = false;


  constructor(
  private cartService : Cart, 
  private authService : Auth,
  public userService : UserService){}
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

    
  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  
}
