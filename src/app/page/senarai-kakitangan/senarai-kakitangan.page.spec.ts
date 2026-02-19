import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SenaraiKakitanganPage } from './senarai-kakitangan.page';

describe('SenaraiKakitanganPage', () => {
  let component: SenaraiKakitanganPage;
  let fixture: ComponentFixture<SenaraiKakitanganPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiKakitanganPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
