import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SalesService } from '../../../../core/services/sales/sales.services';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.html',
  imports: [ChartModule],
})
export class BarChart implements OnInit {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  basicData: any;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  basicOptions: any;
  sales = inject(SalesService);

  cd = inject(ChangeDetectorRef);

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [
            this.sales.salesByQuarter[0].sales,
            this.sales.salesByQuarter[1].sales,
            this.sales.salesByQuarter[2].sales,
            this.sales.salesByQuarter[3].sales,
          ],
          backgroundColor: ['rgb(148, 163, 184, 0.5)'],
          borderRadius: '12.8',
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          hoverBackgroundColor: ['rgb(255, 131, 22)'],
        },
        {
          label: 'Expenses',
          data: [
            this.sales.salesByQuarter[0].expenses,
            this.sales.salesByQuarter[1].expenses,
            this.sales.salesByQuarter[2].expenses,
            this.sales.salesByQuarter[3].expenses,
          ],
          backgroundColor: ['rgb(203, 213, 225, 0.5)'],
          borderRadius: '12.8',
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          hoverBackgroundColor: ['rgb(255, 179, 112)'],
        },
        {
          label: 'Returns',
          data: [
            this.sales.salesByQuarter[0].returns,
            this.sales.salesByQuarter[1].returns,
            this.sales.salesByQuarter[2].returns,
            this.sales.salesByQuarter[3].returns,
          ],
          backgroundColor: ['rgb(200, 200, 200, 0.5)'],
          borderRadius: '12.8',
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          hoverBackgroundColor: ['rgba(255, 211, 173)'],
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        tooltip: {
          titleColor: '#000000ff',
          bodyColor: '#282828ff',
          footerColor: '#000000ff',
          backgroundColor: '#e2e8f0',
        },
        title: {
          display: true,
          color: 'rgb(30, 41, 56)',
          position: 'top',
          align: 'start',
          text: 'Sales Overview',
          font: {
            size: 18,
            weight: 'bold',
            family: 'Inter',
          },
        },
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            color: '#333',
            usePointStyle: true,
            pointStyle: 'circle',
            justifyContent: 'end',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
    this.cd.markForCheck();
  }
}
