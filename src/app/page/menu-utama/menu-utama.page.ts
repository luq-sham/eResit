import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabelService } from 'src/app/components/table/service/tabel-service';
import localeMs from '@angular/common/locales/ms';
import { registerLocaleData } from '@angular/common';
import { ApiService } from 'src/app/services/api-service';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';

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

export class MenuUtamaPage implements OnInit {

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

  currentPage: any = 1
  totalPages: any = 10
  tableData: any[] = [
  ];
  tableHeader: any

  constructor(
    private tableHeaderService: TabelService,
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.initTableHeader()
    this.initData()
  }

  initData() {
    this.apiService.getCardValue().subscribe({
      next: (res) => {
        this.cardConfig[0].count = res.return_value_set_1.bilanganBayaran
        this.cardConfig[2].count = res.return_value_set_1.jumlahBayaran
      },
      error: (res) => {
        this.alertService.apiErrorAlert()

      }
    })
  }

  initTableHeader() {
    this.tableHeader = this.tableHeaderService.getTableHeader('main-menu')
  }

  onClickBtn(url: string) {
    this.router.navigate([url])
  }

}
