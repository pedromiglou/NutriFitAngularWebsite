import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodmanagementComponent } from './foodmanagement.component';

describe('FoodmanagementComponent', () => {
  let component: FoodmanagementComponent;
  let fixture: ComponentFixture<FoodmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
