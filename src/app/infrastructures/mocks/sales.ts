export interface SaleItem {
  id: string;
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
    id: 'sale-q1-1',
    date: new Date('2025-01-10'),
    amount: 150,
    items: [{ id: '1', name: 'Sneakers', price: 150 }],
    saleType: 'sale',
  },
  {
    id: 'sale-q1-2',
    date: new Date('2025-02-15'),
    amount: 50,
    items: [{ id: '1', name: 'Sneakers', price: 50 }],
    saleType: 'sale',
  },
  {
    id: 'sale-q1-3',
    date: new Date('2025-03-05'),
    amount: 320,
    items: [
      { id: '2', name: 'Jeans', price: 160 },
      { id: '3', name: 'T-shirt', price: 160 },
    ],
    saleType: 'sale',
  },
  {
    id: 'sale-q1-expense',
    date: new Date('2025-03-12'),
    amount: 100,
    items: [],
    saleType: 'sale',
  },

  // Q2
  {
    id: 'sale-q2-1',
    date: new Date('2025-04-02'),
    amount: 600,
    items: [{ id: '4', name: 'Leather Jacket', price: 600 }],
    saleType: 'sale',
  },
  {
    id: 'sale-q2-2',
    date: new Date('2025-04-15'),
    amount: 120,
    items: [{ id: '3', name: 'T-shirt', price: 120 }],
    saleType: 'sale',
  },
  {
    id: 'sale-q2-expense',
    date: new Date('2025-04-12'),
    amount: 400,
    items: [],
    saleType: 'expense',
  },
  {
    id: 'sale-q2-3',
    date: new Date('2025-06-10'),
    amount: 45,
    items: [{ id: '5', name: 'Belt', price: 45 }],
    saleType: 'sale',
  },

  // Q3
  {
    id: 'sale-q3-1',
    date: new Date('2025-07-11'),
    amount: 890,
    items: [{ id: '6', name: 'Jeans', price: 890 }],
    saleType: 'sale',
  },
  {
    id: 'sale-q3-2',
    date: new Date('2025-07-25'),
    amount: 255,
    items: [{ id: '3', name: 'T-shirt', price: 255 }],
    saleType: 'return',
  },
  {
    id: 'sale-q3-expense',
    date: new Date('2025-08-30'),
    amount: 300,
    items: [],
    saleType: 'sale',
  },

  // Q4
  {
    id: 'sale-q4-1',
    date: new Date('2025-10-05'),
    amount: 500,
    items: [{ id: '7', name: 'Boots', price: 500 }],
    saleType: 'sale',
  },
  {
    id: 'sale-q4-2',
    date: new Date('2025-11-12'),
    amount: 80,
    items: [{ id: '7', name: 'Boots', price: 80 }],
    saleType: 'sale',
  },
  {
    id: 'sale-q4-expense',
    date: new Date('2025-12-01'),
    amount: 150,
    items: [],
    saleType: 'sale',
  },
];
