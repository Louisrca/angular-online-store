import { Route } from '@angular/router';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AuthPage } from './pages/auth/auth-page';

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
    ],
  },
];
