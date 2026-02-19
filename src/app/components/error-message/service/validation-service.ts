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

          noKP: [
            { label: 'No. KP', error: 'required', message: 'Sila masukkan Nombor KP / Passport' },
            { label: 'No. KP', error: 'pattern', message: 'Nombor KP / Passport mesti digit tanpa simbol' },
            // { label: 'No. KP', error: 'min', message: 'Nombor KP mesti 12 digit tanpa sengkang' },
            // { label: 'No. KP', error: 'max', message: 'Nombor KP mesti 12 digit tanpa sengkang' }
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
            // { label: 'No. KP', error: 'required', message: 'Sila masukkan Nombor KP / Passport' },
            { label: 'No. KP', error: 'pattern', message: 'Nombor KP / Passport mesti digit tanpa simbol' },
            // { label: 'No. KP', error: 'maxlength', message: 'Nombor KP mesti 12 digit tanpa - simbol' },
            // { label: 'No. KP', error: 'minlength', message: 'Nombor KP mesti 12 digit tanpa - simbol' }
          ],

          kelas: [
            { label: 'Kelas', error: 'required', message: 'Sila masukkan kelas' }
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

      case 'tambah-kakitangan':
        return validations = {
          namaKakitangan: [
            { label: 'Nama Penu', error: 'required', message: 'Sila masukkan nama penuh' }
          ],

          noKP: [
            { label: 'No. KP', error: 'required', message: 'Sila masukkan Nombor KP / Passport' },
            { label: 'No. KP', error: 'pattern', message: 'Nombor KP / Passport mesti digit tanpa - simbol' },
            // { label: 'No. KP', error: 'maxlength', message: 'Nombor KP mesti 12 digit tanpa - simbol' },
            // { label: 'No. KP', error: 'minlength', message: 'Nombor KP mesti 12 digit tanpa - simbol' }
          ],

          noTel: [
            { label: 'Kelas', error: 'required', message: 'Sila masukkan no telefon' }
          ],

          emel: [
            { label: 'Nama Bapa', error: 'required', message: 'Sila masukkan emel' },
            { label: 'Nama Bapa', error: 'email', message: 'Sila masukkan format emel yang betul' }
          ],

          alamat: [
            { label: 'Alamat', error: 'required', message: 'Sila masukkan alamat' }
          ]
        };

      case 'jana-slip-gaji':
        return validations = {
          namaKakitangan: [
            { label: 'Nama Penu', error: 'required', message: 'Sila masukkan nama penuh' }
          ],

          noKP: [
            { label: 'No. KP', error: 'required', message: 'Sila masukkan Nombor KP / Passport' },
            { label: 'No. KP', error: 'pattern', message: 'Nombor KP / Passport mesti 12 digit tanpa - simbol' },
            // { label: 'No. KP', error: 'maxlength', message: 'Nombor KP mesti 12 digit tanpa - simbol' },
            // { label: 'No. KP', error: 'minlength', message: 'Nombor KP mesti 12 digit tanpa - simbol' }
          ],

          noTel: [
            { label: 'Kelas', error: 'required', message: 'Sila masukkan no telefon' }
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
          },

          paymentMonth: [
            { label: 'Bulan Bayaran', error: 'required', message: 'Sila pilih tarikh bulan' }
          ],

          paymentDate: [
            { label: 'Tarikh Bayaran', error: 'required', message: 'Sila pilih tarikh tarikh bayaran' }
          ],
        };

      default:
        return validations = []
    }
  }
}
