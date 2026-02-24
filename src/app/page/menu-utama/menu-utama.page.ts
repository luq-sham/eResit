import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeMs from '@angular/common/locales/ms';
import { firstValueFrom } from 'rxjs';

import { TabelService } from 'src/app/components/table/service/tabel-service';
import { ApiService } from 'src/app/services/api-service';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { MenuButtonServices } from './services/menu-button-services';

registerLocaleData(localeMs, 'ms-MY');

@Component({
  selector: 'app-menu-utama',
  templateUrl: './menu-utama.page.html',
  styleUrls: ['./menu-utama.page.scss'],
  standalone: false,
})
export class MenuUtamaPage implements OnInit {
  today = new Date();
  isLoading = true;
  segmentValue = 'pelajar';

  menuConfig: any[] = [];
  cardConfig: any[] = [];
  menuConfig2: any[] = [];
  cardConfig2: any[] = [];

  paging = { currentPage: 1, record: 5, totalPages: 10 };
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
    this.tableHeader = this.tableHeaderService.getTableHeader('main-menu');
    this.initConfig();
  }

  async ionViewWillEnter() {
    await this.loadBySegment();
  }

  initConfig() {
    this.menuConfig = this.menuBtnService.getMenuButtonConfig('pelajar-dashboard');
    this.cardConfig = this.menuBtnService.getCardConfig('pelajar-dashboard');
    this.menuConfig2 = this.menuBtnService.getMenuButtonConfig('kakitangan-dashboard');
    this.cardConfig2 = this.menuBtnService.getCardConfig('kakitangan-dashboard');
  }

  async onSegmentChange() {
    await this.loadBySegment();
  }

  private async loadBySegment() {
    this.isLoading = true;
    try {
      const tasks = [this.loadTableData()];

      if (this.segmentValue === 'pelajar') {
        tasks.push(this.loadCardData());
      } else {
        tasks.push(this.loadCardDataStaff());
      }

      await Promise.all(tasks);
    } catch (error) {
      this.alertService.apiErrorAlert();
    } finally {
      this.isLoading = false;
    }
  }

  async loadCardData() {
    const res: any = await firstValueFrom(this.apiService.getCardValue());
    const data = res.return_value_set_1;

    this.cardConfig = this.cardConfig.map((card, index) => {
      const counts = [data.bilanganBayaran, data.bilanganResitDijana, data.jumlahBayaran];
      return { ...card, count: counts[index] };
    });
  }

  async loadCardDataStaff() {
    const res: any = await firstValueFrom(this.apiService.getCardValueStaff());
    const data = res.return_value_set_1;

    this.cardConfig2 = this.cardConfig2.map((card, index) => {
      const counts = [data.bilanganStaff, data.bilanganPayslip];
      return { ...card, count: counts[index] };
    });
  }

  async loadTableData() {
    const param = { page: this.paging.currentPage, record: this.paging.record };
    const res: any = await firstValueFrom(this.apiService.getPaymentDetails(param));

    this.tableData = res.return_value_set_1;
    this.paging.totalPages = res.total_pages;
  }

  onClickBtn(url: string) {
    if (!url) {
      this.alertService.warningAlert(
        'Makluman',
        'Perkhidmatan ini masih dalam proses pembangunan dan belum tersedia buat masa ini.',
        'Tutup'
      );
      return;
    }
    this.router.navigate([url]);
  }
}