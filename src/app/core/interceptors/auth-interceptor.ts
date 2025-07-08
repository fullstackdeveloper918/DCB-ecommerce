import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);


  spinnerService.show(); // Show spinner at start of request

  return next(req).pipe(
    finalize(() => spinnerService.hide()) // Hide spinner after request completes
  );
};
