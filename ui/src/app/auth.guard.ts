import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    return navigate('/login', router);
  }
};

function navigate(str: string, router: Router) {
  router.navigate([str]);
  return false;
}

export function isLoggedIn(): boolean {
  const auth = inject(AuthService);
  return auth.isLoggedIn();
}
