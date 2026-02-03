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


        await this.loadingService.showDefaultMessage()
        this.apiService.postAddPayments(param).subscribe({
          next: async (res) => {
            await this.loadingService.dismiss()
            this.alertService.confirmAlert('Berjaya', 'Maklumat pembayaran telah disimpan', 'Tutup', 'Kembali ke Menu Utama', 'success')
          },
          error: (err) => {

          }
        })
      }
      // console.log(param);
    } else {
      this.alertService.warningAlert('Perhatian', 'Sila pastikan semua maklumat telah diisi dengan lengkap sebelum hantar.', 'Tutup')
    }
  }

}
