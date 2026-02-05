import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalLihatPembayaranComponent } from './modal-lihat-pembayaran.component';

describe('ModalLihatPembayaranComponent', () => {
  let component: ModalLihatPembayaranComponent;
  let fixture: ComponentFixture<ModalLihatPembayaranComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLihatPembayaranComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLihatPembayaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
