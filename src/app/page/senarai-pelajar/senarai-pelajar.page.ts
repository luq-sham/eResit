import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { ModalLihatPelajarComponent } from 'src/app/components/modal-lihat-pelajar/modal-lihat-pelajar.component';
import { TabelService } from 'src/app/components/table/service/tabel-service';
import { ApiService } from 'src/app/services/api-service';
import { LoadingService } from 'src/app/services/loading-service';

@Component({
  selector: 'app-senarai-pelajar',
  templateUrl: './senarai-pelajar.page.html',
  styleUrls: ['./senarai-pelajar.page.scss'],
  standalone: false
})
export class SenaraiPelajarPage implements OnInit {

  category: any[] = [
    { value: 1, label: 'Nama Pelajar' },
    { value: 2, label: 'No. KP / Passport' },
    { value: 3, label: 'Kelas' },
  ]

  search: any = ''
  selectedCategory: any = 1
  data: any[] = []
  total_pelajar: any = 0

  isLoading = true

  tableHeader: any
  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private tableService: TabelService,
    private modalCtrl: ModalController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.initData()
    this.initTable()
  }

  async initData() {
    let param = {
      search: this.search.trim(),
      category: this.selectedCategory
    }

    await this.loadingService.showDefaultMessage()
    this.apiService.getStudent(param).subscribe({
      next: (res) => {
        this.data = res.return_value_set_1
        this.total_pelajar = res.total_student
        this.loadingService.dismiss()
      },
      error: (err) => {
        console.log(err);
        this.alertService.apiErrorAlert()
        this.loadingService.dismiss()
      }
    })
  }

  initTable() {
    this.tableHeader = this.tableService.getTableHeader('Senarai-pelajar')
  }

  onSearch(item: any) {
    this.search = item.searchText
    this.selectedCategory = item.category
    this.initData()
  }

  async onTambah() {
    const modal = await this.modalCtrl.create({
      component: ModalLihatPelajarComponent,
      cssClass: 'lihat-pelajar-modal'
    })

    await modal.present()

    const { data } = await modal.onDidDismiss()

    if (data) {
      this.alertService.successAlert('Berjaya', 'Maklumat pelajar berjaya ditambah', 'Tutup')
      this.initData()
    }
  }

}
