import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthControllerApiService } from '../../api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/characters');
    }
  }

  onLogin(form?: NgForm) {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.router.navigate(['/characters']);
      },
      error: (err) => this.error = err.error?.error || 'Login failed'
    });
  }
}
