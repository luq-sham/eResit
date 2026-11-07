import { Injectable } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertModalComponent, AlertType } from '../alert-modal.component';

let alertSeq = 0;

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  // A second confirm while one is open (double-click, repeated Enter) resolves as cancel,
  // so one submit can never send two requests.
  private confirmOpen = false;

  constructor(
    public alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  // Esc and backdrop clicks dismiss without data, which callers read as "cancel".
  private async present(componentProps: Record<string, unknown>) {
    // Unique ids per dialog so stacked alerts each announce their own title and message.
    const idBase = `alert-modal-${++alertSeq}`;
    const alert = await this.modalCtrl.create({
      component: AlertModalComponent,
      componentProps: { ...componentProps, idBase },
      backdropDismiss: true,
      cssClass: 'alert-modal auto-height',
      htmlAttributes: { role: 'alertdialog', 'aria-labelledby': `${idBase}-title`, 'aria-describedby': `${idBase}-message` }
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
    if (this.confirmOpen) return false;
    this.confirmOpen = true;
    try {
      const result = await this.present({ header, message, confirmBtn, cancelBtn, alertType, hasConfirm: true });
      return result?.data === true;
    } finally {
      this.confirmOpen = false;
    }
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
