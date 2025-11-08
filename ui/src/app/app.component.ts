import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <nav>
      <a *ngIf="!auth.isLoggedIn()" href="/login" [ngClass]="getClass('/login')">Login </a>
      <a *ngIf="!auth.isLoggedIn()" href="/register" [ngClass]="getClass('/register')">Register </a>
      <a *ngIf="auth.isLoggedIn()" (click)="auth.logout()">Logout ↪</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  path: string = '';

  constructor(
    public router: Router,
    public auth: AuthService
  ) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.path = this.router.url;
    });
  }

  getClass(link: string) {
    if (this.path.startsWith(link))
      return 'selected'
    return '';
  }

}