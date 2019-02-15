import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepConditionComponent } from './step-condition.component';

describe('StepConditionComponent', () => {
  let component: StepConditionComponent;
  let fixture: ComponentFixture<StepConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
