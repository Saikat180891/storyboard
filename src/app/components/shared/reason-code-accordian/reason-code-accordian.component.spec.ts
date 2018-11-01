import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonCodeAccordianComponent } from './reason-code-accordian.component';

describe('ReasonCodeAccordianComponent', () => {
  let component: ReasonCodeAccordianComponent;
  let fixture: ComponentFixture<ReasonCodeAccordianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonCodeAccordianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonCodeAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
