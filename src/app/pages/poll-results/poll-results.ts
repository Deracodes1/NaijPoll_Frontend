import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../../services/poll-service';
import { NIGERIAN_STATES } from '../../data/nigerian-states';
import type { VoteResult } from '../../types/poll.types';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-poll-results',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './poll-results.html',
  styleUrl: './poll-results.css',
})
export class PollResultsComponent {
  readonly route = inject(ActivatedRoute);
  readonly pollService = inject(PollService);

  readonly results = signal<VoteResult[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedState = signal<string>('All States');
  readonly pollId = signal<string>('');

  readonly nigerianStates = ['All States', ...NIGERIAN_STATES];

  readonly totalVotes = computed(() => this.results().reduce((sum, r) => sum + r.count, 0));

  readonly maxVotes = computed(() => Math.max(...this.results().map((r) => r.count), 0));

  readonly hasNoParticipation = computed(
    () =>
      this.selectedState() !== 'All States' &&
      this.results().length === 0 &&
      !this.isLoading() &&
      !this.error(),
  );

  constructor() {
    const id = this.route.snapshot.queryParamMap.get('pollId');
    if (id) {
      this.pollId.set(id);
      this.loadResults();
    } else {
      this.error.set('No poll ID provided');
    }
  }

  loadResults(): void {
    const pollId = this.pollId();
    const state = this.selectedState();

    if (!pollId) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.pollService.getPollResults(pollId, state).subscribe({
      next: (response) => {
        this.results.set(response.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 500) {
          this.error.set('Something went wrong on our end. Please try again later.');
        } else if (err.status === 404) {
          this.error.set('Poll results not found.');
        } else {
          this.error.set(err.error?.message || 'Failed to load results. Please try again.');
        }
      },
    });
  }

  onStateChange(state: string): void {
    this.selectedState.set(state);
    this.loadResults();
  }

  getBarWidth(count: number): string {
    const max = this.maxVotes();
    if (max === 0) return '0%';
    return `${(count / max) * 100}%`;
  }

  getPercentage(count: number): string {
    const total = this.totalVotes();
    if (total === 0) return '0%';
    return `${((count / total) * 100).toFixed(1)}%`;
  }
}
