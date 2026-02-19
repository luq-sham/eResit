import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SenaraiSlipGajiPageRoutingModule } from './senarai-slip-gaji-routing.module';

import { SenaraiSlipGajiPage } from './senarai-slip-gaji.page';
import { ComponentModule } from 'src/app/components/component-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    SenaraiSlipGajiPageRoutingModule
  ],
  declarations: [SenaraiSlipGajiPage]
})
export class SenaraiSlipGajiPageModule { }
