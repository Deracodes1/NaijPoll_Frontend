import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { PollService } from '../../../services/poll-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-poll',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './createpoll.html',
  styleUrl: './createpoll.css',
})
export class CreatePollComponent {
  readonly fb = inject(FormBuilder);
  readonly pollService = inject(PollService);
  readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal(false);

  readonly statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
  ];

  pollForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    status: ['active'],
    endsAt: [''],
    options: this.fb.array([this.createOptionControl(), this.createOptionControl()]),
  });

  get options(): FormArray<FormControl<string | null>> {
    return this.pollForm.get('options') as FormArray<FormControl<string | null>>;
  }

  createOptionControl(): FormControl<string | null> {
    return this.fb.control('', [Validators.required, Validators.minLength(1)]);
  }

  addOption(): void {
    if (this.options.length >= 4) return;
    this.options.push(this.createOptionControl());
  }

  removeOption(index: number): void {
    if (this.options.length <= 2) return;
    this.options.removeAt(index);
  }

  onSubmit(): void {
    if (this.pollForm.invalid) {
      this.pollForm.markAllAsTouched();
      return;
    }

    const raw = this.pollForm.getRawValue();

    const payload = {
      name: raw.name!,
      description: raw.description!,
      status: raw.status || 'active',
      ...(raw.endsAt ? { endsAt: raw.endsAt } : {}),
      options: raw.options!.filter((o): o is string => !!o),
    };

    this.isSubmitting.set(true);
    this.error.set(null);

    this.pollService.createPoll(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.success.set(true);
        setTimeout(() => this.router.navigate(['/admin/polls']), 1500);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        if (err.status === 401) {
          this.error.set('Session expired. Please login again.');
        } else if (err.status === 400) {
          this.error.set(err.error?.message || 'Invalid poll data. Please check your inputs.');
        } else {
          this.error.set(err.error?.message || 'Failed to create poll. Please try again.');
        }
      },
    });
  }
}
