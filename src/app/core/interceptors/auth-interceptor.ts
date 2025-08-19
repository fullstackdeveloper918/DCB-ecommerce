import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize, from, switchMap, throwError } from 'rxjs';
import { SpinnerService } from '../services/spinner';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  const router = inject(Router);
  const afAuth = inject(AngularFireAuth);

  console.log('afauth', afAuth);

  spinnerService.show();

  return from(afAuth.currentUser).pipe(
    switchMap(user => {
      if (!user) {
        spinnerService.hide();
        router.navigate(['/auth']);
        return throwError(() => new Error('User not authenticated'));
      }

      return from(user.getIdToken()).pipe(
        switchMap(token => {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });

          return next(authReq).pipe(
            finalize(() => spinnerService.hide())
          );
        })
      );
    })
  );
};
