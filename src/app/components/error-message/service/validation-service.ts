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

      default:
        return validations = []
    }
  }
}
