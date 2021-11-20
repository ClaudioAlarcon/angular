import { Component, OnInit, ViewChild } from '@angular/core';
import { DonutData } from 'src/app/interfaces/donut-data';
import { NationData } from 'src/app/interfaces/nation-data';
import { countryProbability, Nationalize } from 'src/app/interfaces/nationalize';
import { NationalizeTable } from 'src/app/interfaces/nationalize-table';
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
  public urlCountryInfo: string;
  public tableDatas!: NationalizeTable[];
  public tableData!: NationalizeTable;
  public tableHeaders: string[];
  public showTable: boolean = false;

  constructor(public endpoint: EndpointService) {
    // Country info
    this.urlCountryInfo = 'https://restcountries.com/v3.1/alpha/';
    // End point url
    this.urlEndpoint = 'https://api.nationalize.io/?name=';
    this.name= '';
    this.urlIcon = 'assets/help.png';
    // Modal texts
    this.nationalizeModalTexts = [
      'nationalizeModel',
      'What is Nationalize?',
      'Nationalize is an angular proyect that predict the nationality of a person based on their name.'];
    // Donut Chart's Config
    this.dataNationalize= {
      type: 'chartNationalize',
      backgroundColor:['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(251, 255, 0)'],
      labels:[],
      symbol: '%',
      // Don't set any data
      data:[]}
      // Table headers
    this.tableHeaders= [
      'N°', 
      'Name', 
      'Flag', 
      'Id', 
      'Probability']

   }
   

  ngOnInit(): void {
  }

  /**
  * This function is called when the user clicks on the button to get the endpoint data
  */
  public getEndpointData(): void {
    this.name = (<HTMLInputElement>document.getElementById("name2")).value;
    this.endpoint.getData(this.urlEndpoint+this.name).subscribe((res: Nationalize) => {
    this.getCountryInfo(res.country);
    this.getNationalizeProbability(res);
    this.onUpdateChild(this.dataNationalize)
  });
}

  /**
  * This function group data for table
  * @param countryId This is the country id to show in table
  * * @param probability This is the probability id to show in table
  */
  public getNationData(countryId: string, probability: string){
    this.endpoint.getData(this.urlCountryInfo+countryId+'?fields=name,flags').subscribe((res: NationData) => {
      this.tableData = {name: '', flag: '', code: '', probability: ''};
      this.tableData.name = res.name.common;
      this.tableData.flag = res.flags.png;
      this.tableData.code = countryId;
      this.tableData.probability = probability;
      this.tableDatas.push(this.tableData);
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
      probabilities.push(Math.trunc(element.probability*100));
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

  /**
  * This function sends id and probability to tables's data
  * @param endpointData This is the endpoint data from the API
  */
  public getCountryInfo(endpointData: countryProbability[]) {
    this.tableDatas = [];
    endpointData.forEach(element => {
      this.getNationData(element.country_id, Math.trunc(element.probability*100).toString());
    });
    this.showTable = true;
  }
}
