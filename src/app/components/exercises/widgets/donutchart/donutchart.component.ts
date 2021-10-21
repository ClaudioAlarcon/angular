import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css']
})
export class DonutchartComponent implements OnInit {

  ngOnInit(): void {
    var myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
          labels: ['Female', 'Male'],
          datasets: [{
              label: 'My First Dataset',
              data: [90, 10],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
              ],
              hoverOffset: 4
          }]
      }
  });
  }
}
