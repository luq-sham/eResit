import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RekodPembayaranPageRoutingModule } from './rekod-pembayaran-routing.module';

import { RekodPembayaranPage } from './rekod-pembayaran.page';
import { ComponentModule } from 'src/app/components/component-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    RekodPembayaranPageRoutingModule
  ],
  declarations: [RekodPembayaranPage]
})
export class RekodPembayaranPageModule { }
