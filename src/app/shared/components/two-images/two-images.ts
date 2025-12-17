import { Component, OnInit } from '@angular/core';
import { TwoImagesService } from '../../../core/services/two-images.service';

@Component({
  selector: 'app-two-images',
  templateUrl: './two-images.html',
  styleUrls: ['./two-images.scss'],
  standalone : false
})
export class TwoImages implements OnInit {
  featuredProducts: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private twoImagesService: TwoImagesService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  private loadFeaturedProducts(): void {
    this.loading = true;
    this.twoImagesService.getRandomProducts(2).subscribe({
      next: (products) => {
        this.featuredProducts = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading featured products:', err);
        this.error = 'Failed to load featured products. Please try again later.';
        this.loading = false;
      }
    });
  }

  getLeftProduct() {
    return this.featuredProducts.find(p => p.position === 'left') || this.featuredProducts[0];
  }

  getRightProduct() {
    return this.featuredProducts.find(p => p.position === 'right') || this.featuredProducts[1] || this.featuredProducts[0];
  }
}
