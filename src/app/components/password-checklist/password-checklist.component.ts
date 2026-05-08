// src/app/components/password-checklist/password-checklist.component.ts

import { Component, input, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { PASSWORD_REQUIREMENTS } from '../../data/password-requirements';

@Component({
  selector: 'app-password-checklist',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="checklist">
      @for (req of requirements; track req.label) {
        <div class="checklist-item" [ngClass]="{ met: isMet(req) }">
          <span class="check-icon">{{ isMet(req) ? '✓' : '○' }}</span>
          <span class="check-label">{{ req.label }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .checklist {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      margin-top: 0.5rem;
    }
    .checklist-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: #ef4444;
      transition: color 0.2s;
    }
    .checklist-item.met {
      color: #059669;
    }
    .check-icon {
      font-weight: 700;
      font-size: 0.875rem;
    }
  `],
})
export class PasswordChecklistComponent {
  readonly password = input.required<string>();
  readonly requirements = PASSWORD_REQUIREMENTS;

  readonly allMet = computed(() =>
    this.requirements.every((req) => req.test(this.password()))
  );

  isMet(req: { label: string; test: (password: string) => boolean }): boolean {
    return req.test(this.password());
  }
}
