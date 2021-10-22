import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  showChild: boolean = true;

  
  public data!: Genderize;
  public gender: string;
  public url: string;
  public name: string;

  constructor(public endpoint: EndpointService) { 
    this.gender = '';
    this.url = '';
    this.name= '';
  }

  ngOnInit(): void {
  }
  
  public getEndpointData(): void {
    this.name = (<HTMLInputElement>document.getElementById("name")).value;
    this.endpoint.getData('https://api.genderize.io/?name='+this.name).subscribe((res: Genderize) => {
    this.data = res;
    console.log(this.data);
    this.gender = res.gender;
    this.url = 'assets/genderize/'+this.gender+'.jpg';
    this.onUpdateChild(this.data)
  });
}
onUpdateChild(data: Genderize) {
  this.childC.drawChart(data);
}

}
