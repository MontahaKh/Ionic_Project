import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const activeUserGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const user = await auth.waitForAuthState();

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  try {
    const profile = await auth.getCurrentProfile();
    return profile?.active ? true : router.createUrlTree(['/login']);
  } catch {
    return router.createUrlTree(['/login']);
  }
};
