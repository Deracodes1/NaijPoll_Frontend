import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { VoterIdPipe } from '../../pipes/voter-id.pipe';
import { ButtonComponent } from '../../components/button/button.component';
import type { UserProfile } from '../../types/user.types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [VoterIdPipe, ButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  readonly authService = inject(AuthService);
  readonly userService = inject(UserService);
  readonly router = inject(Router);

  readonly profile = signal<UserProfile | null>(this.authService.user());
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    const user = this.authService.user();
    if (user) {
      this.loadProfile(user.id);
    }
  }

  loadProfile(userId: string): void {
    this.isLoading.set(true);
    this.userService.getProfile(userId).subscribe({
      next: (response) => {
        this.profile.set(response.data);
        this.authService.saveUser(response.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        const message = err.error?.message || 'Failed to load profile';
        this.error.set(message);
        this.isLoading.set(false);
      },
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  logout(): void {
    this.authService.clearAuth();
    this.router.navigate(['/login']);
  }
}
