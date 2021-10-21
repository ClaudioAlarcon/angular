import { Component, OnInit } from '@angular/core';
import { Genderize } from 'src/app/interfaces/genderize';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-genderize',
  templateUrl: './genderize.component.html',
  styleUrls: ['./genderize.component.css']
})
export class GenderizeComponent implements OnInit {
  public data: any;
  public gender: any;

  constructor(public endpoint: EndpointService) { }

  ngOnInit(): void {
  }

  public getEndpointData(): void {
    this.data = GenderizeComponent;
    this.endpoint.getData('https://api.genderize.io/?name=claudio').subscribe((res: Genderize) => {
    this.data = res;
  });
}

}
