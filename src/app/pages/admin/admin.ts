import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  readonly authService = inject(AuthService);
  readonly sidebarOpen = signal(true);

  readonly navItems = [
    { path: 'create', label: 'Create Poll', icon: '➕' },
    { path: 'polls', label: 'All Polls', icon: '📋' },
    { path: 'users', label: 'Users', icon: '👤' },
  ];

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  logout(): void {
    this.authService.clearAuth();
  }
}
