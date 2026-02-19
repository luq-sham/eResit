import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JanaSlipGajiPage } from './jana-slip-gaji.page';

const routes: Routes = [
  {
    path: '',
    component: JanaSlipGajiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JanaSlipGajiPageRoutingModule {}
