import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TableComponent,
    AlertModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    TableComponent,
    AlertModalComponent,
  ]
})
export class ComponentModule { }
