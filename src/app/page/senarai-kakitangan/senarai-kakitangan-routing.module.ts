import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SenaraiKakitanganPage } from './senarai-kakitangan.page';

const routes: Routes = [
  {
    path: '',
    component: SenaraiKakitanganPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SenaraiKakitanganPageRoutingModule {}
