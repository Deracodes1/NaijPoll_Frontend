import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PollService } from '../../services/poll-service';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../components/button/button.component';
import { AlertComponent } from '../../components/alert/alert.component';
import type { Poll } from '../../types/poll.types';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-poll-detail',
  standalone: true,
  imports: [RouterLink, ButtonComponent, AlertComponent, UpperCasePipe],
  templateUrl: './poll-detail.html',
  styleUrl: './poll-detail.css',
})
export class PollDetailComponent {
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly pollService = inject(PollService);
  readonly authService = inject(AuthService);

  readonly poll = signal<Poll | null>(null);
  readonly selectedOption = signal<string | null>(null);
  readonly hasVoted = signal(false);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPoll(id);
    }
  }

  loadPoll(id: string): void {
    this.isLoading.set(true);
    this.pollService.getPoll(id).subscribe({
      next: (response) => {
        this.poll.set(response.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to load poll');
        this.isLoading.set(false);
      },
    });
  }

  selectOption(optionId: string): void {
    if (!this.isAuthenticated) return;
    this.selectedOption.set(optionId);
  }

  submitVote(): void {
    if (!this.selectedOption() || !this.poll()) return;
    // Vote submission will be implemented later
    this.hasVoted.set(true);
  }

  get isAuthenticated(): boolean {
    return !!this.authService.getToken();
  }
}
