import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JanaSlipGajiPageRoutingModule } from './jana-slip-gaji-routing.module';

import { JanaSlipGajiPage } from './jana-slip-gaji.page';
import { ComponentModule } from 'src/app/components/component-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    JanaSlipGajiPageRoutingModule,
    ReactiveFormsModule
],
  declarations: [JanaSlipGajiPage]
})
export class JanaSlipGajiPageModule { }
