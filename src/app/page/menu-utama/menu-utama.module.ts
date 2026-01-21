import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuUtamaPageRoutingModule } from './menu-utama-routing.module';

import { MenuUtamaPage } from './menu-utama.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuUtamaPageRoutingModule
  ],
  declarations: [MenuUtamaPage]
})
export class MenuUtamaPageModule {}
