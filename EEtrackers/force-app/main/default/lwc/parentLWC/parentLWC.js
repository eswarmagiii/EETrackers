// parentLWC.js
import { LightningElement, wire } from 'lwc';
import getExpensesByCategory from '@salesforce/apex/ExpenseChartController.getExpensesByCategory';

export default class ParentLWC extends LightningElement {
  pieConfig;

  @wire(getExpensesByCategory)
  wiredExpenses({ data, error }) {
    if (data) {
      // Convert Proxy to plain JS objects
      const labels = data.map(item => item.category);
      const totals = data.map(item => Number(item.total));

      // Confirm in console
      console.log('✅ Apex Data:', data);
      console.log('✅ Labels:', [...labels]);
      console.log('✅ Totals:', [...totals]);

      this.pieConfig = {
        type: 'pie',
        data: {
          labels: [...labels], // <- Must spread
          datasets: [{
            data: [...totals], // <- Must spread
            backgroundColor: this.getColors(labels.length)
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      };
    } else if (error) {
      console.error('❌ Apex error:', error);
    }
  }

  getColors(count) {
    const palette = ['#4CAF50','#FF9800','#2196F3','#E91E63','#9C27B0','#03A9F4'];
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
  }
}

















