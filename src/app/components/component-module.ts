import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    TableComponent
  ]
})
export class ComponentModule { }
