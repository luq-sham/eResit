import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: false,
})
export class TableComponent implements OnInit {
  @Input() tableTitle: any;
  @Input() hasTableTitle = true;
  @Input() isLoading = true;

  @Input() tableHeader: any[] = [];
  @Input() tableData: any[] = [];
  @Input() tablePaging = { currentPage: 1, record: 10, totalPages: 1 };

  @Input() showBilangan = true;
  @Input() showPaging = true;


  @Output() pageChange = new EventEmitter<number>();
  @Output() recordChange = new EventEmitter<number>();
  @Output() onButtonClick = new EventEmitter();

  today: Date = new Date();
  recordOptions = [5, 10, 20, 50];
  badgeText = '';


  ngOnInit() { }

  getBadgeColor(status: string) {
    if (status) {
      this.badgeText = 'telah dijana'
      return 'var(--ion-color-success)'
    } else {
      this.badgeText = 'belum dijana'
      return 'var(--ion-color-warning)'
    }
  }

  onEdit(item: any) {
    this.onButtonClick.emit(item)
  }

  onDelete(item: any) { }

  onClickBtn(item: any) {
    this.onButtonClick.emit(item)
  }

  changePage(page: number) {
    const totalPages = this.tablePaging.totalPages;

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    this.tablePaging.currentPage = page;
    this.pageChange.emit(page);
  }

  get totalData(): number {
    return this.tablePaging.record;
  }


  onRecordChange(record: number) {
    this.tablePaging.record = record;
    this.tablePaging.currentPage = 1;
    this.recordChange.emit(record);
  }
}
