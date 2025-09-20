import { inject, Injectable } from '@angular/core';
import { Users } from '../../../infrastructures/mocks/users';
import { LoginCredentials, RegisterCredentials } from '../models/auth.model';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  users = Users;
  route = inject(Router);
  constructor() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    if (!user) {
      return false;
    }
    return !!JSON.parse(user).token;
  }

  getToken(): string | null {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }
    return JSON.parse(user).token || null;
  }

  login({ email, password }: LoginCredentials): boolean {
    if (email && password) {
      const user = this.users.find((user) => user.email === email && user.password === password);

      if (user) {
        const authUser = {
          email: email,
          firstName: user?.firstName,
          lastName: user?.lastName,
          id: user?.id,
          token: user?.token,
          role: user?.role,
        };

        localStorage.setItem('user', JSON.stringify(authUser));

        if (user.role !== 'customer') this.route.navigate(['/admin']);
        else this.route.navigate(['/']);

        return true;
      }
    } else {
      throw new Error('Email and password are required');
    }
    throw new Error('Invalid email or password');
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  register({
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    role,
  }: RegisterCredentials): boolean {
    if (firstName && lastName && password && confirmPassword && email) {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const existingUser = this.users.find((user) => user.email === email);
      if (existingUser) {
        throw new Error('Email is already in use');
      }

      const newUser = {
        id: uuidv4(),
        email,
        password,
        firstName,
        lastName,
        token: `token${this.users.length + 1}`,
        role: role || 'customer',
      };
      this.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.route.navigate(['/auth/login']);
      return true;
    }
    throw new Error('All fields are required');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  isWorker(): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    const foundUser = this.users.find((u) => u.email === user.email);
    return foundUser ? foundUser.role !== 'customer' : false;
  }
}
