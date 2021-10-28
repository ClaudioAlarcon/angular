import { Component, OnInit, ViewChild } from '@angular/core';
import { DonutData } from 'src/app/interfaces/donut-data';
import { Nationalize } from 'src/app/interfaces/nationalize';
import { EndpointService } from 'src/app/services/endpoint.service';
import { DonutchartComponent } from '../widgets/donutchart/donutchart.component';

@Component({
  selector: 'app-nationalize',
  templateUrl: './nationalize.component.html',
  styleUrls: ['./nationalize.component.css']
})
export class NationalizeComponent implements OnInit {
  @ViewChild(DonutchartComponent, { static: false }) childC!: DonutchartComponent;
  public dataNationalize!: DonutData;
  public urlEndpoint: string;
  public name: string;
  public nationalizeModalTexts: string[];
  public urlIcon: string;

  constructor(public endpoint: EndpointService) {
    // End point url
    this.urlEndpoint = 'https://api.nationalize.io/?name=';
    this.name= '';
    this.urlIcon = 'assets/help.png';
    // Modal texts
    this.nationalizeModalTexts = [
      'nationalizeModel',
      'What is Nationalize?',
      'Genderize is an angular proyect that calculates the gender probability of a name, showing an image depending of major gender probability, a chart and a count'];
    // Donut Chart's Config
    this.dataNationalize= {
      type: 'chartNationalize',
      backgroundColor:['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(251, 255, 0)'],
      labels:[],
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
    this.name = (<HTMLInputElement>document.getElementById("name2")).value;
    this.endpoint.getData(this.urlEndpoint+this.name).subscribe((res: Nationalize) => {
    console.log(res);
    this.getNationalizeProbability(res);
    this.onUpdateChild(this.dataNationalize)
  });
}

  /**
  * This function calculates the nationalize probability
  * @param endpointData This is the endpoint data from the API
  */
  public getNationalizeProbability(endpointData: Nationalize){
    let nations: string[] = [];
    let probabilities: number[] = [];
    endpointData.country.forEach(element => {
      nations.push(element.country_id);
      probabilities.push(element.probability*100);
    }); {
    }
    this.dataNationalize.labels = nations;
    this.dataNationalize.data = probabilities;
  }

  /**
  * This function sends the data to the child component
  * @param data data prepared for the child component
  */
  public onUpdateChild(data: DonutData) {
    this.childC.drawChart(data);
  }
}
