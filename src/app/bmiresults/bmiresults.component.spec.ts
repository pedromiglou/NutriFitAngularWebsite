import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BMIresultsComponent } from './bmiresults.component';

describe('BMIresultsComponent', () => {
  let component: BMIresultsComponent;
  let fixture: ComponentFixture<BMIresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BMIresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BMIresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
