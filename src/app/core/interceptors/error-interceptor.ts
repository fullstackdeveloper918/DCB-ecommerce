import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      //  Handle specific status codes
      if (error.status === 401) {
        console.error('Unauthorized - Redirecting to login');
        toastr.warning('You are not authorized. Redirecting to login.', 'Unauthorized');
        router.navigate(['/auth/login']);
      } else if (error.status === 403) {
        console.error('Forbidden - Access denied');
        toastr.error('You do not have permission to perform this action.', 'Forbidden');
      } else if (error.status === 404) {
        console.error('Not Found');
        toastr.info('The requested resource was not found.', 'Not Found');
      } else if (error.status === 500) {
        console.error('Server error - Try again later');
        toastr.error('An internal server error occurred. Please try again later.', 'Server Error');
      } else {
        console.error('Unhandled error:', error.message);
        toastr.error('An unexpected error occurred.', 'Error');
      }

      return throwError(() => error);
    })
  );
};
