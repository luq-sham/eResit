import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { ModalTambahKakitanganComponent } from 'src/app/components/modal-tambah-kakitangan/modal-tambah-kakitangan.component';
import { ApiService } from 'src/app/services/api-service';
import { LoadingService } from 'src/app/services/loading-service';

@Component({
  selector: 'app-senarai-kakitangan',
  templateUrl: './senarai-kakitangan.page.html',
  styleUrls: ['./senarai-kakitangan.page.scss'],
  standalone: false
})
export class SenaraiKakitanganPage implements OnInit {

  search: any = ''
  selectedCategory: any = 1

  category: any[] = [
    { value: 1, label: 'Nama Kakitangan' },
    { value: 2, label: 'No. KP / Passport' },
  ]

  staffData: any[] = []

  constructor(
    private ModalCtrl: ModalController,
    private alertService: AlertService,
    private apiService: ApiService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.initData()
  }

  async initData() {
    let param = {
      search: this.search,
      category: this.selectedCategory
    }

    await this.loadingService.showDefaultMessage()
    this.apiService.getStaff(param).subscribe({
      next: async (res) => {
        await this.loadingService.dismiss()
        this.staffData = res.return_value_set_1
      },
      error: async (err) => {
        await this.loadingService.dismiss()
        this.alertService.apiErrorAlert()
      }
    })
  }

  onSeacrh(item: any) {
    this.search = item.searchText
    this.selectedCategory = item.category

    this.initData()
  }

  async onTambah() {
    const modal = await this.ModalCtrl.create({
      component: ModalTambahKakitanganComponent,
      cssClass: 'lihat-pelajar-modal'
    })

    await modal.present()

    const { data } = await modal.onDidDismiss()

    if (data) {
      this.alertService.successAlert('Berjaya', 'Maklumat kakitangan berjaya disimpan')
      this.initData()
    }
  }

}
