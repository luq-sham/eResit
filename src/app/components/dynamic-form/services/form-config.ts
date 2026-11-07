import { Injectable } from '@angular/core';

const NO_KP_HINT = 'Digit sahaja, tanpa sengkang (-)';

@Injectable({
  providedIn: 'root',
})
export class FormConfig {
  getFormConfig(module: any) {
    switch (module) {
      case 'tambah-kakitangan':
        return [
          { label: 'Nama Penuh', type: 'text', formControl: 'namaKakitangan', autocomplete: 'name', autocapitalize: 'words' },
          { label: 'No. KP / Passport', type: 'text', formControl: 'noKP', autocapitalize: 'characters' },
          { label: 'No. Telefon', type: 'tel', formControl: 'noTel', size: 6, autocomplete: 'tel', inputmode: 'tel' },
          { label: 'Emel', type: 'email', formControl: 'emel', size: 6, autocomplete: 'email', placeholder: 'nama@contoh.com' },
          { label: 'Alamat', type: 'textarea', formControl: 'alamat', autocapitalize: 'words' },
        ]

      case 'tambah-pelajar':
        return [
          { label: 'Nama Pelajar', type: 'text', formControl: 'namaPelajar', autocapitalize: 'words' },
          { label: 'No. KP / Passport', type: 'text', formControl: 'noKP', size: 6, hint: NO_KP_HINT, inputmode: 'numeric' },
          { label: 'Kelas', type: 'text', formControl: 'kelas', size: 6 },
          { label: 'Nama Bapa', type: 'text', formControl: 'namaBapa', size: 6, autocapitalize: 'words' },
          { label: 'Nama Ibu', type: 'text', formControl: 'namaIbu', size: 6, autocapitalize: 'words' },
          { label: 'Alamat', type: 'textarea', formControl: 'alamat', autocapitalize: 'words' },
        ]

      default:
        return []
    }
  }
}
