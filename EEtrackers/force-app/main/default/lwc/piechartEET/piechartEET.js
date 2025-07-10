// piechartEET.js
import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import CHART from '@salesforce/resourceUrl/ChartJs';

export default class PiechartEET extends LightningElement {
  chart;
  chartJsInitialized = false;
  chartJsLoaded = false;
  _config = null;

  @api
  set pieConfig(value) {
    this._config = JSON.parse(JSON.stringify(value)); // remove Proxy
    this.tryRenderChart();
  }

  get pieConfig() {
    return this._config;
  }

  renderedCallback() {
    if (this.chartJsInitialized) return;

    this.chartJsInitialized = true;
    loadScript(this, CHART)
      .then(() => {
        console.log('✅ Chart.js loaded');
        this.chartJsLoaded = true;
        this.tryRenderChart();
      })
      .catch(error => {
        console.error('❌ Chart.js load failed:', error);
      });
  }

  tryRenderChart() {
    if (!this.chartJsLoaded || !this._config) {
      console.warn('⏳ Waiting for Chart.js or config...');
      return;
    }

    const canvas = this.template.querySelector('canvas');
    if (!canvas) {
      console.error('❌ Canvas not found.');
      return;
    }

    const ctx = canvas.getContext('2d');
    this.chart = new window.Chart(ctx, this._config);
    console.log('✅ Chart rendered.');
  }
}





















