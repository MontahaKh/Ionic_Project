import { CanActivateFn } from '@angular/router';

export const activeUserGuard: CanActivateFn = (route, state) => {
  return true;
};
