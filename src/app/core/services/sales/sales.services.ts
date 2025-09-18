import { Injectable, signal } from '@angular/core';
import { Sale, SALES } from '../../../infrastructures/mocks/sales';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  salesSignal = signal<Sale[]>([]);

  quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  constructor() {
    const local = localStorage.getItem('sales');
    const initialSales = local ? JSON.parse(local) : SALES;
    this.salesSignal.set(initialSales);
    localStorage.setItem('sales', JSON.stringify(initialSales));
  }

  postSales(sale: Sale, saleType: 'sale' | 'return' | 'expense' = 'sale') {
    this.salesSignal.update((sales) => [...sales, { ...sale, saleType }]);
    localStorage.setItem('sales', JSON.stringify(this.salesSignal()));
  }

  getSales() {
    return JSON.parse(localStorage.getItem('sales') || '[]') as Sale[];
  }

  getQuarter(date: Date): string {
    const month = date.getMonth() + 1;
    if (month <= 3) return 'Q1';
    if (month <= 6) return 'Q2';
    if (month <= 9) return 'Q3';
    return 'Q4';
  }

  sales = this.getSales();

  getSalesByQuarter() {
    const sales = this.salesSignal();

    return this.quarters.map((q) => {
      const quarterSales = sales.filter((s) => this.getQuarter(new Date(s.date)) === q);

      const salesFiltered = quarterSales
        .filter((s) => s.saleType === 'sale')
        .reduce((acc, cur) => acc + cur.amount, 0);

      const returns = quarterSales
        .filter((s) => s.saleType === 'return')
        .reduce((acc, cur) => acc + Math.abs(cur.amount), 0);

      const expenses = quarterSales
        .filter((s) => s.saleType === 'expense')
        .reduce((acc, cur) => acc + cur.amount, 0);

      return { quarter: q, salesFiltered, returns, expenses, sales: quarterSales };
    });
  }
}
