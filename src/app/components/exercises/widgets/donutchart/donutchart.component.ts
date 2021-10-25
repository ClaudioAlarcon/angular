import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DonutData } from 'src/app/interfaces/donut-data';

Chart.register(...registerables);

@Component({
  selector: 'app-donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css']
})
export class DonutchartComponent{
  
  public myChart!: Chart;
  public symbol!: string;
  @Input() data!: DonutData;

  constructor(){
  }

  /**
  * This function is called when the component is initialized drawing the chart with endpoint data.
  * @param data The data to be used to draw the chart.
  */
  public drawChart(data: DonutData): void {
    if (this.myChart) {
      this.myChart.destroy();
  }
    this.myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
          labels: this.data.labels,
          datasets: [{
              label: 'Expenditures',
              data: this.data.data,
              backgroundColor: this.data.backgroundColor,
              hoverOffset: 4,
          }]
      },
      options: {
        plugins: {
            tooltip: {
                usePointStyle: true,
                callbacks: {
                    labelPointStyle: function(context) {
                        return {
                            pointStyle: 'circle',
                            rotation: 0
                        };
                    },
                    label: function(datas) {
                        return data.data[datas.dataIndex] + data.symbol;
                    }
                }
            }
        }
    }
  });
  }
}
