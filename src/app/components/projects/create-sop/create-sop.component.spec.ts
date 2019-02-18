import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSopComponent } from './create-sop.component';

describe('CreateSopComponent', () => {
  let component: CreateSopComponent;
  let fixture: ComponentFixture<CreateSopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
