import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuUtamaPage } from './menu-utama.page';

const routes: Routes = [
  {
    path: '',
    component: MenuUtamaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuUtamaPageRoutingModule {}
