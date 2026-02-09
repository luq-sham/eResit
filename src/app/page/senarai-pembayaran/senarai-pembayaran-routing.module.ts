import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SenaraiPembayaranPage } from './senarai-pembayaran.page';

const routes: Routes = [
  {
    path: '',
    component: SenaraiPembayaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SenaraiPembayaranPageRoutingModule {}
