import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepUiInteractionComponent } from './step-ui-interaction.component';

describe('StepUiInteractionComponent', () => {
  let component: StepUiInteractionComponent;
  let fixture: ComponentFixture<StepUiInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepUiInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepUiInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
