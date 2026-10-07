export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  photoUrl?: string;
  role: UserRole;
  active: boolean;
  createdAt?: string;
}
