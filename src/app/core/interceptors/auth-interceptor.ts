import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    console.log('req', req)
  const spinnerService = inject(SpinnerService);

  console.log('this is woring')

  spinnerService.show(); // Show spinner at start of request

  return next(req).pipe(
    finalize(() => spinnerService.hide()) // Hide spinner after request completes
  );
};
