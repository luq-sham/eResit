import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabelService } from 'src/app/components/table/service/tabel-service';

export interface menuConfig {
  title: string,
  icon: string,
  url: string,
  color: string,
  description: string
}

@Component({
  selector: 'app-menu-utama',
  templateUrl: './menu-utama.page.html',
  styleUrls: ['./menu-utama.page.scss'],
  standalone: false
})

export class MenuUtamaPage implements OnInit {

  menuConfig: menuConfig[] = [
    { title: 'Rekod Pembayaran', icon: 'calculator', url: 'rekod-pembayaran', color: '', description: 'Isi Butiran-butiran Pembayaran' },
    { title: 'Jana Resit Pembayaran', icon: 'print', url: '', color: '', description: 'Cetak Resit Pembayaran' },
  ]

  today: Date = new Date();

  currentPage: any = 1
  totalPages: any = 10
  tableData: any[] = [

  ]
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
