import { User } from '@Features/auth/models/auth.model';
import { ulid } from 'ulid';

export interface Order {
  id: string;
  date: Date;
  amount: number;
  user: Omit<User, 'password' | 'token'>;
  items: {
    productId: string;
    productImgUrl: string;
    productName: string;
    quantity: number;
    selectedSize?: string;
    price: number;
  }[];
  deliveryDate?: Date;
  type: 'purchase' | 'return' | 'expense';
}

export const ORDERS: Order[] = [
  // Q1
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-01-10'),
    amount: 150,
    items: [
      {
        productId: '1',
        productName: 'Sneakers',
        productImgUrl: 'https://example.com/sneakers.jpg',
        quantity: 1,
        price: 150,
      },
    ],
    type: 'return',
    user: {
      id: '201',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      street: '2 rue de la paix, 75002 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-02-15'),
    amount: 50,
    items: [
      {
        productId: '1',
        productName: 'Sneakers',
        productImgUrl: 'https://example.com/sneakers.jpg',

        quantity: 1,
        price: 50,
      },
    ],
    type: 'return',
    user: {
      id: '202',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      street: "14 avenue de l'Opéra, 75009 Paris",
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-03-05'),
    amount: 320,
    items: [
      {
        productId: '2',
        productName: 'Jeans',
        productImgUrl: 'https://example.com/jeans.jpg',
        quantity: 1,
        price: 160,
      },
      {
        productId: '3',
        productName: 'T-shirt',
        productImgUrl: 'https://example.com/tshirt.jpg',
        quantity: 1,
        price: 160,
      },
    ],
    user: {
      id: '203',
      firstName: 'Alice',
      lastName: 'Martin',
      email: 'alice.martin@example.com',
      street: '25 boulevard Haussmann, 75009 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
    type: 'purchase',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-03-12'),
    amount: 100,
    items: [],
    user: {
      id: '204',
      firstName: 'Marc',
      lastName: 'Dupont',
      email: 'marc.dupont@example.com',
      street: '10 rue de Rivoli, 75004 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
    type: 'expense',
  },

  // Q2
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-04-02'),
    amount: 600,
    user: {
      id: '204',
      firstName: 'Marc',
      lastName: 'Dupont',
      email: 'marc.dupont@example.com',
      street: '10 rue de Rivoli, 75004 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
    items: [
      {
        productId: '4',
        productName: 'Leather Jacket',
        productImgUrl: 'https://example.com/leather-jacket.jpg',
        quantity: 2,
        price: 300,
      },
    ],
    type: 'purchase',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-04-15'),
    amount: 120,
    user: {
      id: '205',
      firstName: 'Alice',
      lastName: 'Martin',
      email: 'alice.martin@example.com',
      street: '25 boulevard Haussmann, 75009 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
    items: [
      {
        productId: '3',
        productName: 'T-shirt',
        productImgUrl: 'https://example.com/tshirt.jpg',
        quantity: 1,
        price: 120,
      },
    ],
    type: 'purchase',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-04-12'),
    amount: 400,
    items: [],
    user: {
      id: '206',
      firstName: 'Sophie',
      lastName: 'Leroy',
      email: 'sophie.leroy@example.com',
      street: '8 rue Saint-Honoré, 75001 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
    type: 'expense',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-06-10'),
    amount: 45,
    user: {
      id: '207',
      firstName: 'Sophie',
      lastName: 'Leroy',
      email: 'sophie.leroy@example.com',
      street: '8 rue Saint-Honoré, 75001 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
    items: [
      {
        productId: '5',
        productName: 'Belt',
        productImgUrl: 'https://example.com/belt.jpg',
        quantity: 1,
        price: 45,
      },
    ],
    type: 'expense',
  },

  // Q3
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-07-11'),
    amount: 890,
    user: {
      id: '208',
      firstName: 'Alice',
      lastName: 'Martin',
      email: 'alice.martin@example.com',
      street: '25 boulevard Haussmann, 75009 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
    items: [
      {
        productId: '6',
        productName: 'Jeans',
        productImgUrl: 'https://example.com/jeans.jpg',
        quantity: 1,
        price: 890,
      },
    ],
    type: 'purchase',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-07-25'),
    amount: 255,
    user: {
      id: '209',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      street: '2 rue de la paix, 75002 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
    items: [
      {
        productId: '3',
        productName: 'T-shirt',
        productImgUrl: 'https://example.com/tshirt.jpg',
        quantity: 1,
        price: 255,
      },
    ],
    type: 'purchase',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-08-30'),
    amount: 300,
    items: [],
    type: 'purchase',
    user: {
      id: '206',
      firstName: 'Marc',
      lastName: 'Dupont',
      email: 'marc.dupont@example.com',
      street: '10 rue de Rivoli, 75004 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
  },

  // Q4
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-10-05'),
    amount: 500,
    items: [
      {
        productId: '7',
        productName: 'Boots',
        productImgUrl: 'https://example.com/boots.jpg',
        quantity: 1,
        price: 500,
      },
    ],
    user: {
      id: '206',
      firstName: 'Marc',
      lastName: 'Dupont',
      email: 'marc.dupont@example.com',
      street: '10 rue de Rivoli, 75004 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
    type: 'expense',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-11-12'),
    amount: 80,
    items: [
      {
        productId: '7',
        productName: 'Boots',
        productImgUrl: 'https://example.com/boots.jpg',
        quantity: 1,
        price: 80,
      },
    ],
    user: {
      id: '207',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      street: "14 avenue de l'Opéra, 75009 Paris",
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
    type: 'return',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-09-01'),
    amount: 150,
    items: [],
    user: {
      id: '204',
      firstName: 'Marc',
      lastName: 'Dupont',
      email: 'marc.dupont@example.com',
      street: '10 rue de Rivoli, 75004 Paris',
      phone: '0123456789',
      city: 'Paris',
      country: 'France',
      role: 'customer',
    },
    type: 'purchase',
  },
];
