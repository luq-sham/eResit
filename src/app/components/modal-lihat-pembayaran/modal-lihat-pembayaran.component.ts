import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResitService } from 'src/app/page/jana-resit/service/resit-service';
import { AlertService } from '../alert-modal/service/alert-service';
import { ApiService } from 'src/app/services/api-service';
import { LoadingService } from 'src/app/services/loading-service';

@Component({
  selector: 'app-modal-lihat-pembayaran',
  templateUrl: './modal-lihat-pembayaran.component.html',
  styleUrls: ['./modal-lihat-pembayaran.component.scss'],
  standalone: false
})
export class ModalLihatPembayaranComponent implements OnInit {

  data: any
  isLihat: any
  total: any
  generating = false
  constructor(
    private resitService: ResitService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private apiService: ApiService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.total = this.data.detailsBayaran.reduce(
      (acc: number, curr: any) => acc + (curr.jumlah || 0), 0
    );
  }

  async onJana() {
    if (this.generating) return
    const res = await this.alertService.confirmAlert('Perhatian', 'Adakah anda pasti untuk menjana resit bagi pembayaran ini?', 'YA', 'TIDAK', 'warning')

    if (res) {
      // Open the tab while the confirm click still counts as a user gesture.
      const win = window.open('', '_blank')
      this.generating = true
      this.loadingService.showDefaultMessage()
      this.apiService.postCreateReceipt({ paymentID: this.data?.id }).subscribe({
        next: async (res) => {
          const receipt = res.return_value_set_1

          await this.resitService.generateReceipt(this.data, receipt, false, win)
          this.alertService.successAlert('Berjaya', 'Resit berjaya dijana', 'Tutup').then(res => {
            this.modalCtrl.dismiss(true)
          })
          await this.loadingService.dismiss()
        },
        error: (err) => {
          win?.close()
          this.generating = false
          this.loadingService.dismiss()
          console.log(err);

          if (err.status === 400) {
            this.alertService.dangerAlert('Perhatian', 'Resit untuk pembayaran ini telah dijana', 'Tutup')
          } else {
            this.alertService.apiErrorAlert()
          }
        }
      })
    }
  }

  onLihatResit() {
    if (this.data.generated_receipt == false) {
      this.alertService.warningAlert("Perhatian", "Resit pembayaran ini belum dijana.", "Tutup")
      return
    }
    this.resitService.generateReceipt(this.data, { receipt_no: this.data?.noReceipt }, this.isLihat)
  }

  onTutup() {
    this.modalCtrl.dismiss(true)
  }
}
