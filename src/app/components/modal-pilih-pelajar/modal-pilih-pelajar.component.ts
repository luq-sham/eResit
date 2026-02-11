import { Component, OnInit } from '@angular/core';
import { TabelService } from '../table/service/tabel-service';
import { ApiService } from 'src/app/services/api-service';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../alert-modal/service/alert-service';

@Component({
  selector: 'app-modal-pilih-pelajar',
  templateUrl: './modal-pilih-pelajar.component.html',
  styleUrls: ['./modal-pilih-pelajar.component.scss'],
  standalone: false
})
export class ModalPilihPelajarComponent implements OnInit {

  categories = [
    { value: 1, label: 'Nama Pelajar' },
    { value: 2, label: 'No. Kad Pengenalan' },
    { value: 3, label: 'Kelas' },
  ]
  search: any = ''
  selectedCategory: any = 1

  tableHeader: any
  tableData: any
  isLoading = true

  selectedData: any

  constructor(
    private tableService: TabelService,
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.initData()
    this.initTable()
  }

  initTable() {
    this.tableHeader = this.tableService.getTableHeader('pilih-pelajar')
  }

  initData() {
    const param = {
      search: this.search,
      category: this.selectedCategory
    }
    this.apiService.getStudent(param).subscribe({
      next: (res) => {
        this.tableData = res.return_value_set_1
        this.isLoading = false
      },
      error: (err) => {
        console.log(err);
        this.alertService.apiErrorAlert()
        this.isLoading = false
      }
    })
  }

  onRadioChange(item: any) {
    // console.log(item);
    this.selectedData = item
  }

  onSearch(item: any) {
    this.search = item.searchText
    this.selectedCategory = item.category
    this.initData()
  }

  async onSimpan(isSimpan: any) {
    if (!isSimpan) {
      await this.modalCtrl.dismiss()
      return
    }

    await this.modalCtrl.dismiss(this.selectedData)
  }

}
