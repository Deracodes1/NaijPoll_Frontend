import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then((m) => m.SignupComponent),
    canActivate: [publicGuard],
  },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  //   canActivate: [publicGuard],
  // },
  // {
  //   path: '',
  //   loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  //   canActivate: [authGuard],
  // },
  // {
  //   path: 'profile',
  //   loadComponent: () =>
  //     import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  //   canActivate: [authGuard],
  // },
  {
    path: '**',
    redirectTo: '',
  },
];
