import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCalculationComponent } from './step-calculation.component';

describe('StepCalculationComponent', () => {
  let component: StepCalculationComponent;
  let fixture: ComponentFixture<StepCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
