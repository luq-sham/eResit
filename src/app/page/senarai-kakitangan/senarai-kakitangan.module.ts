import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SenaraiKakitanganPageRoutingModule } from './senarai-kakitangan-routing.module';

import { SenaraiKakitanganPage } from './senarai-kakitangan.page';
import { ComponentModule } from 'src/app/components/component-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    SenaraiKakitanganPageRoutingModule
  ],
  declarations: [SenaraiKakitanganPage]
})
export class SenaraiKakitanganPageModule { }
