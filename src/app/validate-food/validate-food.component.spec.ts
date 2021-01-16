import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateFoodComponent } from './validate-food.component';

describe('ValidateFoodComponent', () => {
  let component: ValidateFoodComponent;
  let fixture: ComponentFixture<ValidateFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
