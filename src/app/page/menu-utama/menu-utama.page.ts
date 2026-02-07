import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeMs from '@angular/common/locales/ms';

import { TabelService } from 'src/app/components/table/service/tabel-service';
import { ApiService } from 'src/app/services/api-service';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { firstValueFrom } from 'rxjs';

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
  isLoading = true

  menuConfig: MenuConfig[] = [
    { title: 'Rekod Pembayaran', icon: 'calculator', url: 'rekod-pembayaran' },
    { title: 'Jana Resit Pembayaran', icon: 'print', url: 'jana-resit' },
    // { title: 'Kemaskini Pembayaran', icon: 'folder-open', url: '' },
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
    await this.loadTableData();
    await this.loadCardData();

    this.isLoading = false
  }

  async loadCardData() {
    try {
      const res: any = await firstValueFrom(this.apiService.getCardValue());

      this.cardConfig[0].count = res.return_value_set_1.bilanganBayaran;
      this.cardConfig[2].count = res.return_value_set_1.jumlahBayaran;
    } catch {
      this.alertService.apiErrorAlert();
    }
  }

  async loadTableData() {
    try {
      const param = {
        page: this.paging.currentPage,
        record: this.paging.record
      };

      const res: any = await firstValueFrom(this.apiService.getPaymentDetails(param));

      this.tableData = res.return_value_set_1.map((item: any) => {
        const total = item.detailsBayaran.reduce(
          (acc: number, curr: any) => acc + (curr.jumlah || 0),
          0
        );
        return { ...item, total };
      });

      this.paging.totalPages = res.total_pages;
    } catch {
      this.alertService.apiErrorAlert();
    }
  }


  onClickBtn(url: string) {
    if (url.length < 1) {
      this.alertService.warningAlert('Makluman', 'Perkhidmatan ini masih dalam proses pembangunan dan belum tersedia buat masa ini.', 'Tutup')
      return
    }
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
