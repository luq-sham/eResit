import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  validations(formCode: any) {
    let validations: any
    switch (formCode) {

      case 'rekod-pembayaran':
        return validations = {
          namaPelajar: [
            { label: 'Nama Pelajar', error: 'required', message: 'Sila masukkan nama pelajar' }
          ],
          kelas: [
            { label: 'Kelas', error: 'required', message: 'Sila masukkan kelas' }
          ],
          jenisBayaran: [
            { label: 'Jenis Bayaran', error: 'required', message: 'Sila pilih jenis bayaran' }
          ],
          tarikhBayaran: [
            { label: 'Tarikh Bayaran', error: 'required', message: 'Sila pilih tarikh bayaran' }
          ],
          detailsBayaran: {
            items: {
              butiran: [
                { label: 'Butiran Bayaran', error: 'required', message: 'Sila masukkan butiran bayaran' }
              ],
              jumlah: [
                { label: 'Jumlah Bayaran', error: 'required', message: 'Sila masukkan jumlah bayaran' },
                { label: 'Jumlah Bayaran', error: 'min', message: 'Jumlah mestilah 1 atau lebih' }
              ]
            }
          }
        }

      case 'tambah-pelajar':
        return validations = {
          namaPelajar: [
            { label: 'Nama Pelajar', error: 'required', message: 'Sila masukkan nama pelajar' }
          ],

          noKP: [
            { label: 'No. KP', error: 'required', message: 'Sila masukkan nombor KP' },
            { label: 'No. KP', error: 'pattern', message: 'Nombor KP mesti 12 digit tanpa sengkang' },
            { label: 'No. KP', error: 'minLength', message: 'Nombor KP mesti 12 digit tanpa sengkang' },
            { label: 'No. KP', error: 'maxLength', message: 'Nombor KP mesti 12 digit tanpa sengkang' }
          ],

          namaBapa: [
            { label: 'Nama Bapa', error: 'required', message: 'Sila masukkan nama bapa' }
          ],

          namaIbu: [
            { label: 'Nama Ibu', error: 'required', message: 'Sila masukkan nama ibu' }
          ],

          alamat: [
            { label: 'Alamat', error: 'required', message: 'Sila masukkan alamat' }
          ]
        };

      default:
        return validations = []
    }
  }
}
