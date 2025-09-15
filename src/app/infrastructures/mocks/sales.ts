export interface SaleItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  date: Date;
  amount: number;
  items: SaleItem[];
  type: 'sale' | 'return' | 'expense';
}

export const SALES: Sale[] = [
  // Q1
  {
    id: '53499659-da77-4b37-ab3a-c985c159c584',
    date: new Date('2025-01-15'),
    amount: 240,
    items: [{ productId: 1, productName: 'Sneakers', quantity: 2, price: 120 }],
    type: 'sale',
  },
  {
    id: 'c1f3e8b4-2d6e-4f3e-9f0e-2c3b5f6a7d8e',
    date: new Date('2025-02-03'),
    amount: -50,
    items: [{ productId: 1, productName: 'Sneakers', quantity: 1, price: 50 }],
    type: 'return',
  },
  {
    id: 'b2a1c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
    date: new Date('2025-03-12'),
    amount: 100,
    items: [],
    type: 'expense',
  },
  {
    id: 'f7e8d9c0-b1a2-3b4c-5d6e-7f8g9h0i1j2k',
    date: new Date('2025-03-25'),
    amount: 300,
    items: [{ productId: 3, productName: 'Jacket', quantity: 2, price: 150 }],
    type: 'return',
  },

  // Q2
  {
    id: 'e1f2a3b4-c5d6-7a8b-9c0d-e1f2a3b4c5d6',
    date: new Date('2025-04-05'),
    amount: 560,
    items: [{ productId: 2, productName: 'T-shirt', quantity: 10, price: 56 }],
    type: 'sale',
  },
  {
    id: 'b2c1c2d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
    date: new Date('2025-04-12'),
    amount: 400,
    items: [],
    type: 'expense',
  },
  {
    id: 'f1e2d3c4-b5a6-7b8c-9d0e-f1e2d3c4b5a6',
    date: new Date('2025-05-21'),
    amount: -120,
    items: [{ productId: 3, productName: 'Jacket', quantity: 1, price: 120 }],
    type: 'return',
  },
  {
    id: 'f7e8d9c0-b1a2-2453-5d6e-7f8g9h0i1j2k',
    date: new Date('2025-03-25'),
    amount: 50,
    items: [{ productId: 3, productName: 'T-shirt', quantity: 2, price: 50 }],
    type: 'return',
  },

  // Q3
  {
    id: 'c3d4e5f6-a7b8-9c0d-e1f2-a3b4c5d6e7f8',
    date: new Date('2025-07-11'),
    amount: 890,
    items: [{ productId: 4, productName: 'Jeans', quantity: 5, price: 178 }],
    type: 'sale',
  },
  {
    id: 'b4c5d6e7-f8g9-h0i1-j2k3-b4c5d6e7f8g9',
    date: new Date('2025-08-30'),
    amount: 300,
    items: [],
    type: 'expense',
  },
  {
    id: 'f7e8d9c0-b1a2-2453-5d6e-7f8g9h0i1j2k',
    date: new Date('2025-07-25'),
    amount: 255,
    items: [{ productId: 3, productName: 'T-shirt', quantity: 2, price: 255 }],
    type: 'return',
  },

  // Q4
  {
    id: 'd5e6f7g8-h9i0-j1k2-l3m4-n5o6p7q8r9s0',
    date: new Date('2025-10-01'),
    amount: 450,
    items: [{ productId: 5, productName: 'Hoodie', quantity: 3, price: 150 }],
    type: 'sale',
  },
  {
    id: 'e6f7g8h9-i0j1-k2l3-m4n5-o6p7q8r9s0t1',
    date: new Date('2025-12-18'),
    amount: 300,
    items: [{ productId: 1, productName: 'Sneakers', quantity: 5, price: 260 }],
    type: 'sale',
  },
  {
    id: 'f7e8d9c0-b1a2-2453-5d6e-7f8g9h0i1j2k',
    date: new Date('2025-12-25'),
    amount: 500,
    items: [{ productId: 3, productName: 'T-shirt', quantity: 2, price: 50 }],
    type: 'return',
  },
  {
    id: 'a4c5d6e5-f8g9-h0i1-j2k3-b4c5d6e7f8g9',
    date: new Date('2025-10-30'),
    amount: 300,
    items: [],
    type: 'expense',
  },
];
