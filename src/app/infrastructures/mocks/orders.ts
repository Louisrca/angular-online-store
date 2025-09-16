interface Order {
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
    id: 'a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
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
    id: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
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
    id: 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
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
    id: 'e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b',
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
    id: 'f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c',
    date: new Date('2025-05-15'),
    amount: 100,
    items: [{ productId: 3, productName: 'T-shirt', quantity: 2, price: 50 }],
    type: 'return',
    customerId: 103,
    customerName: 'Alice Martin',
    customerEmail: 'alice.martin@example.com',
    customerAddress: '25 boulevard Haussmann, 75009 Paris',
  },
  {
    id: 'g7h8i9j0-k1l2-3m4n-5o6p-7q8r9s0t1u2v',
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
