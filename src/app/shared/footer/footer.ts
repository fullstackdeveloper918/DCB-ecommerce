import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FooterService } from '../../core/services/footer.service';
import { NewsletterService } from '../../core/services/newsletter.service';
import { SharedModule } from '../shared-module';

@Component({
  selector: 'app-footer',
  imports: [SharedModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {

  footerData: any;
  newsletterForm: FormGroup;
  subscriptionStatus: { success: boolean; message: string } | null = null;
  isLoading = false;

  constructor(
    private footerService: FooterService,
    private newsletterService: NewsletterService,
    private fb: FormBuilder
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.footerService.getFooterData().subscribe(data => {
      this.footerData = data;
    });
  }

  onSubmit(): void {
    if (this.newsletterForm.invalid) {
      return;
    }

    this.isLoading = true;
    const email = this.newsletterForm.get('email')?.value;

    this.newsletterService.subscribe(email).subscribe({
      next: (response) => {
        this.subscriptionStatus = response;
        this.newsletterForm.reset();
        this.isLoading = false;
        
        // Clear success message after 5 seconds
        if (response.success) {
          setTimeout(() => {
            this.subscriptionStatus = null;
          }, 5000);
        }
      },
      error: (error) => {
        this.subscriptionStatus = {
          success: false,
          message: 'An error occurred. Please try again later.'
        };
        this.isLoading = false;
      }
    });
  }

}
