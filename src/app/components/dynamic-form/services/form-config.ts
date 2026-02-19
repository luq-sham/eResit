import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormConfig {
  getFormConfig(module: any) {
    switch (module) {
      case 'tambah-kakitangan':
        return [
          { icon: 'person', label: 'Nama Penuh', type: 'text', formControl: 'namaKakitangan' },
          { icon: 'id-card', label: 'No. KP / Passport', type: 'text', formControl: 'noKP' },
          { icon: 'call', label: 'No Telefon', type: 'text', formControl: 'noTel', size: 6 },
          { icon: 'mail', label: 'emel', type: 'text', formControl: 'emel', size: 6 },
          { icon: 'location', label: 'Alamat', type: 'textarea', formControl: 'alamat' },
        ]

      case 'tambah-pelajar':
        return [
          { icon: 'person', label: 'Nama Pelajar', type: 'text', formControl: 'namaPelajar' },
          { icon: 'id-card', label: 'No. KP / Passport', type: 'text', formControl: 'noKP' },
          { icon: 'business', label: 'Kelas', type: 'text', formControl: 'kelas' },
          { icon: 'man', label: 'Nama Bapa', type: 'text', formControl: 'namaBapa', size: 6 },
          { icon: 'woman', label: 'Nama Ibu', type: 'text', formControl: 'namaIbu', size: 6 },
          { icon: 'location', label: 'Alamat', type: 'textarea', formControl: 'alamat' },
        ]

      default:
        return []
    }
  }
}
