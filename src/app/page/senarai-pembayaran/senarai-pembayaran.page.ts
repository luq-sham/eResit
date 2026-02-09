import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { ModalLihatPembayaranComponent } from 'src/app/components/modal-lihat-pembayaran/modal-lihat-pembayaran.component';
import { TabelService } from 'src/app/components/table/service/tabel-service';
import { ApiService } from 'src/app/services/api-service';

@Component({
  selector: 'app-senarai-pembayaran',
  templateUrl: './senarai-pembayaran.page.html',
  styleUrls: ['./senarai-pembayaran.page.scss'],
  standalone: false
})
export class SenaraiPembayaranPage implements OnInit {

  isLoading = true
  searchText: any = ''
  category: any = 1

  tableData: any
  tableHeader: any
  tablePaging = { currentPage: 1, record: 10, totalPages: 1 }

  constructor(
    private apiService: ApiService,
    private tableService: TabelService,
    private alertService: AlertService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.initTableHeader()
    this.initData()
  }

  initData() {
    let params = {
      page: this.tablePaging.currentPage,
      table_type: 2,
      record: this.tablePaging.record,
      search: this.searchText,
      category: this.category
    };

    this.apiService.getPaymentDetailsFiltered(params).subscribe({
      next: async (res) => {
        this.tableData = res.return_value_set_1.map((item: any) => {
          const total = item.detailsBayaran.reduce(
            (acc: number, curr: any) => acc + (curr.jumlah || 0),
            0
          );
          return { ...item, total };
        });

        this.tablePaging.record = res.record
        this.tablePaging.totalPages = res.total_pages
        this.isLoading = false
      },
      error: (err) => {

        this.alertService.apiErrorAlert()
        this.isLoading = false
      }
    })
  }

  initTableHeader() {
    this.tableHeader = this.tableService.getTableHeader('Senarai-pembayaran')
  }

  onSearch(item: any) {
    this.isLoading = true
    this.category = item.category
    this.searchText = item.searchText

    this.initData()
  }

  onPageChange(page: number) {
    this.tablePaging.currentPage = page;
    this.initData();
  }

  onRecordChange(record: number) {
    this.isLoading = true
    this.tablePaging.record = record;
    this.tablePaging.currentPage = 1;
    this.initData();
  }

  async onLihat(item: any) {
    const modal = await this.modalCtrl.create({
      component: ModalLihatPembayaranComponent,
      componentProps: { data: item, isLihat: true },
      cssClass: 'lihat-pembayaran-modal'
    })

    await modal.present()
  }

}
