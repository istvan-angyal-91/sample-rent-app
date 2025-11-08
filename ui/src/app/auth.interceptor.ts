import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if(token && !req.url.includes('/auth/')) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          console.warn('403 Forbidden – token törlése a localStorage-ból');
          localStorage.removeItem('token');
          router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }

  return next(req).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse && error.status === 403) {
        console.warn('403 Forbidden – token törlése a localStorage-ból');
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );

};