import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import CHARTJS from '@salesforce/resourceUrl/ChartJs';

export default class DummyPieChart extends LightningElement {
  chart;
  isLoaded = false;

  renderedCallback() {
    if (this.isLoaded) return;
    this.isLoaded = true;

    console.log('Loading Chart.js from direct .js file...');

    loadScript(this, CHARTJS)
      .then(() => {
        console.log('Chart.js loaded successfully.');

        const canvas = this.template.querySelector('canvas');
        if (!canvas) {
          console.error('Canvas not found!');
          return;
        }

        const ctx = canvas.getContext('2d');
        this.chart = new window.Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Red', 'Blue', 'Yellow'],
            datasets: [{
              data: [12, 19, 3],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Chart.js failed to load:', error);
      });
  }
}


