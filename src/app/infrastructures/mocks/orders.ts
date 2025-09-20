import { ulid } from 'ulid';

export interface Order {
  id: string;
  date: Date;
  amount: number;
  items: { productId: number; productName: string; quantity: number; price: number }[];
  type: 'purchase' | 'return' | 'expense';
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
}

export const ORDERS: Order[] = [
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-01-10'),
    amount: 150,
    items: [{ productId: 1, productName: 'Sneakers', quantity: 1, price: 150 }],
    type: 'purchase',
    customerId: 101,
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    customerAddress: '2 rue de la paix, 75002 Paris',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-02-15'),
    amount: 50,
    items: [{ productId: 1, productName: 'Sneakers', quantity: 1, price: 50 }],
    type: 'return',
    customerId: 102,
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    customerAddress: "14 avenue de l'Opéra, 75009 Paris",
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-03-05'),
    amount: 320,
    items: [
      { productId: 2, productName: 'Jeans', quantity: 2, price: 80 },
      { productId: 3, productName: 'T-shirt', quantity: 4, price: 40 },
    ],
    type: 'purchase',
    customerId: 103,
    customerName: 'Alice Martin',
    customerEmail: 'alice.martin@example.com',
    customerAddress: '25 boulevard Haussmann, 75009 Paris',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-04-02'),
    amount: 600,
    items: [{ productId: 5, productName: 'Leather Jacket', quantity: 2, price: 300 }],
    type: 'purchase',
    customerId: 104,
    customerName: 'Marc Dupont',
    customerEmail: 'marc.dupont@example.com',
    customerAddress: '10 rue de Rivoli, 75004 Paris',
  },
  {
    id: `ORDER_${ulid()}`,
    date: new Date('2025-06-10'),
    amount: 45,
    items: [{ productId: 6, productName: 'Belt', quantity: 1, price: 45 }],
    type: 'purchase',
    customerId: 105,
    customerName: 'Sophie Leroy',
    customerEmail: 'sophie.leroy@example.com',
    customerAddress: '8 rue Saint-Honoré, 75001 Paris',
  },
];
