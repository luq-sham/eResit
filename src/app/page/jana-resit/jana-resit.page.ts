import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { TabelService } from 'src/app/components/table/service/tabel-service';
import { ApiService } from 'src/app/services/api-service';
import { LoadingService } from 'src/app/services/loading-service';
import { ModalController } from '@ionic/angular';
import { ModalLihatPembayaranComponent } from 'src/app/components/modal-lihat-pembayaran/modal-lihat-pembayaran.component';


@Component({
  selector: 'app-jana-resit',
  templateUrl: './jana-resit.page.html',
  styleUrls: ['./jana-resit.page.scss'],
  standalone: false
})
export class JanaResitPage implements OnInit {

  category: any = 1
  searchText: string = '';
  tableHeader: any;
  tableData: any[] = [];
  tablePaging = { currentPage: 1, record: 10, totalPages: 1 };

  isLoading = true

  constructor(
    private tableService: TabelService,
    private apiService: ApiService,
    private alertService: AlertService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.initTableHeader();
    this.initData();
  }

  // -------------------- TABLE SETUP --------------------
  initTableHeader() {
    this.tableHeader = this.tableService.getTableHeader('jana-resit');
  }

  async initData(isFiltered?: any) {
    if (!isFiltered) this.isLoading = true

    const params = {
      page: this.tablePaging.currentPage,
      table_type: 1,
      record: this.tablePaging.record,
      search: this.searchText,
      category: this.category
    };

    this.apiService.getPaymentDetailsFiltered(params).subscribe({
      next: async (res) => {
        this.tableData = res.return_value_set_1;

        this.tableData = res.return_value_set_1.map((item: any) => {
          const total = item.detailsBayaran.reduce(
            (acc: number, curr: any) => acc + (curr.jumlah || 0),
            0
          );
          return { ...item, total };
        });

        this.tablePaging.totalPages = res.total_pages;
        this.isLoading = false
      },
      error: async () => {
        this.isLoading = false
        this.alertService.apiErrorAlert();
      }
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
    this.tablePaging.currentPage = 1;
    this.initData()
  }

  onClick(item: any) {
    this.onPrint(item);
  }

  // -------------------- PDF PRINT --------------------
  async onPrint(item: any) {
    const modal = await this.modalCtrl.create({
      component: ModalLihatPembayaranComponent,
      componentProps: { data: item },
      backdropDismiss: false,
      cssClass: 'lihat-pembayaran-modal'
    })

    await modal.present()
    const { data } = await modal.onDidDismiss()

    if (data) {
      this.initData()
    }
  }

}
