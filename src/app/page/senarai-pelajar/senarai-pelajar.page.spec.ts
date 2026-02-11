import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SenaraiPelajarPage } from './senarai-pelajar.page';

describe('SenaraiPelajarPage', () => {
  let component: SenaraiPelajarPage;
  let fixture: ComponentFixture<SenaraiPelajarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiPelajarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
