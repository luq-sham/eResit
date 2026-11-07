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
          { label: 'Nama Penuh', type: 'text', formControl: 'namaKakitangan', autocomplete: 'name' },
          { label: 'No. KP / Passport', type: 'text', formControl: 'noKP' },
          { label: 'No. Telefon', type: 'tel', formControl: 'noTel', size: 6, autocomplete: 'tel', inputmode: 'tel' },
          { label: 'Emel', type: 'email', formControl: 'emel', size: 6, autocomplete: 'email', placeholder: 'nama@contoh.com' },
          { label: 'Alamat', type: 'textarea', formControl: 'alamat' },
        ]

      case 'tambah-pelajar':
        return [
          { label: 'Nama Pelajar', type: 'text', formControl: 'namaPelajar' },
          { label: 'No. KP / Passport', type: 'text', formControl: 'noKP', size: 6, hint: NO_KP_HINT, inputmode: 'numeric' },
          { label: 'Kelas', type: 'text', formControl: 'kelas', size: 6 },
          { label: 'Nama Bapa', type: 'text', formControl: 'namaBapa', size: 6 },
          { label: 'Nama Ibu', type: 'text', formControl: 'namaIbu', size: 6 },
          { label: 'Alamat', type: 'textarea', formControl: 'alamat' },
        ]

      default:
        return []
    }
  }
}
