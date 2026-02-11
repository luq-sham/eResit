import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalLihatPelajarComponent } from './modal-lihat-pelajar.component';

describe('ModalLihatPelajarComponent', () => {
  let component: ModalLihatPelajarComponent;
  let fixture: ComponentFixture<ModalLihatPelajarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLihatPelajarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLihatPelajarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
