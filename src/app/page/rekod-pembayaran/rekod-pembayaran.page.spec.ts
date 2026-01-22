import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RekodPembayaranPage } from './rekod-pembayaran.page';

describe('RekodPembayaranPage', () => {
  let component: RekodPembayaranPage;
  let fixture: ComponentFixture<RekodPembayaranPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RekodPembayaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
