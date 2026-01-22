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
          { label: 'Nama', type: 'display', dataParam: 'test' },
          { label: 'Tarikh', type: 'date', dataParam: 'tarikh' },
          { label: 'Status', type: 'display', dataParam: 'test' }
        ]

      // Default
      default:
        return []
    }
  }
}
