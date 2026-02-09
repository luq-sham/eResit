import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SenaraiPembayaranPage } from './senarai-pembayaran.page';

describe('SenaraiPembayaranPage', () => {
  let component: SenaraiPembayaranPage;
  let fixture: ComponentFixture<SenaraiPembayaranPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiPembayaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
