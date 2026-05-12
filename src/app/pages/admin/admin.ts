import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminLayoutComponent {
  readonly authService = inject(AuthService);
  readonly sidebarOpen = signal(false);

  readonly navItems = [
    { path: 'Home', label: 'Create Poll', icon: '➕' },
    { path: 'create', label: 'Create Poll', icon: '➕' },
    { path: 'polls', label: 'All Polls', icon: '📋' },
  ];

  toggleSidebar(): void {
    console.log('Toggling sidebar, current:', this.sidebarOpen());
    this.sidebarOpen.update((v) => !v);
    console.log('After toggle:', this.sidebarOpen());
  }

  closeSidebar(): void {
    console.log('Closing sidebar');
    this.sidebarOpen.set(false);
  }

  logout(): void {
    this.authService.clearAuth();
  }
}
