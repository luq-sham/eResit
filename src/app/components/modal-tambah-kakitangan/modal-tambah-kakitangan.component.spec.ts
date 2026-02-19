import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTambahKakitanganComponent } from './modal-tambah-kakitangan.component';

describe('ModalTambahKakitanganComponent', () => {
  let component: ModalTambahKakitanganComponent;
  let fixture: ComponentFixture<ModalTambahKakitanganComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTambahKakitanganComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTambahKakitanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
