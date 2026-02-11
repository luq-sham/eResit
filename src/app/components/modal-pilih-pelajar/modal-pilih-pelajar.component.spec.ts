import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPilihPelajarComponent } from './modal-pilih-pelajar.component';

describe('ModalPilihPelajarComponent', () => {
  let component: ModalPilihPelajarComponent;
  let fixture: ComponentFixture<ModalPilihPelajarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPilihPelajarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPilihPelajarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
