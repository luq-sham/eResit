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
          { label: 'Nama Pelajar', type: 'display', dataParam: 'namaPelajar', class: 'ion-text-uppercase' },
          { label: 'Kelas', type: 'display', dataParam: 'kelas', class: 'ion-text-capitalize' },
          { label: 'Tarikh Bayaran', type: 'date', dataParam: 'tarikhBayaran' },
          { label: 'Kaedah Bayaran', type: 'display', dataParam: 'jenisBayaran', class: 'ion-text-capitalize' },
          { label: 'Jumlah Bayaran (RM)', type: 'currency', dataParam: 'jumlahBayaran' },
          { label: 'Dihantar Pada', type: 'datetime', dataParam: 'created_at' }
        ];

      case 'jana-resit':
        return [
          { label: 'Nama Pelajar', type: 'display', dataParam: 'namaPelajar', class: 'ion-text-uppercase' },
          { label: 'Kelas', type: 'display', dataParam: 'kelas', class: 'ion-text-capitalize' },
          { label: 'Kaedah Bayaran', type: 'display', dataParam: 'jenisBayaran', class: 'ion-text-capitalize' },
          { label: 'Jumlah Bayaran (RM)', type: 'currency', dataParam: 'jumlahBayaran' },
          { label: 'Status', type: 'buttons', btnLabel: 'Lihat', color: 'accent', colorText: 'light' }
        ];

      default:
        return [];
    }
  }
}
