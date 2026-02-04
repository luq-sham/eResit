import { Injectable } from '@angular/core';

export interface tableHeader {
  label: string,
  type: string;
  dataParam: string
}

@Injectable({
  providedIn: 'root',
})
export class TabelService {

  getTableHeader(module: string, submodule?: string): tableHeader[] {
    switch (module) {
      case 'main-menu':
        return [
          { label: 'Nama Pelajar', type: 'display', dataParam: 'namaPelajar' },
          { label: 'Kelas', type: 'display', dataParam: 'kelas' },
          { label: 'Tarikh Pembayaran', type: 'date', dataParam: 'tarikhBayaran' },
          { label: 'Jenis Pembayaran', type: 'display', dataParam: 'jenisBayaran' },
          { label: 'Jumlah Pembayaan (RM)', type: 'currency', dataParam: 'jumlahBayaran' },
          // { label: 'Status', type: 'badge', dataParam: 'status' }
        ]

      case 'jana-resit':
        return [
          { label: 'Nama Pelajar', type: 'display', dataParam: 'namaPelajar' },
          { label: 'Kelas', type: 'display', dataParam: 'kelas' },
          { label: 'Tarikh Pembayaran', type: 'date', dataParam: 'tarikhBayaran' },
          { label: 'Jenis Pembayaran', type: 'display', dataParam: 'jenisBayaran' },
          { label: 'Jumlah Pembayaan (RM)', type: 'currency', dataParam: 'jumlahBayaran' },
          { label: 'Status', type: 'buttons', dataParam: 'status' }
        ]

      // Default
      default:
        return []
    }
  }
}
