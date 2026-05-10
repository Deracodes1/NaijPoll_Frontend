import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';
import { adminGuard } from './guards/adminguard-guard';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then((m) => m.SignupComponent),
    canActivate: [publicGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    canActivate: [publicGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'poll/:id',
    loadComponent: () =>
      import('./pages/poll-detail/poll-detail').then((m) => m.PollDetailComponent),
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./pages/poll-results/poll-results').then((m) => m.PollResultsComponent),
    canActivate: [authGuard],
  },

  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin').then((m) => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full',
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/admin/createpoll/createpoll').then((m) => m.CreatePollComponent),
      },
      {
        path: 'polls',
        loadComponent: () =>
          import('./pages/admin/poll-list/poll-list').then((m) => m.PollListComponent),
      },
      {
        path: 'polls/:id',
        loadComponent: () =>
          import('./pages/admin/poll-detail/poll-detail').then((m) => m.PollDetailComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
