import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  standalone: false,
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      (click)="close()"
    >
      <div 
        class="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 text-center shadow-2xl transform animate-slideUp"
        (click)="$event.stopPropagation()"
      >
        <!-- Close Button -->
        <button
          type="button"
          aria-label="Close"
          class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-300 hover:bg-gray-200 hover:text-black hover:rotate-90"
          (click)="close()"
        >
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>

        <!-- Success Animation Container -->
        <div class="mb-6 flex justify-center">
          <div class="relative">
            <!-- Pulsing Background Circle -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="h-24 w-24 rounded-full bg-green-100 animate-ping opacity-75"></div>
            </div>
            <!-- Static Background Circle -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"></div>
            </div>
            <!-- Checkmark Icon -->
            <div class="relative z-10 flex h-24 w-24 items-center justify-center text-6xl text-white animate-scaleIn">
              <i class="fa-regular fa-circle-check drop-shadow-lg"></i>
            </div>
          </div>
        </div>

        <!-- Title with gradient -->
        <h3 class="mb-3 text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent animate-fadeInUp">
          Thank You!
        </h3>

        <!-- Subtitle -->
        <p class="mb-2 text-lg font-medium text-gray-700 animate-fadeInUp" style="animation-delay: 0.1s">
          Your Request Has Been Received
        </p>

        <!-- Description -->
        <p class="text-gray-600 leading-relaxed animate-fadeInUp" style="animation-delay: 0.2s">
          We've received your bulk order request successfully. Our team will review it and contact you within 24-48 hours.
        </p>

        <!-- Decorative Line -->
        <div class="my-6 flex items-center justify-center gap-2 animate-fadeInUp" style="animation-delay: 0.3s">
          <div class="h-px w-16 bg-gradient-to-r from-transparent to-gray-300"></div>
          <i class="fa-solid fa-star text-xs text-yellow-500"></i>
          <div class="h-px w-16 bg-gradient-to-l from-transparent to-gray-300"></div>
        </div>

        <!-- Action Button -->
        <button
          type="button"
          class="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fadeInUp"
          style="animation-delay: 0.4s"
          (click)="close()"
        >
          <span class="relative z-10 flex items-center justify-center gap-2">
            Got it!
            <i class="fa-solid fa-check text-sm group-hover:translate-x-1 transition-transform duration-300"></i>
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <!-- Additional Info -->
        <p class="mt-4 text-xs text-gray-500 animate-fadeInUp" style="animation-delay: 0.5s">
          <i class="fa-solid fa-envelope mr-1"></i>
          Check your email for confirmation details
        </p>
      </div>
    </div>
  `,
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent {
    close(){
    window.history.back();
    }
}