import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../error-message/service/validation-service';
import { AlertService } from '../alert-modal/service/alert-service';
import { FormConfig } from '../dynamic-form/services/form-config';
import { focusFirstInvalid } from '../dynamic-form/form-helpers';
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
  formConfig: any[] = []
  validations: any
  submitted: any = false
  saving = false

  isEdit: any
  dataEdit: any
  // Set by Ionic's ModalController to the hosting <ion-modal>.
  modal?: HTMLIonModalElement
  private el: ElementRef<HTMLElement> = inject(ElementRef)


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
    this.alertService.guardUnsavedChanges(this.modal, this.form)
  }

  initForm() {
    this.form = this.fb.group({
      namaKakitangan: ['', Validators.required],
      noKP: ['', [Validators.required]],
      noTel: ['', Validators.required],
      emel: ['', [Validators.required, Validators.email]],
      alamat: ['', Validators.required],
    })

    this.validations = this.validationService.validations('tambah-kakitangan')
    this.formConfig = this.formConfigService.getFormConfig('tambah-kakitangan')

    if (this.isEdit) {
      this.form.patchValue({
        namaKakitangan: this.dataEdit.namaKakitangan,
        noKP: this.dataEdit.noKP,
        noTel: this.dataEdit.noTel,
        emel: this.dataEdit.emel,
        alamat: this.dataEdit.alamat
      })
    }
  }

  async onSimpan(isSimpan: any) {
    if (!isSimpan) {
      this.modalCtrl.dismiss(undefined, 'cancel')
      return
    }
    if (this.saving) return
    this.submitted = true

    if (this.form.valid) {
      let msg = "Adakah anda pasti untuk " + (this.isEdit ? 'kemaskini' : 'simpan') + " maklumat ini?"
      const res = await this.alertService.confirmAlert('Perhatian', msg, 'Ya', 'Tidak', 'warning')

      if (res) {
        let param = {
          ...this.form.getRawValue(),
          namaKakitangan: this.form.value.namaKakitangan.toUpperCase()
        }

        this.saving = true
        await this.loadingService.showDefaultMessage();

        const request = this.isEdit
          ? this.apiService.postUpdateStaff(param, this.dataEdit.id)
          : this.apiService.postAddStaff(param);

        request.subscribe({
          next: (res) => {
            this.modalCtrl.dismiss(true, this.isEdit);
            this.loadingService.dismiss();
          },
          error: (err) => {
            console.error(err);
            this.saving = false
            this.loadingService.dismiss();
            this.alertService.apiErrorAlert();
          }
        });
      }
    } else {
      this.form.markAllAsTouched()
      focusFirstInvalid(this.el.nativeElement)
    }
  }

  async onDelete(item: any) {
    let msg = 'Adakah anda pasti untuk menghapuskan maklumat kakitangan ini?<br><small>Tindakan ini tidak boleh dibatalkan selepas diteruskan.</small>'
    const res = await this.alertService.confirmAlert('Hapus kakitangan?', msg, 'Ya, Hapus', 'Batal', 'danger')
    if (res) {
      this.saving = true
      await this.loadingService.showDefaultMessage()
      this.apiService.postDeleteStaff(item.id).subscribe({
        next: (res) => {
          this.alertService.successAlert('Berjaya', 'Maklumat kakitangan berjaya dihapuskan')
          this.modalCtrl.dismiss(true);
          this.loadingService.dismiss();
        },
        error: (err) => {
          console.error(err);
          this.saving = false
          this.loadingService.dismiss();
          this.alertService.apiErrorAlert();
        }
      })
    }
  }
}
