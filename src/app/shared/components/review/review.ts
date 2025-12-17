import { Component } from '@angular/core';
import { CustomerReviewService } from '../../../core/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.html',
  styleUrl: './review.scss',
  standalone : false
})
export class Review {
 reviews: any[] = [];
  loading = true;

  constructor(private reviewService: CustomerReviewService) {}

  ngOnInit(): void {
    this.reviewService.getCustomerReviews().subscribe(data => {
      this.reviews = data;
      this.loading = false;
    });
  }

  getStars(count: number): number[] {
    return Array(count).fill(0);
  }
}
