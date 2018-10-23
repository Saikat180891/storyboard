import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStepsHolderComponent } from './add-steps-holder.component';

describe('AddStepsHolderComponent', () => {
  let component: AddStepsHolderComponent;
  let fixture: ComponentFixture<AddStepsHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStepsHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStepsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
