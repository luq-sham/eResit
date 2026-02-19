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
  },
  {
    path: 'jana-resit',
    loadChildren: () => import('./page/jana-resit/jana-resit.module').then( m => m.JanaResitPageModule)
  },
  {
    path: 'senarai-pembayaran',
    loadChildren: () => import('./page/senarai-pembayaran/senarai-pembayaran.module').then( m => m.SenaraiPembayaranPageModule)
  },
  {
    path: 'senarai-pelajar',
    loadChildren: () => import('./page/senarai-pelajar/senarai-pelajar.module').then( m => m.SenaraiPelajarPageModule)
  },  {
    path: 'senarai-kakitangan',
    loadChildren: () => import('./page/senarai-kakitangan/senarai-kakitangan.module').then( m => m.SenaraiKakitanganPageModule)
  },
  {
    path: 'jana-slip-gaji',
    loadChildren: () => import('./page/jana-slip-gaji/jana-slip-gaji.module').then( m => m.JanaSlipGajiPageModule)
  },
  {
    path: 'senarai-slip-gaji',
    loadChildren: () => import('./page/senarai-slip-gaji/senarai-slip-gaji.module').then( m => m.SenaraiSlipGajiPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
