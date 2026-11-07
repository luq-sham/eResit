import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../alert-modal/service/alert-service';
import { ApiService } from 'src/app/services/api-service';
import { LoadingService } from 'src/app/services/loading-service';
import { ValidationService } from '../error-message/service/validation-service';
import { FormConfig } from '../dynamic-form/services/form-config';
import { focusFirstInvalid } from '../dynamic-form/form-helpers';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-lihat-pelajar',
  templateUrl: './modal-lihat-pelajar.component.html',
  styleUrls: ['./modal-lihat-pelajar.component.scss'],
  standalone: false
})
export class ModalLihatPelajarComponent implements OnInit {

  form!: FormGroup
  formConfig: any
  isSubmitted = false
  saving = false
  validations: any

  isEdit: any
  dataEdit: any
  // Set by Ionic's ModalController to the hosting <ion-modal>.
  modal?: HTMLIonModalElement
  private el: ElementRef<HTMLElement> = inject(ElementRef)

  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private validationService: ValidationService,
    private formConfigService: FormConfig
  ) { }

  ngOnInit() {
    this.initForm()
    this.alertService.guardUnsavedChanges(this.modal, this.form)
  }

  initForm() {
    this.form = this.fb.group({
      namaPelajar: ['', Validators.required],
      noKP: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      kelas: ['', [Validators.required]],
      namaBapa: ['', Validators.required],
      namaIbu: ['', Validators.required],
      alamat: ['', Validators.required]
    });

    this.validations = this.validationService.validations('tambah-pelajar')
    this.formConfig = this.formConfigService.getFormConfig('tambah-pelajar')

    if (this.isEdit) {
      this.form.patchValue({
        namaPelajar: this.dataEdit.namaPelajar,
        noKP: this.dataEdit.noKP,
        kelas: this.dataEdit.kelas,
        namaBapa: this.dataEdit.namaBapa,
        namaIbu: this.dataEdit.namaIbu,
        alamat: this.dataEdit.alamat
      })
    }
  }

  async onSimpan(isSimpan: any) {
    if (!isSimpan) {
      this.modalCtrl.dismiss(undefined, 'cancel');
      return
    }
    if (this.saving) return

    this.isSubmitted = true

    if (this.form.valid) {
      let msg = "Adakah anda pasti untuk " + (this.isEdit ? 'kemaskini' : 'simpan') + " maklumat ini?"
      const res = await this.alertService.confirmAlert("Perhatian", msg, "YA", "TIDAK", "warning")
      if (res) {
        const formValues = this.form.getRawValue();
        const param = {
          ...formValues,
          namaPelajar: formValues.namaPelajar?.toUpperCase(),
          kelas: formValues.kelas?.toUpperCase(),
          namaBapa: formValues.namaBapa?.toUpperCase(),
          namaIbu: formValues.namaIbu?.toUpperCase(),
        };

        this.saving = true
        await this.loadingService.showDefaultMessage();

        const request = this.isEdit
          ? this.apiService.postUpdateStudent(param, this.dataEdit.id)
          : this.apiService.postAddStudent(param);

        request.subscribe({
          next: (res) => {
            this.modalCtrl.dismiss(true);
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
    const msg = 'Adakah anda pasti untuk menghapuskan maklumat pelajar ini?<br><small>Tindakan ini tidak boleh dibatalkan selepas diteruskan.</small>';
    const confirmed = await this.alertService.confirmAlert('Hapus pelajar?', msg, 'Ya, Hapus', 'Batal', 'danger');

    if (confirmed) {
      this.saving = true
      await this.loadingService.showDefaultMessage();
      try {
        await firstValueFrom(this.apiService.postDeleteStudent(item.id));
        this.alertService.successAlert('Berjaya', 'Maklumat pelajar berjaya dihapuskan');
        this.modalCtrl.dismiss(true,'Delete')
      } catch (err) {
        console.error(err);
        this.saving = false
        this.alertService.apiErrorAlert();
      } finally {
        this.loadingService.dismiss();
      }
    }
  }
}
