import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../core/services/products.service';
import { SharedModule } from '../../../shared/shared-module';
import { UserService } from '../../../core/services/user.service';
import { distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { Product } from '../../../core/interfaces/Product.interface';
import { dummyProducts } from '../../../core/utils/sample.data';

@Component({
  selector: 'app-home',
  imports: [SharedModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy{
  @ViewChild('productScroll', { static: false })
  productScroll!: ElementRef<HTMLDivElement>;
  products!: Product[];
  limitedProducts: Product[] = [];
  private searchSubject = new Subject<string>();
  private subscription = new Subscription();
  sortValue: string = '';
  sortLabel: string = 'Sort by';
  productLimit: number = 8;
  currentBannerIndex = 0;
  banners = [
  {
    image: 'banner-1.png',
    title: 'Premium Products for Modern Living',
    subtitle: 'Discover high-quality merchandise curated for style and durability.'
  },
  {
    image: 'banner-2.png',
    title: 'Designed for Everyday Comfort',
    subtitle: 'Modern essentials crafted with precision and care.'
  },
  {
    image: 'banner-3.png',
    title: 'Style That Speaks Quality',
    subtitle: 'Upgrade your lifestyle with premium collections.'
  }
];


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
        .subscribe({
          next: (res: Product[]) => {
            this.products = res
            // this.products = dummyProducts  // this will change later
            this.limitedProducts = this.products.slice(0, this.productLimit);
            // this.limitedProducts = [...this.limitedProducts,...dummyProducts]
          },
          error: (error) => {
            console.error('Error loading products:', error);
            this.products = [];
            this.limitedProducts = [];
          }
        })
    );
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  // search
  searchProducts(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  // sort for custom dropdown
  selectSort(value: string) {
    this.sortValue = value;
    if (value === 'price_asc') {
      this.sortLabel = 'Price: Low to High';
    } else if (value === 'price_desc') {
      this.sortLabel = 'Price: High to Low';
    } else {
      this.sortLabel = 'Sort by';
    }
    this.loadProducts(undefined, this.sortValue);
    // Close the dropdown after selection (optional UX improvement)
    const details = document.querySelector('details.group');
    if (details && details.hasAttribute('open')) {
      details.removeAttribute('open');
    }
  }

  
    nextBanner() {
      this.currentBannerIndex =
        (this.currentBannerIndex + 1) % this.banners.length;
    }

    prevBanner() {
      this.currentBannerIndex =
        (this.currentBannerIndex - 1 + this.banners.length) % this.banners.length;
    }

    goToBanner(index: number) {
      this.currentBannerIndex = index;
    }

   scrollProducts(direction: 1 | -1) {
    const container = this.productScroll.nativeElement;
    const cardWidth = 320; // min-w-[260px]
    const gap = 24;

    container.scrollBy({
      left: (cardWidth + gap) * direction,
      behavior: 'smooth'
    });
}

}
