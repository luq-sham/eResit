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

  getBadgeColor(item: any) {
    switch (item) {
      case 'Paid':
        return 'var(--ion-color-success)'
      case 'Pending':
        return 'var(--ion-color-warning)'
      case 'Failed':
        return 'var(--ion-color-danger)'
      default:
        return 'var(--ion-color-success)'
    }
  }


  onEdit(item: any) {

  }

  onDelete(item: any) {

  }

  changePage(page: any) {

  }

}
