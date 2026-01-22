import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: false
})
export class TableComponent implements OnInit {
  @Input() tableTitle: any
  @Input() hasTableTitle: boolean = true

  @Input() tableHeader: any[] = []
  @Input() tableData: any[] = []
  @Input() showBilangan: boolean = true

  currentPage: any = 1
  totalPages: any = 10
  today: Date = new Date();

  constructor() { }

  ngOnInit() { }

}
