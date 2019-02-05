import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesopComponent } from './createsop.component';

describe('CreatesopComponent', () => {
  let component: CreatesopComponent;
  let fixture: ComponentFixture<CreatesopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
