import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
  standalone: false
})
export class AlertModalComponent implements OnInit {

  @Input() header: any;
  @Input() message: any = '';
  @Input() confirmBtn: any;
  @Input() cancelBtn: any;
  @Input() alertType: any;
  @Input() hasConfirm: any;

  constructor(
    private modalCtrl: ModalController
  ) { }

  dismiss() {
    this.modalCtrl.dismiss({
      'role': 'cancel'
    });
  }

  confirm() {
    this.modalCtrl.dismiss({
      'role': 'confirm'
    });
  }

  ngOnInit() {
  }

}
