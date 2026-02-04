import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JanaResitPage } from './jana-resit.page';

const routes: Routes = [
  {
    path: '',
    component: JanaResitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JanaResitPageRoutingModule {}
