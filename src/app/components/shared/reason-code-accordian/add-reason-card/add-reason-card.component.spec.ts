import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReasonCardComponent } from './add-reason-card.component';

describe('AddReasonCardComponent', () => {
  let component: AddReasonCardComponent;
  let fixture: ComponentFixture<AddReasonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReasonCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReasonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
