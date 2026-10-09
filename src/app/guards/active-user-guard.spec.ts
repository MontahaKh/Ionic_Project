import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { activeUserGuard } from './active-user-guard';

describe('activeUserGuard', () => {
  it('redirects inactive users to login', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: Auth,
          useValue: {
            waitForAuthState: () => Promise.resolve({ uid: 'user-1' }),
            getCurrentProfile: () => Promise.resolve({ active: false, role: 'user' }),
          },
        },
      ],
    });

    const result = await TestBed.runInInjectionContext(() => activeUserGuard({} as never, {} as never));
    const router = TestBed.inject(Router);

    expect(result).toEqual(router.createUrlTree(['/login']));
  });

  it('allows active users', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: Auth,
          useValue: {
            waitForAuthState: () => Promise.resolve({ uid: 'user-1' }),
            getCurrentProfile: () => Promise.resolve({ active: true, role: 'user' }),
          },
        },
      ],
    });

    const result = await TestBed.runInInjectionContext(() => activeUserGuard({} as never, {} as never));

    expect(result).toBe(true);
  });
});
