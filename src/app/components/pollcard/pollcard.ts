import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusBadgePipe } from '../../pipes/statusbadge-pipe';
import type { Poll } from '../../types/poll.types';
import { KeyValuePipe } from '@angular/common';
@Component({
  selector: 'app-pollcard',
  standalone: true,
  imports: [RouterLink, StatusBadgePipe, KeyValuePipe],
  templateUrl: './pollcard.html',
  styleUrl: './pollcard.css',
})
export class PollCardComponent {
  readonly poll = input.required<Poll>();
  readonly isAuthenticated = input<boolean>(false);
  readonly vote = output<string>();
}
