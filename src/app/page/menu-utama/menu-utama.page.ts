import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabelService } from 'src/app/components/table/service/tabel-service';
import localeMs from '@angular/common/locales/ms';
import { registerLocaleData } from '@angular/common';

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
    // {
    //   namaPelajar: 'Aiman',
    //   jenisBayaran: 'Online',
    //   tarikhBayaran: new Date('2025-01-12'),
    //   jumlahBayaran: 300,
    //   status: 'Paid'
    // },
    // {
    //   namaPelajar: 'Siti Aminah',
    //   jenisBayaran: 'Cash',
    //   tarikhBayaran: new Date('2025-01-15'),
    //   jumlahBayaran: 250,
    //   status: 'Pending'
    // },
    // {
    //   namaPelajar: 'Muhammad Iqbal',
    //   jenisBayaran: 'Online',
    //   tarikhBayaran: new Date('2025-01-18'),
    //   jumlahBayaran: 400,
    //   status: 'Paid'
    // },
    // {
    //   namaPelajar: 'Nur Aisyah',
    //   jenisBayaran: 'Transfer Bank',
    //   tarikhBayaran: new Date('2025-01-20'),
    //   jumlahBayaran: 350,
    //   status: 'Failed'
    // },
    // {
    //   namaPelajar: 'Daniel',
    //   jenisBayaran: 'Cash',
    //   tarikhBayaran: new Date('2025-01-22'),
    //   jumlahBayaran: 200,
    //   status: 'Paid'
    // }
  ];
  tableHeader: any

  constructor(
    private tableHeaderService: TabelService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initTableHeader()
  }

  initTableHeader() {
    this.tableHeader = this.tableHeaderService.getTableHeader('main-menu')
  }

  onClickBtn(url: string) {
    this.router.navigate([url])
  }

}
