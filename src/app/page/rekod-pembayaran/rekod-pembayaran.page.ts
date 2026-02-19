import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { ValidationService } from 'src/app/components/error-message/service/validation-service';
import { ModalPilihPelajarComponent } from 'src/app/components/modal-pilih-pelajar/modal-pilih-pelajar.component';
import { ApiService } from 'src/app/services/api-service';
import { LoadingService } from 'src/app/services/loading-service';

@Component({
  selector: 'app-rekod-pembayaran',
  templateUrl: './rekod-pembayaran.page.html',
  styleUrls: ['./rekod-pembayaran.page.scss'],
  standalone: false
})
export class RekodPembayaranPage implements OnInit {

  paymentForm!: FormGroup;
  minDate = moment().subtract(1, 'month').format('YYYY-MM-DD');
  maxDate = moment().add(1, 'year').format('YYYY-MM-DD');
  currentDate = moment().format('YYYY-MM-DD')

  validations: any
  isSubmitted = false

  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private api: ApiService,
    private loader: LoadingService,
    private validationService: ValidationService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.initForm();
    this.validations = this.validationService.validations('rekod-pembayaran')
  }

  initForm() {
    this.paymentForm = this.fb.group({
      namaPelajar: ['', Validators.required],
      kelas: ['', Validators.required],
      noKP: ['', Validators.required],
      jenisBayaran: ['', Validators.required],
      tarikhBayaran: ['', Validators.required],
      detailsBayaran: this.fb.array([this.createItem()])
    });

    this.paymentForm.get("tarikhBayaran")?.setValue(this.currentDate);
  }

  createItem(): FormGroup {
    return this.fb.group({
      butiran: ['', Validators.required],
      jumlah: [null, [Validators.required, Validators.min(1)]]
    });
  }

  get items(): FormArray {
    return this.paymentForm.get('detailsBayaran') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    if (this.items.length === 1) {
      this.alert.warningAlert('Perhatian', 'Sila isi sekurang-kurangnya satu (1) butiran maklumat pembayaran.', 'Tutup');
      return;
    }
    this.items.removeAt(index);
  }

  getTotal(): number {
    return this.items.controls.reduce(
      (total, item) => total + (+item.get('jumlah')?.value || 0), 0
    );
  }

  async onSimpan(): Promise<void> {
    if (!this.paymentForm.valid) {
      this.isSubmitted = true
      this.alert.warningAlert('Perhatian', 'Sila pastikan semua maklumat telah diisi dengan lengkap sebelum hantar.', 'Tutup');
      return;
    }

    const confirm = await this.alert.confirmAlert('Perhatian', 'Adakah anda pasti untuk menghantar rekod ini?', 'Ya', 'Tidak');

    if (!confirm) return;

    this.isSubmitted = true
    this.paymentForm.markAllAsTouched();
    const param = this.buildPayload();

    await this.loader.showDefaultMessage();

    this.api.postAddPayments(param).subscribe({
      next: async () => {
        await this.loader.dismiss();
        const back = await this.alert.confirmAlert('Berjaya', 'Maklumat pembayaran telah disimpan', 'Tutup', 'Kembali ke Menu Utama', 'success');
        if (!back) window.location.href = '/menu-utama';
      },
      error: async () => {
        await this.loader.dismiss();
        this.alert.apiErrorAlert;
      }
    });
  }

  buildPayload(): any {
    const raw = this.paymentForm.getRawValue();

    return {
      ...raw,
      detailsBayaran: raw.detailsBayaran.map((item: any) => ({
        butiran: item.butiran?.toUpperCase() || '',
        jumlah: item.jumlah || 0
      }))
    };
  }

  async onPilih() {
    const modal = await this.modalCtrl.create({
      component: ModalPilihPelajarComponent,
      cssClass: 'lihat-pelajar-modal'
    })

    await modal.present()

    const { data } = await modal.onDidDismiss()

    if (data) {
      console.log(data);

      this.alert.successAlert('Berjaya', 'Maklumat pelajar berjaya dipilih', 'Tutup')
      this.paymentForm.get('namaPelajar')?.setValue(data.namaPelajar)
      this.paymentForm.get('kelas')?.setValue(data.kelas)
      this.paymentForm.get('noKP')?.setValue(data.noKP)
    }
  }

}
