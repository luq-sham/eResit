import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SenaraiSlipGajiPage } from './senarai-slip-gaji.page';

const routes: Routes = [
  {
    path: '',
    component: SenaraiSlipGajiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SenaraiSlipGajiPageRoutingModule {}
