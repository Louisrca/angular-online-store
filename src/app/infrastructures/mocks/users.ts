import { User } from '../../features/auth/models/auth.model';

export const Users: User[] = [
  {
    id: '621a43f6-1f7e-4f08-81e7-e909cfabae18',
    email: 'user1@example.com',
    password: 'password1',
    firstName: 'Jane',
    lastName: 'Doe',
    token: 'token1',
    role: 'customer',
  },
  {
    id: 'ad8e7f0b-7335-453b-8944-df50c1c67720',
    email: 'admin@example.com',
    password: 'admin1',
    firstName: 'Tod',
    lastName: 'Smith',
    token: 'token2',
    role: 'admin',
  },
  {
    id: '8eb415ed-6b18-4a42-9d22-57199d8957f3',
    email: 'user3@example.com',
    password: 'password3',
    firstName: 'Jim',
    lastName: 'Beam',
    token: 'token3',
    role: 'worker',
  },
];
