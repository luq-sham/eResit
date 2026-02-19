import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeMs from '@angular/common/locales/ms';

import { TabelService } from 'src/app/components/table/service/tabel-service';
import { ApiService } from 'src/app/services/api-service';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { count, firstValueFrom } from 'rxjs';
import { MenuButtonServices } from './services/menu-button-services';

registerLocaleData(localeMs, 'ms-MY');

@Component({
  selector: 'app-menu-utama',
  templateUrl: './menu-utama.page.html',
  styleUrls: ['./menu-utama.page.scss'],
  standalone: false,
})
export class MenuUtamaPage {
  today = new Date();
  isLoading = true
  segmentValue = 'pelajar'

  menuConfig: any[] = [];
  cardConfig: any[] = [];

  menuConfig2: any[] = [];
  cardConfig2: any[] = [];

  paging = { currentPage: 1, record: 10, totalPages: 10 };

  tableHeader: any;
  tableData: any[] = [];

  constructor(
    private tableHeaderService: TabelService,
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertService,
    private menuBtnService: MenuButtonServices,
  ) { }

  ngOnInit() {
    this.loadTableHeader();
    this.initConfig()
  }

  initConfig() {
    this.menuConfig = this.menuBtnService.getMenuButtonConfig('pelajar-dashboard')
    this.cardConfig = this.menuBtnService.getCardConfig('pelajar-dashboard')

    this.menuConfig2 = this.menuBtnService.getMenuButtonConfig('kakitangan-dashboard')
    this.cardConfig2 = this.menuBtnService.getCardConfig('kakitangan-dashboard')
  }

  loadTableHeader() {
    this.tableHeader = this.tableHeaderService.getTableHeader('main-menu');
  }

  async ionViewWillEnter() {
    await this.loadBySegment();
  }

  async onSegmentChange() {
    await this.loadBySegment();
  }

  private async loadBySegment() {
    this.isLoading = true;

    try {
      switch (this.segmentValue) {
        case 'pelajar':
          await Promise.all([
            this.loadTableData(),
            this.loadCardData()
          ]);
          break;
        case 'kakitangan':
          await Promise.all([
            this.loadCardDataStaff(),
            this.loadTableData()
          ]);
          break;
      }
    } finally {
      this.isLoading = false; // ALWAYS runs
    }
  }

  async loadCardData() {
    const res: any = await firstValueFrom(this.apiService.getCardValue());

    const data = res.return_value_set_1;

    this.cardConfig = [
      { ...this.cardConfig[0], count: data.bilanganBayaran },
      { ...this.cardConfig[1], count: data.bilanganResitDijana },
      { ...this.cardConfig[2], count: data.jumlahBayaran }
    ];
  }

  async loadTableData() {
    const param = {
      page: this.paging.currentPage,
      record: this.paging.record
    };

    const res: any = await firstValueFrom(this.apiService.getPaymentDetails(param));

    this.tableData = res.return_value_set_1;
    this.paging.totalPages = res.total_pages;
  }

  async loadCardDataStaff() {

    try {
      const res: any = await firstValueFrom(this.apiService.getCardValueStaff());
      const data = res.return_value_set_1;

      this.cardConfig2 = [
        { ...this.cardConfig2[0], count: data.bilanganStaff },
        { ...this.cardConfig2[1], count: data.bilanganPayslip },
      ]
    } catch (err) {
      this.alertService.apiErrorAlert()
    }

  }

  onClickBtn(url: string) {
    if (url.length < 1) {
      this.alertService.warningAlert('Makluman', 'Perkhidmatan ini masih dalam proses pembangunan dan belum tersedia buat masa ini.', 'Tutup')
      return
    }
    this.router.navigate([url]);
  }
}
