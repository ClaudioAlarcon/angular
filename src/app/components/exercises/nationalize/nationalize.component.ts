import { Component, OnInit, ViewChild } from '@angular/core';
import { DonutData } from 'src/app/interfaces/donut-data';
import { countryProbability, Nationalize } from 'src/app/interfaces/nationalize';
import { Table, TableData } from 'src/app/interfaces/table';
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
  public dataTable!: Table;
  public dataId!: string[];
  public dataProbability!: number[];
  public showTable: boolean = false;
  public tabled!: TableData;
  public tableData!: Table;

  constructor(public endpoint: EndpointService) {
    this.urlEndpoint = 'https://api.nationalize.io/?name=';
    this.name= '';
    this.urlIcon = 'assets/help.png';
    this.tabled = {flag: '', id: '', probability: ''};
    this.dataTable = {headers: [
      'N°',
      'Flag',
      'Id',
      'Probability'
    ], rows: []};
    this.nationalizeModalTexts = [
      'nationalizeModel',
      'What is Nationalize?',
      'Nationalize is an angular proyect that predicts the nationality of a person based on their name'];
    // Donut Chart's Config
    this.dataNationalize= {
      type: 'chartNationalize',
      backgroundColor:['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 255, 0)'],
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
      if (res.country) {
        this.setDataTable(res.country)
        this.showTable = true;
      }
    this.getNationalizeProbability(res);
    this.onUpdateChild(this.dataNationalize)
  });
}

 /**
  * This function calculates the gender probability in both genders for charts
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

  public onUpdateChild(data: DonutData) {
    this.childC.drawChart(data);
  }

  public setDataTable(res: countryProbability[]){
    this.dataTable.rows = [];
    res.forEach(element => {
      this.tabled = {flag: '', id: '', probability: ''};
      this.tabled.flag = 'https://flagcdn.com/16x12/'+element.country_id.toLowerCase()+'.png';
      this.tabled.id = element.country_id;
      this.tabled.probability = (Math.trunc(element.probability*100)).toString()+'%';
      this.dataTable.rows.push(this.tabled);
    });
  }
}
