import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepLoopComponent } from './step-loop.component';

describe('StepLoopComponent', () => {
  let component: StepLoopComponent;
  let fixture: ComponentFixture<StepLoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepLoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
