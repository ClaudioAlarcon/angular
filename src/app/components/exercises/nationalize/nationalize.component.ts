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
    this.urlEndpoint = 'https://api.nationalize.io/?name=';
    this.name= '';
    this.urlIcon = 'assets/help.png';
    this.nationalizeModalTexts = [
      'nationalizeModel',
      'What is Nationalize?',
      'Nationalize is an angular proyect that predicts the nationality of a person based on their name'];
    // Donut Chart's Config
    this.dataNationalize= {
      type: 'chartNationalize',
      backgroundColor:['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 99, 132)'],
      labels:[],
      symbol: '%',
      // Don't set any data
      data:[]}
   }

  ngOnInit(): void {
  }

  public getEndpointData(): void {
    this.name = (<HTMLInputElement>document.getElementById("name2")).value;
    this.endpoint.getData(this.urlEndpoint+this.name).subscribe((res: Nationalize) => {
    console.log(res);
    this.getNationalizeProbability(res);
    this.onUpdateChild(this.dataNationalize)
  });
}
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

  public onUpdateChild(data: DonutData) {
    this.childC.drawChart(data);
  }
}
