import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <nav>

    </nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(
    public router: Router,
    public auth: AuthService,
    private themeService: ThemeService,
  ) {

  }
  path: string = '';

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.path = this.router.url;
    });
  }

}
