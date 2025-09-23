import { Routes } from '@angular/router';
import { UsersPage } from './pages/users-page';
import { UsersList } from './components/users-list/users-list';
import { AddUser } from './components/add-user/add-user';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersPage,
    children: [
      {
        path: '',
        component: UsersList,
      },
      {
        path: 'add-user',
        component: AddUser,
      },
    ],
  },
];
