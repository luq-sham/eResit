import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingCtrl: LoadingController) { }

  async showDefaultMessage() {
    // Prevent multiple loaders
    if (this.loading) {
      return;
    }

    this.loading = await this.loadingCtrl.create({
      message: 'Sila tunggu sebentar...',
      spinner: 'crescent',
      backdropDismiss: false,
    });

    await this.loading.present();
  }

  async dismiss() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
