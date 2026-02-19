import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import { ValidationService } from 'src/app/components/error-message/service/validation-service';
import { ModalPilihPelajarComponent } from 'src/app/components/modal-pilih-pelajar/modal-pilih-pelajar.component';
import { ApiService } from 'src/app/services/api-service';
import { PayslipService } from './services/payslip-service';

@Component({
  selector: 'app-jana-slip-gaji',
  templateUrl: './jana-slip-gaji.page.html',
  styleUrls: ['./jana-slip-gaji.page.scss'],
  standalone: false
})
export class JanaSlipGajiPage implements OnInit {
  validations: any;
  form!: FormGroup;
  isSubmitted = false;
  currentDate: any = moment().format('YYYY-MM-DD');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private apiService: ApiService,
    private payslipSerivce: PayslipService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      namaKakitangan: ['', Validators.required],
      noKP: ['', Validators.required],
      noTel: ['', Validators.required],
      earning: this.fb.array([this.createItem()]),
      deduction: this.fb.array([this.createItem()]),
      paymentMonth: ['', Validators.required],
      paymentDate: ['', Validators.required]
    });

    this.validations = this.validationService.validations('jana-slip-gaji');
    this.form.get('paymentDate')?.setValue(this.currentDate);
    this.form.get('paymentMonth')?.setValue(this.currentDate);
  }

  createItem(): FormGroup {
    return this.fb.group({
      butiran: ['', Validators.required],
      jumlah: [null, [Validators.required, Validators.min(1)]]
    });
  }

  get earningItems(): FormArray {
    return this.form.get('earning') as FormArray;
  }

  get deductionItems(): FormArray {
    return this.form.get('deduction') as FormArray;
  }

  addEarning() {
    this.earningItems.push(this.createItem());
  }

  addDeduction() {
    this.deductionItems.push(this.createItem());
  }

  get totalEarning(): number {
    return this.earningItems.controls
      .reduce((sum, item) => sum + (item.get('jumlah')?.value || 0), 0);
  }

  get totalDeduction(): number {
    return this.deductionItems.controls
      .reduce((sum, item) => sum + (item.get('jumlah')?.value || 0), 0);
  }

  get netSalary(): number {
    return this.totalEarning - this.totalDeduction;
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      this.alertService.warningAlert('Perhatian', 'Sila isi/semak maklumat yang diminta')
      return;
    }

    const res = await this.alertService.confirmAlert('Perhatian', 'Adakah anda pasti untuk menyimpan makluamt yang diberi?', 'Ya', 'Tidak')

    if (res) {
      const param = {
        ...this.form.getRawValue(),
        totalDeduction: this.totalDeduction,
        totalEarning: this.totalEarning,
      }

      this.apiService.postCreatePayslip(param).subscribe({
        next: async (res) => {
          this.payslipSerivce.generatePayslip(res.return_value_set_1)
        },
        error: async (err) => {

        }
      })
    }
  }

  async onPilih() {
    const category = [
      { value: 1, label: 'Nama Kakitangan' },
      { value: 2, label: 'No Kad Pengenalan' },
    ]

    const modal = await this.modalCtrl.create({
      component: ModalPilihPelajarComponent,
      componentProps: {
        categories: category,
        isKakitangan: true
      },
      cssClass: 'lihat-pelajar-modal'
    })

    await modal.present()

    const { data } = await modal.onDidDismiss()

    if (data) {
      this.alertService.successAlert('Berjaya', 'Maklumat kakitangan berjaya dipilih')
      this.form.get('namaKakitangan')?.setValue(data.namaKakitangan)
      this.form.get('noKP')?.setValue(data.noKP)
      this.form.get('noTel')?.setValue(data.noTel)
    }
  }
}
