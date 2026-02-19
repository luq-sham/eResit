import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../error-message/service/validation-service';
import { AlertService } from '../alert-modal/service/alert-service';
import { FormConfig } from '../dynamic-form/services/form-config';
import { ApiService } from 'src/app/services/api-service';
import { LoadingService } from 'src/app/services/loading-service';

@Component({
  selector: 'app-modal-tambah-kakitangan',
  templateUrl: './modal-tambah-kakitangan.component.html',
  styleUrls: ['./modal-tambah-kakitangan.component.scss'],
  standalone: false
})
export class ModalTambahKakitanganComponent implements OnInit {

  form!: FormGroup
  formConfig = [
    { icon: 'person', label: 'Nama Penuh', type: 'text', formControl: 'namaKakitangan' },
    { icon: 'id-card', label: 'No. kad Pengenalan', type: 'text', formControl: 'noKP' },
    { icon: 'call', label: 'No Telefon', type: 'text', formControl: 'noTel', size: 6 },
    { icon: 'mail', label: 'emel', type: 'text', formControl: 'emel', size: 6 },
    { icon: 'location', label: 'Alamat', type: 'textarea', formControl: 'alamat' },
  ]
  validations: any
  submitted: any = false


  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private validationService: ValidationService,
    private alertService: AlertService,
    private formConfigService: FormConfig,
    private apiService: ApiService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      namaKakitangan: ['', Validators.required],
      noKP: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(12), Validators.maxLength(12)]],
      noTel: ['', Validators.required],
      emel: ['', [Validators.required, Validators.email]],
      alamat: ['', Validators.required],
    })

    this.validations = this.validationService.validations('tambah-kakitangan')
    this.formConfig = this.formConfigService.getFormConfig('tambah-kakitangan')

  }

  async onSimpan(isSimpan: any) {
    if (!isSimpan) {
      this.modalCtrl.dismiss()
      return
    }
    this.submitted = true

    if (this.form.valid) {
      const res = await this.alertService.confirmAlert('Perhatian', 'Adakah anda pasti untuk menyimpan maklumat ini?', 'Ya', 'Tidak', 'warning')

      if (res) {
        let param = {
          ...this.form.getRawValue(),
          namaKakitangan: this.form.value.namaKakitangan.toUpperCase()
        }

        await this.loadingService.showDefaultMessage()
        this.apiService.postAddStaff(param).subscribe({
          next: async (res) => {
            await this.loadingService.dismiss()
            await this.modalCtrl.dismiss(true)

          },
          error: async (err) => {
            await this.loadingService.dismiss()
            this.alertService.apiErrorAlert()
          }
        })
      }
    } else {
      this.alertService.warningAlert('Perhatian', 'Sila isi/semak semua maklumat yang diminta')
    }


  }
}
