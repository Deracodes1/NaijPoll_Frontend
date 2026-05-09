import { Pipe, PipeTransform } from '@angular/core';
import type { PollStatus } from '../types/poll.types';

@Pipe({
  name: 'statusBadge',
  standalone: true,
})
export class StatusBadgePipe implements PipeTransform {
  transform(status: PollStatus): { text: string; class: string } {
    const map: Record<PollStatus, { text: string; class: string }> = {
      active: { text: 'ACTIVE', class: 'badge-active' },
      closed: { text: 'CLOSED', class: 'badge-closed' },
      draft: { text: 'DRAFT', class: 'badge-draft' },
    };
    return map[status];
  }
}
