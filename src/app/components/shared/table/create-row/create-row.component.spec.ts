import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRowComponent } from './create-row.component';

describe('CreateRowComponent', () => {
  let component: CreateRowComponent;
  let fixture: ComponentFixture<CreateRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
