import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeMs from '@angular/common/locales/ms';

import { TabelService } from 'src/app/components/table/service/tabel-service';
import { ApiService } from 'src/app/services/api-service';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { LoadingService } from 'src/app/services/loading-service';

registerLocaleData(localeMs, 'ms-MY');

export interface MenuConfig {
  title: string;
  icon: string;
  url: string;
  color?: string;
}

@Component({
  selector: 'app-menu-utama',
  templateUrl: './menu-utama.page.html',
  styleUrls: ['./menu-utama.page.scss'],
  standalone: false,
})
export class MenuUtamaPage {
  today = new Date();

  menuConfig: MenuConfig[] = [
    { title: 'Rekod Pembayaran', icon: 'calculator', url: 'rekod-pembayaran' },
    { title: 'Jana Resit Pembayaran', icon: 'print', url: 'jana-resit' },
  ];

  cardConfig = [
    { icon: 'file-tray-full', title: 'Bilangan Pembayaran', count: 0, type: 'display' },
    { icon: 'document-text', title: 'Bilangan Resit Dijana', count: 0, type: 'display', iconColor: 'warning' },
    { icon: 'cash', title: 'Jumlah Pembayaran', count: 0, type: 'currency', iconColor: 'success' },
  ];

  paging = { currentPage: 1, record: 10, totalPages: 10 };

  tableHeader: any;
  tableData: any[] = [];

  constructor(
    private tableHeaderService: TabelService,
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadTableHeader();
  }

  ionViewWillEnter() {
    this.resetPaging();
    this.loadData();
  }

  loadTableHeader() {
    this.tableHeader = this.tableHeaderService.getTableHeader('main-menu');
  }

  async loadData() {
    await this.loadingService.showDefaultMessage();

    this.loadCardData();
    this.loadTableData();

    await this.loadingService.dismiss();
  }

  loadCardData() {
    this.apiService.getCardValue().subscribe({
      next: ({ return_value_set_1 }) => {
        this.cardConfig[0].count = return_value_set_1.bilanganBayaran;
        this.cardConfig[2].count = return_value_set_1.jumlahBayaran;
      },
      error: () => this.alertService.apiErrorAlert(),
    });
  }

  loadTableData() {
    this.apiService.getPaymentDetails({ page: this.paging.currentPage, record: this.paging.record }).subscribe({
      next: (res) => {
        this.tableData = res.return_value_set_1;
        this.paging.totalPages = res.total_pages;
      },
      error: () => this.alertService.apiErrorAlert(),
    });
  }

  onClickBtn(url: string) {
    this.router.navigate([url]);
  }

  onPageChange(page: number) {
    this.paging.currentPage = page;
    this.loadTableData();
  }

  onRecordChange(record: number) {
    this.paging.record = record;
    this.paging.currentPage = 1;
    this.loadTableData();
  }

  private resetPaging() {
    this.paging.currentPage = 1;
  }
}
