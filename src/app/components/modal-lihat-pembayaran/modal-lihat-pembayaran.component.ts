import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResitService } from 'src/app/page/jana-resit/service/resit-service';
import { AlertService } from '../alert-modal/service/alert-service';
import { ApiService } from 'src/app/services/api-service';

@Component({
  selector: 'app-modal-lihat-pembayaran',
  templateUrl: './modal-lihat-pembayaran.component.html',
  styleUrls: ['./modal-lihat-pembayaran.component.scss'],
  standalone: false
})
export class ModalLihatPembayaranComponent implements OnInit {

  data: any
  total: any
  constructor(
    private resitService: ResitService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.total = this.data.detailsBayaran.reduce(
      (acc: number, curr: any) => acc + (curr.jumlah || 0), 0
    );
  }

  async onJana() {
    const res = await this.alertService.confirmAlert('Perhatian', 'Adakah anda pasti untuk menjana resit bagi pembayaran ini?', 'YA', 'TIDAK', 'warning')

    if (res) {
      this.apiService.postCreateReceipt({ paymentID: this.data?.id }).subscribe({
        next: async (res) => {
          const receipt = res.return_value_set_1
          this.resitService.generateReceipt(this.data, receipt)
        },
        error: (err) => {
          console.log(err);

          if (err.error.status_id = 2) {
            this.alertService.dangerAlert('Perhatian', 'Resit untuk pembayaran ini telah dijana', 'Tutup')
          } else {
            this.alertService.apiErrorAlert()
          }
        }
      })
    }
  }

  onTutup() {
    this.modalCtrl.dismiss(true)
  }
}
