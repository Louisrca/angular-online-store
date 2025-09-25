import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthServices } from './auth';
import { User } from '../models/auth.model';
import { Users } from '../../../infrastructures/mocks/users';

describe('AuthServices', () => {
  let service: AuthServices;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [AuthServices, { provide: Router, useValue: spy }],
    });

    service = TestBed.inject(AuthServices);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Réinitialiser localStorage pour chaque test
    localStorage.clear();
    localStorage.setItem('users', JSON.stringify(Users));
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait enregistrer un utilisateur', () => {
    const email = `john_${Date.now()}@example.com`;
    const result = service.register({
      firstName: 'John',
      lastName: 'Doe',
      email,
      password: '123456',
      confirmPassword: '123456',
      street: '123 rue',
      city: 'Paris',
      country: 'FR',
      phone: '0123456789',
      role: 'customer',
    });

    expect(result).toBeTrue();
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const createdUser = users.find((u) => u.email === email);
    expect(createdUser).toBeTruthy();
    expect(createdUser?.role).toBe('customer');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('devrait connecter un utilisateur existant', () => {
    const email = `jane_${Date.now()}@example.com`;
    service.register({
      firstName: 'Jane',
      lastName: 'Doe',
      email,
      password: '123456',
      confirmPassword: '123456',
      street: '123 rue',
      city: 'Paris',
      country: 'FR',
      phone: '0123456789',
      role: 'admin',
    });

    const result = service.login({
      email,
      password: '123456',
    });

    expect(result).toBeTrue();
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    expect(storedUser.email).toBe(email);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/dashboard']);
  });

  it('devrait lancer une erreur si mauvais mot de passe', () => {
    expect(() => service.login({ email: 'fake@example.com', password: 'wrong' })).toThrowError(
      'Invalid email or password',
    );
  });

  it('devrait retourner true quand un utilisateur est connecté', () => {
    const email = `paul_${Date.now()}@example.com`;
    service.register({
      firstName: 'Paul',
      lastName: 'Smith',
      email,
      password: 'pass',
      confirmPassword: 'pass',
      street: '123 rue',
      city: 'Paris',
      country: 'FR',
      phone: '0123456789',
      role: 'customer',
    });

    service.login({ email, password: 'pass' });
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('devrait déconnecter un utilisateur', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@test.com', token: 'abc' }));
    service.logout();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('devrait retourner le token de l’utilisateur courant', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@test.com', token: 'xyz' }));
    expect(service.getToken()).toBe('xyz');
  });

  it('devrait supprimer un utilisateur', () => {
    const newUser: User = {
      id: '123',
      email: 'delete@example.com',
      password: '1234',
      firstName: 'Del',
      lastName: 'User',
      street: '123 rue',
      city: 'Paris',
      country: 'FR',
      phone: '01234',
      token: 'tokentest',
      role: 'customer',
    };
    service.users.push(newUser);
    service.removeUser('123');

    const users = service.getUsers();
    const found = users.find((u: User) => u.id === '123');
    expect(found).toBeUndefined();
  });

  it('devrait distinguer un admin', () => {
    const email = `admin_${Date.now()}@example.com`;
    service.register({
      firstName: 'Admin',
      lastName: 'User',
      email,
      password: 'pass',
      confirmPassword: 'pass',
      street: 'Rue',
      city: 'Paris',
      country: 'FR',
      phone: '0101010101',
      role: 'admin',
    });

    service.login({ email, password: 'pass' });

    expect(service.isAdmin()).toBeTrue();
    expect(service.isWorker()).toBeTrue();
  });

  it('devrait retourner les clients', () => {
    const customerEmail = `customer_${Date.now()}@example.com`;
    service.register({
      firstName: 'Client',
      lastName: 'Test',
      email: customerEmail,
      password: 'pass',
      confirmPassword: 'pass',
      street: 'Rue',
      city: 'Paris',
      country: 'FR',
      phone: '0101010101',
      role: 'customer',
    });

    const customers = service.getCustomers();
    const found = customers.find((u: User) => u.email === customerEmail);
    expect(found).toBeTruthy();
    expect(found?.role).toBe('customer');
  });

  it('devrait retourner l’utilisateur courant', () => {
    const email = `current_${Date.now()}@example.com`;
    service.register({
      firstName: 'Current',
      lastName: 'User',
      email,
      password: 'pass',
      confirmPassword: 'pass',
      street: 'Rue',
      city: 'Paris',
      country: 'FR',
      phone: '0101010101',
      role: 'customer',
    });

    service.login({ email, password: 'pass' });
    const currentUser = service.getCurrentUser();
    expect(currentUser).toBeTruthy();
    expect(currentUser?.email).toBe(email);
  });
});
