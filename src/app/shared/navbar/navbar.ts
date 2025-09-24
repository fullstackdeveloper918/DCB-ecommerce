import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
 isUserLoggedIn : Boolean = false;

  constructor(
  private cartService : Cart, 
  private authService : Auth,
  public userService : UserService,
  private router : Router){}
  ngOnInit(): void {
    this.getCartCount();
    this.checkLoggedIn();
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

   logOutOrLogin() {
    if(this.isUserLoggedIn){
    this.authService.logout();
    } else if(!this.isUserLoggedIn){
      this.router.navigate(['/auth']);
    }
  }

    
  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  // CHECK LOGGED IN USER
  checkLoggedIn(){
    if(this.authService.isLoggedIn()){
      this.isUserLoggedIn = true;
    }
  }
  
}
