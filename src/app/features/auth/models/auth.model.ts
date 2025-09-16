export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  role?: 'customer' | 'worker' | 'admin';
}

export type LoginCredentials = Pick<User, 'email' | 'password'>;

export type RegisterCredentials = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'password' | 'role'
> & {
  confirmPassword: string;
};

export interface AuthResponse {
  user: User;
  message: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
