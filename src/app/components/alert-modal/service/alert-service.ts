import { Injectable } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertModalComponent } from '../alert-modal.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    public alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  async successAlert(header: string, message: string, cancelBtn?: string) {
    const alert = await this.modalCtrl.create({
      component: AlertModalComponent,
      componentProps: { header: header, message: message, cancelBtn: cancelBtn, alertType: 'success', hasConfirm: false },
      backdropDismiss: false,
      cssClass: 'alert-modal auto-height'
    })

    await alert.present();
    const data = await alert.onDidDismiss();
    return data?.data;
  }

  async warningAlert(header: string, message: string, cancelBtn?: string) {
    const alert = await this.modalCtrl.create({
      component: AlertModalComponent,
      componentProps: { header: header, message: message, cancelBtn: cancelBtn, alertType: 'warning', hasConfirm: false },
      backdropDismiss: false,
      cssClass: 'alert-modal auto-height'
    })

    await alert.present();
    const data = await alert.onDidDismiss();
    return data?.data;
  }

  async dangerAlert(header: string, message: string, cancelBtn?: string) {
    const alert = await this.modalCtrl.create({
      component: AlertModalComponent,
      componentProps: { header: header, message: message, cancelBtn: cancelBtn, alertType: 'danger', hasConfirm: false },
      backdropDismiss: false,
      cssClass: 'alert-modal auto-height'
    })

    await alert.present();
    const data = await alert.onDidDismiss();
    return data?.data;
  }

  async apiErrorAlert() {
    const alert = await this.modalCtrl.create({
      component: AlertModalComponent,
      componentProps: { header: 'Perhatian', message: 'Ralat berlaku semasa memproses data. Sila cuba lagi.<br><small>Jika masalah berterusan, hubungi bahagian sokongan pelanggan untuk bantuan lanjut.</small>', cancelBtn: 'tutup', alertType: 'danger', hasConfirm: false },
      backdropDismiss: false,
      cssClass: 'alert-modal auto-height'
    })

    await alert.present();
    const data = await alert.onDidDismiss();
    return data?.data;
  }
}
