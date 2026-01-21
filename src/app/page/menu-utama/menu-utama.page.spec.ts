import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuUtamaPage } from './menu-utama.page';

describe('MenuUtamaPage', () => {
  let component: MenuUtamaPage;
  let fixture: ComponentFixture<MenuUtamaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUtamaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
