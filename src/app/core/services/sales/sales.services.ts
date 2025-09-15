import { Injectable } from '@angular/core';
import { SALES } from '../../../infrastructures/mocks/sales';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  sales = SALES;

  quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  getQuarter(date: Date): string {
    const month = date.getMonth() + 1;
    if (month <= 3) return 'Q1';
    if (month <= 6) return 'Q2';
    if (month <= 9) return 'Q3';
    return 'Q4';
  }

  salesByQuarter = this.quarters.map((q) => {
    const sales = this.sales
      .filter((s) => this.getQuarter(s.date) === q && s.type === 'sale')
      .reduce((acc, cur) => acc + cur.amount, 0);
    const returns = this.sales
      .filter((s) => this.getQuarter(s.date) === q && s.type === 'return')
      .reduce((acc, cur) => acc + Math.abs(cur.amount), 0);
    const expenses = this.sales
      .filter((s) => this.getQuarter(s.date) === q && s.type === 'expense')
      .reduce((acc, cur) => acc + cur.amount, 0);

    return { quarter: q, sales, returns, expenses };
  });
}
