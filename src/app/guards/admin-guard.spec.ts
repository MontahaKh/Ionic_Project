import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { adminGuard } from './admin-guard';

describe('adminGuard', () => {
  it('redirects unauthenticated users to login', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: Auth, useValue: { waitForAuthState: () => Promise.resolve(null) } },
      ],
    });

    const result = await TestBed.runInInjectionContext(() => adminGuard({} as never, {} as never));
    const router = TestBed.inject(Router);

    expect(result).toEqual(router.createUrlTree(['/login']));
  });

  it('redirects authenticated non-admin users to home', async () => {
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

    const result = await TestBed.runInInjectionContext(() => adminGuard({} as never, {} as never));
    const router = TestBed.inject(Router);

    expect(result).toEqual(router.createUrlTree(['/home']));
  });

  it('allows active administrators', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: Auth,
          useValue: {
            waitForAuthState: () => Promise.resolve({ uid: 'admin-1' }),
            getCurrentProfile: () => Promise.resolve({ active: true, role: 'admin' }),
          },
        },
      ],
    });

    const result = await TestBed.runInInjectionContext(() => adminGuard({} as never, {} as never));

    expect(result).toBe(true);
  });
});
