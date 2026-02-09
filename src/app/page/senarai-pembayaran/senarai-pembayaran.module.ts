import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SenaraiPembayaranPageRoutingModule } from './senarai-pembayaran-routing.module';

import { SenaraiPembayaranPage } from './senarai-pembayaran.page';
import { ComponentModule } from 'src/app/components/component-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    SenaraiPembayaranPageRoutingModule
  ],
  declarations: [SenaraiPembayaranPage]
})
export class SenaraiPembayaranPageModule { }
