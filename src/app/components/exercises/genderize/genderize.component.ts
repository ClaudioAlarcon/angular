import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DonutData } from 'src/app/interfaces/donut-data';
import { Genderize } from 'src/app/interfaces/genderize';
import { EndpointService } from 'src/app/services/endpoint.service';
import { DonutchartComponent } from '../widgets/donutchart/donutchart.component';

@Component({
  selector: 'app-genderize',
  templateUrl: './genderize.component.html',
  styleUrls: ['./genderize.component.css']
})
export class GenderizeComponent implements OnInit {

  @ViewChild(DonutchartComponent, { static: false }) childC!: DonutchartComponent;

  public data!: DonutData;
  public gender: string;
  public urlEndpoint: string;
  public urlImage: string;
  public name: string;
  public count!: number;
  public chart1!: Chart;
  public genderizeModalTexts: string[];
  public urlIcon: string;

  constructor(public endpoint: EndpointService) {
    // Genderize endpoint
    this.urlEndpoint = 'https://api.genderize.io/?name=';
    this.gender = '';
    this.urlImage = '';
    this.name= '';
    this.urlIcon = 'assets/help.png';
    // Here are the modal texts
    this.genderizeModalTexts = [
      'genderizeModel',
      'What is Genderize?',
      'Genderize is an angular proyect that predicts the gender of a person based on their name.'
    ]
    // Donut Chart's Config
    this.data= {
      type: 'genderizeChart',
      backgroundColor:['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
      labels:['Male', 'Female'],
      symbol: '%',
      // Don't set any data
      data:[]}
  }

  ngOnInit(): void {
  }
  
  /**
  * This function is called when the user clicks on the button to get the endpoint data
  */
  public getEndpointData(): void {
    this.name = (<HTMLInputElement>document.getElementById("name")).value;
    this.endpoint.getData(this.urlEndpoint+this.name).subscribe((res: Genderize) => {
    this.getGenderProbability(res);
    this.count = res.count;
    this.gender = res.gender;
    this.urlImage = 'assets/genderize/'+this.gender+'.jpg';
    this.onUpdateChild(this.data)
  });
}

  /**
  * This function calculates the gender probability in both genders for charts
  * @param endpointData This is the endpoint data from the API
  */
  public getGenderProbability(endpointData: Genderize){
    let dataChart: number[] = [];
    let probability = endpointData.probability;
    if (endpointData.gender === 'male') {
      dataChart.push(probability*100, 100-(probability*100));
    } else {
      dataChart.push(100-(probability*100), probability*100);
    }
    this.data.data = dataChart;
  }

  /**
  * This function sends the data to the child component
  * @param data data prepared for the child component
  */
  public onUpdateChild(data: DonutData) {
    this.childC.drawChart(data);
  }
}
