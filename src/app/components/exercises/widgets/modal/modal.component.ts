import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public urlIcon: string;

  constructor() {
    this.urlIcon = 'assets/help.png';
   }

  ngOnInit(): void {
  }

}
