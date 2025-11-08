import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {AuthControllerApiService} from '../../api';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent implements OnInit {
  private authApi = inject(AuthControllerApiService);
  username = '';
  password = '';
  name = '';
  error = '';
  success = '';

  constructor(
    private auth: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/characters');
    }
  }

  onRegister(form?: NgForm) {
    if (!this.username || !this.password || !this.name) {
      this.error = 'Please fill in all fields.';
      this.success = '';
      return;
    }

    this.authApi.register({username: this.username, password: this.password, name: this.name}).subscribe({
      next: (res) => {
        this.success = 'Registration successful! You can now log in.';
        this.error = '';
        this.username = '';
        this.password = '';
      },
      error: (err: HttpErrorResponse) => {
        this.success = '';
        this.error = err.error?.error || 'Registration failed.';
      }
    });
  }
}
