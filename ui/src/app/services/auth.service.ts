import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {AuthControllerApiService} from '../api';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private auth: AuthControllerApiService,
    public router: Router) {
  }

  login(username: string, password: string) {
    return this.auth.login({username: username, password: password})
      .pipe(
        tap(res => {
          if (res['token']) {
            localStorage.setItem('token', res['token']);
          }
        }));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
