import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PollService } from '../../services/poll-service';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../components/button/button.component';
import type { Poll } from '../../types/poll.types';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-poll-detail',
  standalone: true,
  imports: [RouterLink, ButtonComponent, UpperCasePipe],
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
  readonly isVoting = signal(false);
  readonly error = signal<string | null>(null);
  readonly voteError = signal<string | null>(null);
  readonly voteSuccess = signal(false);

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
    this.voteError.set(null);
  }

  submitVote(): void {
    const optionId = this.selectedOption();
    const pollId = this.poll()?.id;

    if (!optionId || !pollId) return;

    this.isVoting.set(true);
    this.voteError.set(null);
    this.voteSuccess.set(false);

    this.pollService.submitVote(pollId, optionId).subscribe({
      next: () => {
        this.isVoting.set(false);
        this.voteSuccess.set(true);
        this.hasVoted.set(true);
      },
      error: (err) => {
        this.isVoting.set(false);

        if (err.status === 401) {
          const msg = err.error?.message || 'Session expired. Please login again.';
          this.voteError.set(msg);
          this.authService.clearAuth();
          this.router.navigate(['/login']);
        } else {
          this.voteError.set(err.error?.message || 'Failed to submit vote. Please try again.');
        }
      },
    });
  }

  get isAuthenticated(): boolean {
    return !!this.authService.getToken();
  }
}
