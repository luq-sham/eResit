import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input() tablePaging = { currentPage: 1, record: 5, totalPages: 10 }

  today: Date = new Date();

  @Output() pageChange = new EventEmitter<number>()

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

  changePage(page: number) {
    // Clamp page between 1 and totalPages
    if (page < 1) page = 1;
    if (page > this.tablePaging.totalPages) page = this.tablePaging.totalPages;

    // Update current page
    this.tablePaging.currentPage = page;

    // Emit event to parent so API can fetch data
    this.pageChange.emit(page);
  }



}
