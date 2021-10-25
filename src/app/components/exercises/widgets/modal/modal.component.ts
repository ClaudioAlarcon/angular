import { Component, Input, OnInit } from '@angular/core';
import { DonutData } from 'src/app/interfaces/donut-data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent{
  @Input() modalTexts!: string[];

 
  public modalTarget!: string;

  constructor() {
    if (this.modalTexts) {
      this.modalTarget = '#genderizeModel';
    }
    
   }
}
