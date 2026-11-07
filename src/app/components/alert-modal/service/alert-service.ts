import { Injectable } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertModalComponent } from '../alert-modal.component';

type AlertType = 'success' | 'warning' | 'danger';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    public alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  // Esc and backdrop clicks dismiss without data, which callers read as "cancel".
  private async present(componentProps: Record<string, unknown>) {
    const alert = await this.modalCtrl.create({
      component: AlertModalComponent,
      componentProps,
      backdropDismiss: true,
      cssClass: 'alert-modal auto-height',
      htmlAttributes: { role: 'alertdialog', 'aria-labelledby': 'alert-modal-title', 'aria-describedby': 'alert-modal-message' }
    });

    await alert.present();
    return alert.onDidDismiss();
  }

  private async notify(alertType: AlertType, header: string, message: string, cancelBtn?: string) {
    const { data } = await this.present({ header, message, cancelBtn, alertType, hasConfirm: false });
    return data;
  }

  successAlert(header: string, message: string, cancelBtn?: string) {
    return this.notify('success', header, message, cancelBtn);
  }

  warningAlert(header: string, message: string, cancelBtn?: string) {
    return this.notify('warning', header, message, cancelBtn);
  }

  dangerAlert(header: string, message: string, cancelBtn?: string) {
    return this.notify('danger', header, message, cancelBtn);
  }

  async confirmAlert(header: string, message: string, confirmBtn: string = 'Ya', cancelBtn: string = 'Batal', alertType: AlertType = 'warning') {
    const result = await this.present({ header, message, confirmBtn, cancelBtn, alertType, hasConfirm: true });
    return result?.data === true;
  }

  // Esc, backdrop click or Batal on an edited form asks before throwing the input away.
  // Programmatic dismissals after a successful save (no role) pass straight through.
  guardUnsavedChanges(modal: HTMLIonModalElement | undefined, form: { dirty: boolean }) {
    if (!modal) return;
    modal.canDismiss = async (_data?: unknown, role?: string) => {
      if (!form.dirty || (role !== 'backdrop' && role !== 'cancel')) return true;
      return this.confirmAlert('Buang perubahan?', 'Maklumat yang diisi belum disimpan dan akan hilang.', 'Buang', 'Teruskan Mengisi', 'danger');
    };
  }

  apiErrorAlert() {
    return this.notify('danger', 'Perhatian', 'Ralat berlaku semasa memproses data. Sila cuba lagi.<br><small>Jika masalah berterusan, hubungi bahagian sokongan pelanggan untuk bantuan lanjut.</small>', 'Tutup');
  }
}
