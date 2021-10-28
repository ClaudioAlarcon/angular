import { Component, Input, OnInit } from '@angular/core';
import { NationalizeTable } from 'src/app/interfaces/nationalize-table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{
  @Input() tableDatas!: NationalizeTable[];
  @Input() tableHeaders!: string[];

  constructor() { }
}
