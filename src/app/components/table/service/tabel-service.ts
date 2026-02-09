import { Injectable } from '@angular/core';

export interface TableHeader {
  label: string;
  type: string;
  dataParam?: string;
  btnLabel?: string;
  color?: string;
  colorText?: string;
  class?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TabelService {
  getTableHeader(module: string, submodule?: string): TableHeader[] {
    switch (module) {
      case 'main-menu':
        return [
          { label: 'Tarikh Bayaran', type: 'date', dataParam: 'tarikhBayaran' },
          { label: 'Nama Pelajar', type: 'display', dataParam: 'namaPelajar', class: 'ion-text-uppercase' },
          { label: 'Kelas', type: 'display', dataParam: 'kelas', class: 'ion-text-capitalize' },
          { label: 'Jumlah Bayaran (RM)', type: 'currency', dataParam: 'total' },
          { label: 'Kaedah Bayaran', type: 'display', dataParam: 'jenisBayaran', class: 'ion-text-capitalize' },
          { label: 'Status Resit', type: 'badge', dataParam: 'generated_receipt', class: 'ion-text-capitalize' },
        ];

      case 'jana-resit':
        return [
          { label: 'Tarikh Bayaran', type: 'date', dataParam: 'tarikhBayaran' },
          { label: 'Nama Pelajar', type: 'display', dataParam: 'namaPelajar', class: 'ion-text-uppercase' },
          { label: 'Kelas', type: 'display', dataParam: 'kelas', class: 'ion-text-capitalize' },
          { label: 'Jumlah Bayaran (RM)', type: 'currency', dataParam: 'total' },
          { label: 'Tindakan', type: 'buttons', btnLabel: 'Lihat', color: 'tertiary' }
        ];

      case 'Senarai-pembayaran':
        return [
          { label: 'Nama Pelajar', type: 'display', dataParam: 'namaPelajar', class: 'ion-text-uppercase' },
          { label: 'Kelas', type: 'display', dataParam: 'kelas', class: 'ion-text-capitalize' },
          { label: 'Jumlah Bayaran (RM)', type: 'currency', dataParam: 'total' },
          { label: 'Kaedah Bayaran', type: 'display', dataParam: 'jenisBayaran', class: 'ion-text-capitalize' },
          { label: 'Status Resit', type: 'badge', dataParam: 'generated_receipt', class: 'ion-text-capitalize' },
          { label: 'Tindakan', type: 'buttons', btnLabel: 'Lihat', color: 'tertiary' }
        ]

      default:
        return [];
    }
  }
}
