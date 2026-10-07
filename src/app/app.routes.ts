import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'movies',
    loadComponent: () => import('./pages/movies/movies.page').then( m => m.MoviesPage),
    canActivate: [authGuard],
  },
  {
    path: 'movie-details',
    loadComponent: () => import('./pages/movie-details/movie-details.page').then( m => m.MovieDetailsPage),
    canActivate: [authGuard]
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then( m => m.FavoritesPage),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage),
    canActivate: [authGuard]
  },
  {
    path: 'matching',
    loadComponent: () => import('./pages/matching/matching.page').then( m => m.MatchingPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./pages/admin/dashboard/dashboard.page').then( m => m.DashboardPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/users',
    loadComponent: () => import('./pages/admin/users/users.page').then( m => m.UsersPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/movies',
    loadComponent: () => import('./pages/admin/movies/movies.page').then( m => m.MoviesPage),
    canActivate: [authGuard]
  },
];
