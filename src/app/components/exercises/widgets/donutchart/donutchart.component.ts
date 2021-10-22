import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Genderize } from 'src/app/interfaces/genderize';
Chart.register(...registerables);

@Component({
  selector: 'app-donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css']
})
export class DonutchartComponent{
  public myChart!: Chart;
  @Input() data!: Genderize;
  public dataChart: number[];

  constructor(){
    this.dataChart = [];
  }

  public drawChart(datas: Genderize): void {
    
    this.getGenderProbability(datas);
    if (this.myChart) {
      this.myChart.destroy();
  }
    this.myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
          labels: ['Male', 'Female'],
          datasets: [{
              label: 'Expenditures',
              data: this.dataChart,
              backgroundColor: [
                'rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
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
                        return datas.dataset.data[datas.dataIndex] + '%';
                    }
                }
            }
        }
    }
  });
  }

  public getGenderProbability(data: Genderize) {
    this.dataChart = [];
    let probability = data.probability;
    if (data.gender === 'male') {
      this.dataChart.push(probability*100, 100-(probability*100));
    } else {
      this.dataChart.push(100-(probability*100), probability*100);
    }
  }
}
