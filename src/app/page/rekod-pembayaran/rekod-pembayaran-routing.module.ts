import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RekodPembayaranPage } from './rekod-pembayaran.page';

const routes: Routes = [
  {
    path: '',
    component: RekodPembayaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RekodPembayaranPageRoutingModule {}
