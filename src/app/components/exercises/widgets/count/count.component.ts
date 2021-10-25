import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent{
  
  // Data coming from the parent component
  @Input() count!: number;
  
  constructor() { }
}
