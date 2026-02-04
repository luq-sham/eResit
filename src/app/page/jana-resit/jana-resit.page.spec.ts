import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JanaResitPage } from './jana-resit.page';

describe('JanaResitPage', () => {
  let component: JanaResitPage;
  let fixture: ComponentFixture<JanaResitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JanaResitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
