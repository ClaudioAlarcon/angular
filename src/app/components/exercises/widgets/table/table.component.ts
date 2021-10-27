import { Component, Input, OnInit } from '@angular/core';
import { Nationalize } from 'src/app/interfaces/nationalize';
import { Table, TableData } from 'src/app/interfaces/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{
  title = 'CustomTable';
  @Input() tableData!: Table;
}
