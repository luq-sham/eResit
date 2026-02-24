import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { ModalLihatPelajarComponent } from 'src/app/components/modal-lihat-pelajar/modal-lihat-pelajar.component';
import { TabelService } from 'src/app/components/table/service/tabel-service';
import { ApiService } from 'src/app/services/api-service';
import { LoadingService } from 'src/app/services/loading-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-senarai-pelajar',
  templateUrl: './senarai-pelajar.page.html',
  styleUrls: ['./senarai-pelajar.page.scss'],
  standalone: false
})
export class SenaraiPelajarPage implements OnInit {
  category = [
    { value: 1, label: 'Nama Pelajar' },
    { value: 2, label: 'No. KP / Passport' },
    { value: 3, label: 'Kelas' },
  ];

  search = '';
  selectedCategory = 1;
  data: any[] = [];
  total_pelajar = 0;
  isLoading = true;
  tableHeader: any;

  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private tableService: TabelService,
    private modalCtrl: ModalController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.tableHeader = this.tableService.getTableHeader('Senarai-pelajar');
    this.initData();
  }

  async initData() {
    const param = {
      search: this.search.trim(),
      category: this.selectedCategory
    };

    await this.loadingService.showDefaultMessage();

    try {
      const res: any = await firstValueFrom(this.apiService.getStudent(param));
      this.data = res.return_value_set_1;
      this.total_pelajar = res.total_student;
    } catch (err) {
      console.error(err);
      this.alertService.apiErrorAlert();
    } finally {
      this.isLoading = false;
      this.loadingService.dismiss();
    }
  }

  onSearch(item: any) {
    this.search = item.searchText;
    this.selectedCategory = item.category;
    this.initData();
  }

  async openStudentModal(item: any = null, isEdit = false) {
    const modal = await this.modalCtrl.create({
      component: ModalLihatPelajarComponent,
      componentProps: { dataEdit: item, isEdit },
      cssClass: 'lihat-pelajar-modal'
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();

    if (data) {
      if (role == 'Delete') {
        this.initData()
        return
      }
      const msg = isEdit ? 'Maklumat pelajar berjaya dikemaskini' : 'Maklumat pelajar berjaya ditambah';
      this.alertService.successAlert('Berjaya', msg, 'Tutup');
      this.initData();
    }
  }

  async onDelete(item: any) {
    const msg = 'Adakah anda pasti untuk menghapuskan maklumat pelajar ini?<br><small>Tindakan ini tidak boleh dibatalkan selepas diteruskan.</small>';
    const confirmed = await this.alertService.confirmAlert('Perhatian', msg, 'Ya, Teruskan', 'Batal', 'danger');

    if (confirmed) {
      await this.loadingService.showDefaultMessage();
      try {
        await firstValueFrom(this.apiService.postDeleteStudent(item.id));
        this.alertService.successAlert('Berjaya', 'Maklumat pelajar berjaya dihapuskan');
        this.initData();
      } catch (err) {
        console.error(err);
        this.alertService.apiErrorAlert();
      } finally {
        this.loadingService.dismiss();
      }
    }
  }
}