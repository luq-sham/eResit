import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SenaraiPelajarPage } from './senarai-pelajar.page';

const routes: Routes = [
  {
    path: '',
    component: SenaraiPelajarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SenaraiPelajarPageRoutingModule {}
