import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
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

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private apiService: ApiService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      namaPelajar: ['', Validators.required],
      kelas: ['', Validators.required],
      jenisBayaran: ['', Validators.required],
      tarikhBayaran: ['', Validators.required],
      detailsBayaran: this.fb.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      butiran: ['', Validators.required],
      jumlah: [null, [Validators.required, Validators.min(0)]]
    });
  }

  get items(): FormArray {
    return this.paymentForm.get('detailsBayaran') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    if (this.items.length === 1) {
      this.alertService.warningAlert(
        'Perhatian',
        'Sila isi sekurang-kurangnya satu (1) butiran maklumat pembayaran.',
        'Tutup'
      );
      return;
    }
    this.items.removeAt(index);
  }

  getTotal(): number {
    return this.items.controls.reduce(
      (total, item) => total + (+item.get('jumlah')?.value || 0),
      0
    );
  }

  async onSimpan() {

    if (this.paymentForm.valid) {
      let confirm = await this.alertService.confirmAlert('Perhatian', 'Adakah anda pasti untuk menghantar rekod ini?', 'Ya', 'Tidak')
      if (confirm) {
        this.paymentForm.markAllAsTouched();
        let param = this.paymentForm.getRawValue()
        param.jumlahBayaran = this.getTotal()

        param.namaPelajar = param.namaPelajar?.toLowerCase() || '';
        param.kelas = param.kelas?.toLowerCase() || '';
        param.jenisBayaran = param.jenisBayaran?.toLowerCase() || '';

        param.detailsBayaran = param.detailsBayaran.map((item: any) => ({
          butiran: item.butiran?.toLowerCase() || '',
          jumlah: item.jumlah || 0
        }));

        await this.loadingService.showDefaultMessage()
        this.apiService.postAddPayments(param).subscribe({
          next: async (res) => {
            await this.loadingService.dismiss()
            const respon = await this.alertService.confirmAlert('Berjaya', 'Maklumat pembayaran telah disimpan', 'Tutup', 'Kembali ke Menu Utama', 'success')
            if (!respon) {
              window.location.href = '/menu-utama'
            }
          },
          error: async (err) => {
            await this.loadingService.dismiss()
            this.alertService.apiErrorAlert
          }
        })
      }
      // console.log(param);
    } else {
      this.alertService.warningAlert('Perhatian', 'Sila pastikan semua maklumat telah diisi dengan lengkap sebelum hantar.', 'Tutup')
    }
  }

}
