import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products.service';
import { SharedModule } from '../../shared/shared-module';
import { UserService } from '../../core/services/user.service';
import { distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { Product } from '../../core/interfaces/Product.interface';
import { dummyProducts } from '../../core/utils/sample.data';

@Component({
  selector: 'app-all-products',
  imports: [SharedModule],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss'
})
export class AllProducts implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading: boolean = false;
  private searchSubject = new Subject<string>();
  private subscription = new Subscription();
  sortValue: string = '';
  sortLabel: string = 'Sort by';

  constructor(
    private productService: ProductService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.searchSubject
        .pipe(distinctUntilChanged())
        .subscribe(searchText => {
          const category = this.getCategoryFromUrl();
          this.loadProducts(searchText, this.sortValue, category);
        })
    );
    const category = this.getCategoryFromUrl();
    this.loadProducts(undefined, this.sortValue, category);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadProducts(searchedText?: string, sort?: string, category?: any) {
    this.loading = true;
    this.subscription.add(
      this.productService
        .getProducts(this.userService.user?.userRole, searchedText, sort, category)
        .subscribe({
          next: (res: Product[]) => {
            this.products = res || [];
            this.filteredProducts = this.products;
            this.loading = false;
            console.log('All products:', this.products);
          },
          error: (error) => {
            console.error('Error loading products:', error);
            this.products = [];
            this.filteredProducts = [];
            this.loading = false;
          }
        })
    );
  }

  private getCategoryFromUrl(): string | null {
    const url = window.location.href;
    const params = new URLSearchParams(url.split('?')[1] || '');
    return params.get('category');
  }

  // search
  searchProducts(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  // sort for custom dropdown
  // selectSort(value: string) {
  //   this.sortValue = value;
  //   if (value === 'price_asc') {
  //     this.sortLabel = 'Price: Low to High';
  //   } else if (value === 'price_desc') {
  //     this.sortLabel = 'Price: High to Low';
  //   } else {
  //     this.sortLabel = 'Sort by';
  //   }
  //   const category = this.getCategoryFromUrl();
  //   this.loadProducts(undefined, this.sortValue, category);
  //   // Close the dropdown after selection
  //   const details = document.querySelector('details.group');
  //   if (details && details.hasAttribute('open')) {
  //     details.removeAttribute('open');
  //   }
  // }
}
