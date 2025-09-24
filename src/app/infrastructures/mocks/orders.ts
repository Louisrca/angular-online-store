import { ulid } from 'ulid';

export interface Order {
  id: string;
  date: Date;
  amount: number;
  items: { productId: string; productName: string; quantity: number; price: number }[];
  type: 'purchase' | 'return' | 'expense';
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
}

export const ORDERS: Order[] = [
  // Q1
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-01-10'),
    amount: 150,
    items: [{ productId: '1', productName: 'Sneakers', quantity: 1, price: 150 }],
    type: 'return',
    customerId: '101',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    customerAddress: '2 rue de la paix, 75002 Paris',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-02-15'),
    amount: 50,
    items: [{ productId: '1', productName: 'Sneakers', quantity: 1, price: 50 }],
    type: 'return',
    customerId: '102',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    customerAddress: "14 avenue de l'Opéra, 75009 Paris",
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-03-05'),
    amount: 320,
    items: [
      { productId: '2', productName: 'Jeans', quantity: 1, price: 160 },
      { productId: '3', productName: 'T-shirt', quantity: 1, price: 160 },
    ],
    type: 'purchase',
    customerId: '103',
    customerName: 'Alice Martin',
    customerEmail: 'alice.martin@example.com',
    customerAddress: '25 boulevard Haussmann, 75009 Paris',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-03-12'),
    amount: 100,
    items: [],
    type: 'expense',
    customerId: '104',
    customerName: 'Marc Dupont',
    customerEmail: 'marc.dupont@example.com',
    customerAddress: '10 rue de Rivoli, 75004 Paris',
  },

  // Q2
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-04-02'),
    amount: 600,
    items: [{ productId: '4', productName: 'Leather Jacket', quantity: 2, price: 300 }],
    type: 'purchase',
    customerId: '105',
    customerName: 'Marc Dupont',
    customerEmail: 'marc.dupont@example.com',
    customerAddress: '10 rue de Rivoli, 75004 Paris',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-04-15'),
    amount: 120,
    items: [{ productId: '3', productName: 'T-shirt', quantity: 1, price: 120 }],
    type: 'purchase',
    customerId: '106',
    customerName: 'Alice Martin',
    customerEmail: 'alice.martin@example.com',
    customerAddress: '25 boulevard Haussmann, 75009 Paris',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-04-12'),
    amount: 400,
    items: [],
    type: 'expense',
    customerId: '107',
    customerName: 'Sophie Leroy',
    customerEmail: 'sophie.leroy@example.com',
    customerAddress: '8 rue Saint-Honoré, 75001 Paris',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-06-10'),
    amount: 45,
    items: [{ productId: '5', productName: 'Belt', quantity: 1, price: 45 }],
    type: 'expense',
    customerId: '108',
    customerName: 'Sophie Leroy',
    customerEmail: 'sophie.leroy@example.com',
    customerAddress: '8 rue Saint-Honoré, 75001 Paris',
  },

  // Q3
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-07-11'),
    amount: 890,
    items: [{ productId: '6', productName: 'Jeans', quantity: 1, price: 890 }],
    type: 'purchase',
    customerId: '109',
    customerName: 'Alice Martin',
    customerEmail: 'alice.martin@example.com',
    customerAddress: '25 boulevard Haussmann, 75009 Paris',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-07-25'),
    amount: 255,
    items: [{ productId: '3', productName: 'T-shirt', quantity: 1, price: 255 }],
    type: 'purchase',
    customerId: '110',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    customerAddress: '2 rue de la paix, 75002 Paris',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-08-30'),
    amount: 300,
    items: [],
    type: 'purchase',
    customerId: '111',
    customerName: 'Marc Dupont',
    customerEmail: 'marc.dupont@example.com',
    customerAddress: '10 rue de Rivoli, 75004 Paris',
  },

  // Q4
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-10-05'),
    amount: 500,
    items: [{ productId: '7', productName: 'Boots', quantity: 1, price: 500 }],
    type: 'expense',
    customerId: '112',
    customerName: 'Sophie Leroy',
    customerEmail: 'sophie.leroy@example.com',
    customerAddress: '8 rue Saint-Honoré, 75001 Paris',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-11-12'),
    amount: 80,
    items: [{ productId: '7', productName: 'Boots', quantity: 1, price: 80 }],
    type: 'return',
    customerId: '113',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    customerAddress: "14 avenue de l'Opéra, 75009 Paris",
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-09-01'),
    amount: 150,
    items: [],
    type: 'purchase',
    customerId: '114',
    customerName: 'Marc Dupont',
    customerEmail: 'marc.dupont@example.com',
    customerAddress: '10 rue de Rivoli, 75004 Paris',
  },
];
