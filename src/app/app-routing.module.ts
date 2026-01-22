import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu-utama',
    pathMatch: 'full'
  },
  {
    path: 'menu-utama',
    loadChildren: () => import('./page/menu-utama/menu-utama.module').then( m => m.MenuUtamaPageModule)
  },
  {
    path: 'rekod-pembayaran',
    loadChildren: () => import('./page/rekod-pembayaran/rekod-pembayaran.module').then( m => m.RekodPembayaranPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
