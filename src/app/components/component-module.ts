import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ModalLihatPembayaranComponent } from './modal-lihat-pembayaran/modal-lihat-pembayaran.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TableComponent,
    AlertModalComponent,
    ModalLihatPembayaranComponent,
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
  ]
})
export class ComponentModule { }
