import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertService } from 'src/app/components/alert-modal/service/alert-service';
import * as moment from 'moment';

@Component({
  selector: 'app-rekod-pembayaran',
  templateUrl: './rekod-pembayaran.page.html',
  styleUrls: ['./rekod-pembayaran.page.scss'],
  standalone: false
})
export class RekodPembayaranPage implements OnInit {

  minDate: string = moment().subtract(1, 'month').format('YYYY-MM-DD');
  maxDate: string = moment().add(1, 'year').format('YYYY-MM-DD');

  tarikhBayaran: any

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  items = [
    { butiran: '', jumlah: null }
  ];

  addItem() {
    this.items.push({ butiran: '', jumlah: null });
  }

  removeItem(index: number) {
    if (this.items.length == 1) {
      this.alertService.dangerAlert('Perhatian', 'Sila isi sekurang-kurangnya satu(1) butiran maklumat pembayaran diisi.', 'Tutup')
      return
    }
    this.items.splice(index, 1);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      return total + (Number(item.jumlah) || 0);
    }, 0);
  }

  check(event: any) {
    console.log(event);
  }

}
