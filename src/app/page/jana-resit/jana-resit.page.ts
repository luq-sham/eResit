import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { TabelService } from 'src/app/components/table/service/tabel-service';
import { ApiService } from 'src/app/services/api-service';
import { ResitService } from './service/resit-service';


@Component({
  selector: 'app-jana-resit',
  templateUrl: './jana-resit.page.html',
  styleUrls: ['./jana-resit.page.scss'],
  standalone: false
})
export class JanaResitPage implements OnInit {

  searchText: string = '';
  tableHeader: any;
  tableData: any[] = [];
  tablePaging = { currentPage: 1, record: 10, totalPages: 1 };

  constructor(
    private tableService: TabelService,
    private apiService: ApiService,
    private alertService: AlertService,
    private resitService: ResitService
  ) { }

  ngOnInit() {
    this.initTableHeader();
    this.initData();
  }

  // -------------------- TABLE SETUP --------------------
  initTableHeader() {
    this.tableHeader = this.tableService.getTableHeader('jana-resit');
  }

  initData() {
    const params = {
      page: this.tablePaging.currentPage,
      record: this.tablePaging.record,
      search: this.searchText
    };

    this.apiService.getPaymentDetailsFiltered(params).subscribe({
      next: (res) => {
        this.tableData = res.return_value_set_1;
        this.tablePaging.totalPages = res.total_pages;
      },
      error: () => this.alertService.apiErrorAlert()
    });
  }

  onPageChange(page: number) {
    this.tablePaging.currentPage = page;
    this.initData();
  }

  onRecordChange(record: number) {
    this.tablePaging.record = record;
    this.tablePaging.currentPage = 1;
    this.initData();
  }

  // -------------------- SEARCH --------------------
  onSearch() {
    this.initData()
  }

  onClick(item: any) {
    this.onPrint(item);
  }

  // -------------------- PDF PRINT --------------------
  async onPrint(item: any) {
    this.resitService.generateReceipt(item)
  }

}
