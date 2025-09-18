export interface SaleItem {
  id: number;
  name: string;
  price: number;
}

export interface Sale {
  id: string;
  date: Date;
  amount: number;
  items: SaleItem[];
  saleType: 'sale' | 'return' | 'expense';
}

export const SALES: Sale[] = [
  // Q1
  {
    id: '53499659-da77-4b37-ab3a-c985c159c584',
    date: new Date('2025-01-15'),
    amount: 240,
    items: [{ id: 1, name: 'Sneakers', price: 120 }],
    saleType: 'sale',
  },
  {
    id: 'c1f3e8b4-2d6e-4f3e-9f0e-2c3b5f6a7d8e',
    date: new Date('2025-02-03'),
    amount: -50,
    items: [{ id: 1, name: 'Sneakers', price: 50 }],
    saleType: 'return',
  },
  {
    id: 'b2a1c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
    date: new Date('2025-03-12'),
    amount: 100,
    items: [],
    saleType: 'expense',
  },
  {
    id: 'f7e8d9c0-b1a2-3b4c-5d6e-7f8g9h0i1j2k',
    date: new Date('2025-03-25'),
    amount: 300,
    items: [{ id: 3, name: 'Jacket', price: 150 }],
    saleType: 'return',
  },

  // Q2
  {
    id: 'e1f2a3b4-c5d6-7a8b-9c0d-e1f2a3b4c5d6',
    date: new Date('2025-04-05'),
    amount: 560,
    items: [{ id: 2, name: 'T-shirt', price: 56 }],
    saleType: 'sale',
  },
  {
    id: 'b2c1c2d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
    date: new Date('2025-04-12'),
    amount: 400,
    items: [],
    saleType: 'expense',
  },
  {
    id: 'f1e2d3c4-b5a6-7b8c-9d0e-f1e2d3c4b5a6',
    date: new Date('2025-05-21'),
    amount: -120,
    items: [{ id: 3, name: 'Jacket', price: 120 }],
    saleType: 'return',
  },
  {
    id: 'f7e8d9c0-b1a2-2453-5d6e-7f8g9h0i1j2k',
    date: new Date('2025-03-25'),
    amount: 50,
    items: [{ id: 3, name: 'T-shirt', price: 50 }],
    saleType: 'return',
  },

  // Q3
  {
    id: 'c3d4e5f6-a7b8-9c0d-e1f2-a3b4c5d6e7f8',
    date: new Date('2025-07-11'),
    amount: 890,
    items: [{ id: 4, name: 'Jeans', price: 178 }],
    saleType: 'sale',
  },
  {
    id: 'b4c5d6e7-f8g9-h0i1-j2k3-b4c5d6e7f8g9',
    date: new Date('2025-08-30'),
    amount: 300,
    items: [],
    saleType: 'expense',
  },
  {
    id: 'f7e8d9c0-b1a2-2453-5d6e-7f8g9h0i1j2k',
    date: new Date('2025-07-25'),
    amount: 255,
    items: [{ id: 3, name: 'T-shirt', price: 255 }],
    saleType: 'return',
  },
];
