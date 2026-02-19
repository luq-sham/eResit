import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ModalLihatPembayaranComponent } from './modal-lihat-pembayaran/modal-lihat-pembayaran.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ModalLihatPelajarComponent } from './modal-lihat-pelajar/modal-lihat-pelajar.component';
import { ModalPilihPelajarComponent } from './modal-pilih-pelajar/modal-pilih-pelajar.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { ModalTambahKakitanganComponent } from './modal-tambah-kakitangan/modal-tambah-kakitangan.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TableComponent,
    AlertModalComponent,
    ModalLihatPembayaranComponent,
    ErrorMessageComponent,
    SearchBarComponent,
    ModalLihatPelajarComponent,
    ModalPilihPelajarComponent,
    HeaderTitleComponent,
    ModalTambahKakitanganComponent,
    DynamicFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    TableComponent,
    AlertModalComponent,
    ModalLihatPembayaranComponent,
    ErrorMessageComponent,
    SearchBarComponent,
    ModalLihatPelajarComponent,
    ModalPilihPelajarComponent,
    HeaderTitleComponent,
    ModalTambahKakitanganComponent,
    DynamicFormComponent,
  ]
})
export class ComponentModule { }
