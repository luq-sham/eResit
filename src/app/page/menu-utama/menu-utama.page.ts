import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabelService } from 'src/app/components/table/service/tabel-service';
import localeMs from '@angular/common/locales/ms';
import { registerLocaleData } from '@angular/common';
import { ApiService } from 'src/app/services/api-service';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { LoadingService } from 'src/app/services/loading-service';

registerLocaleData(localeMs, 'ms-MY');

export interface menuConfig {
  title: string,
  icon: string,
  url: string,
  color?: string,
}

@Component({
  selector: 'app-menu-utama',
  templateUrl: './menu-utama.page.html',
  styleUrls: ['./menu-utama.page.scss'],
  standalone: false
})

export class MenuUtamaPage {

  menuConfig: menuConfig[] = [
    { title: 'Rekod Pembayaran', icon: 'calculator', url: 'rekod-pembayaran', color: '' },
    { title: 'Jana Resit Pembayaran', icon: 'print', url: '', color: '' },
  ]

  cardConfig = [
    { icon: 'file-tray-full', title: 'Bilangan Pembayaran', count: 0, type: 'display' },
    { icon: 'document-text', title: 'Bilangan Resit Dijana', count: 0, type: 'display', iconColor: 'warning' },
    { icon: 'cash', title: 'Jumlah Pembayaran', count: 0, type: 'currency', iconColor: 'success' },
  ]

  today: Date = new Date();

  paging = { currentPage: 1, totalPages: 10, record: 5 }
  tableData: any[] = [];
  tableHeader: any

  constructor(
    private tableHeaderService: TabelService,
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.initTableHeader()
  }

  ionViewWillEnter() {
    this.paging = { currentPage: 1, totalPages: 10, record: 5 }
    this.initData();
  }

  initTableHeader() {
    this.tableHeader = this.tableHeaderService.getTableHeader('main-menu')
  }

  async initData() {
    await this.loadingService.showDefaultMessage()

    this.apiService.getCardValue().subscribe({
      next: (res) => {
        this.cardConfig[0].count = res.return_value_set_1.bilanganBayaran
        this.cardConfig[2].count = res.return_value_set_1.jumlahBayaran
      },
      error: (res) => {
        this.alertService.apiErrorAlert()

      }
    })

    this.apiService.getPaymentDetails(this.paging.currentPage).subscribe({
      next: (res) => {
        this.tableData = res.return_value_set_1
        
        this.paging.totalPages = res.total_pages
        this.paging.record = res.record
      },
      error: (res) => {
        this.alertService.apiErrorAlert()
      }
    })

    await this.loadingService.dismiss()
  }

  onClickBtn(url: string) {
    this.router.navigate([url])
  }

  onPageChange(page: number) {
    this.paging.currentPage = page;
    this.initData();
  }

}
