import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsBarComponent } from './operations-bar.component';

describe('OperationsBarComponent', () => {
  let component: OperationsBarComponent;
  let fixture: ComponentFixture<OperationsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
