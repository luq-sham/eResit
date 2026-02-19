import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuButtonServices {
  getMenuButtonConfig(module: any) {
    switch (module) {
      case 'pelajar-dashboard':
        return [
          {
            label: 'Urusan Resit',
            items: [
              { title: 'Tambah Rekod Pembayaran', icon: 'calculator', url: 'rekod-pembayaran', desc: '' },
              { title: 'Jana Resit Pembayaran', icon: 'print', url: 'jana-resit', desc: '' },
              { title: 'Senarai Pembayaran', icon: 'folder-open', url: 'senarai-pembayaran', desc: '' },
            ]
          },
          {
            label: 'Urusan Pelajar',
            items: [
              { title: 'Senarai Pelajar', icon: 'people', url: 'senarai-pelajar', desc: '' },
            ]
          },

        ]

      case 'kakitangan-dashboard':
        return [
          {
            label: 'Urusan Slip Gaji',
            items: [
              { title: 'Jana Slip Gaji', icon: 'document-text', url: 'jana-slip-gaji', desc: '' },
              { title: 'Senarai Slip Gaji', icon: 'file-tray-full', url: 'senarai-slip-gaji', desc: '' },
            ]
          },
          {
            label: 'Urusan Kakitangan',
            items: [
              { title: 'Senarai Kakitangan', icon: 'people', url: 'senarai-kakitangan', desc: '' },
            ]
          },

        ]

      default:
        return []
    }
  }

  getCardConfig(module: any) {
    switch (module) {
      case 'pelajar-dashboard':
        return [
          { icon: 'file-tray-full', title: 'Bilangan Pembayaran', count: 0, type: 'display', iconColor: 'tertiary' },
          { icon: 'document-text', title: 'Bilangan Resit Dijana', count: 0, type: 'display', iconColor: 'warning' },
          { icon: 'cash', title: 'Jumlah Pembayaran', count: 0, type: 'currency', iconColor: 'success' },
        ]

      case 'kakitangan-dashboard':
        return [
          { icon: 'people', title: 'Bilangan Kakitangan', count: 0, type: 'display', iconColor: 'tertiary' },
          { icon: 'document-text', title: 'Bilangan Slip Gaji Dijana', count: 0, type: 'display', iconColor: 'warning' },
        ]

      default:
        return []
    }
  }
}
