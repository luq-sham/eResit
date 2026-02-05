import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResitService } from 'src/app/page/jana-resit/service/resit-service';
import { AlertService } from '../alert-modal/service/alert-service';

@Component({
  selector: 'app-modal-lihat-pembayaran',
  templateUrl: './modal-lihat-pembayaran.component.html',
  styleUrls: ['./modal-lihat-pembayaran.component.scss'],
  standalone: false
})
export class ModalLihatPembayaranComponent implements OnInit {

  data: any
  constructor(
    private resitService: ResitService,
    private modalCtrl: ModalController,
    private alertService: AlertService
  ) { }

  ngOnInit() { }

  async onJana() {
    const res = await this.alertService.confirmAlert('Perhatian', 'Adakah anda pasti untuk menjana resit bagi pembayaran ini?', 'YA', 'TIDAK', 'warning')

    if (res) {
      this.resitService.generateReceipt(this.data)
    }
  }

  onTutup() {
    this.modalCtrl.dismiss(true)
  }
}
