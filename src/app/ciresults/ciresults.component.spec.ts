import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CIresultsComponent } from './ciresults.component';

describe('CIresultsComponent', () => {
  let component: CIresultsComponent;
  let fixture: ComponentFixture<CIresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CIresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CIresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
