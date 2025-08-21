import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/products.service';
import { ProductCard } from "../../../shared/product-card/product-card";
import { SharedModule } from '../../../shared/shared-module';
import { UserService } from '../../../core/services/user.service';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { Product } from '../../../core/interfaces/Product.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [SharedModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy{
 products: Product[] = [];
  private searchSubject = new Subject<string>();
  private subscription = new Subscription();
  private sortValue: string | undefined;

  constructor(
    private productService: ProductService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.searchSubject
        .pipe(distinctUntilChanged())
        .subscribe(searchText => {
          this.loadProducts(searchText, this.sortValue);
        })
    );
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadProducts(searchedText?: string, sort?: string) {
    this.subscription.add(
      this.productService
        .getProducts(this.userService.user?.userRole, searchedText, sort)
        .subscribe((res: Product[]) => {
          this.products = res || [];
          console.log('products', this.products);
        })
    );
  }

  // search
  searchProducts(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  // sort
  onSortChange(event: Event) {
    this.sortValue = (event.target as HTMLSelectElement).value;
    this.loadProducts(undefined, this.sortValue); // keep search optional, apply sorting
  }
}
