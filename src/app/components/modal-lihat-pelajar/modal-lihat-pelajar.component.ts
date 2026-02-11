import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../alert-modal/service/alert-service';
import { ApiService } from 'src/app/services/api-service';
import { LoadingService } from 'src/app/services/loading-service';
import { ValidationService } from '../error-message/service/validation-service';

@Component({
  selector: 'app-modal-lihat-pelajar',
  templateUrl: './modal-lihat-pelajar.component.html',
  styleUrls: ['./modal-lihat-pelajar.component.scss'],
  standalone: false
})
export class ModalLihatPelajarComponent implements OnInit {

  form!: FormGroup
  isSubmitted = false
  validations: any

  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.initForm()
    this.validations = this.validationService.validations('tambah-pelajar')
  }

  initForm() {
    this.form = this.fb.group({
      namaPelajar: ['', Validators.required],
      noKP: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(12), Validators.maxLength(12)]],
      kelas: ['', [Validators.required]],
      namaBapa: ['', Validators.required],
      namaIbu: ['', Validators.required],
      alamat: ['', Validators.required]
    });
  }

  async onSimpan(isSimpan: any) {
    if (!isSimpan) {
      this.modalCtrl.dismiss();
      return
    }

    this.isSubmitted = true

    if (this.form.valid) {
      const res = await this.alertService.confirmAlert("Perhatian", "Adakah anda pasti untuk simpan maklumat ini?", "YA", "TIDAK", "warning")
      if (res) {
        const param = {
          ...this.form.getRawValue(),
          namaPelajar: this.form.value.namaPelajar?.toUpperCase(),
          kelas: this.form.value.kelas?.toUpperCase(),
          namaBapa: this.form.value.namaBapa?.toUpperCase(),
          namaIbu: this.form.value.namaIbu?.toUpperCase()
        };

        await this.loadingService.showDefaultMessage()
        this.apiService.postAddStudent(param).subscribe({
          next: (res) => {
            this.modalCtrl.dismiss(true);
            this.loadingService.dismiss()
          },
          error: (err) => {
            console.log(err);
            this.loadingService.dismiss()
          }
        })
      }
    } else {
      this.alertService.warningAlert('Perhatian', 'Sia isi/semak semua maklumat yang diminta', 'Tutup')
    }

  }
}
