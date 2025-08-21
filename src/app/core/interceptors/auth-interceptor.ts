import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize, throwError } from 'rxjs';
import { SpinnerService } from '../services/spinner';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  const router = inject(Router);
  const userService = inject(UserService);

  spinnerService.show();
  const user = userService.user; 

  if (!user) {
    spinnerService.hide();
    router.navigate(['/auth']);
    return throwError(() => new Error('User not authenticated'));
  }

  return next(req).pipe(
    finalize(
      () => 
      spinnerService.hide()
  )
  );
};
