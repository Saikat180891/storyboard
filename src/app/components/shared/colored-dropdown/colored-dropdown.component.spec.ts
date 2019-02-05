import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredDropdownComponent } from './colored-dropdown.component';

describe('ColoredDropdownComponent', () => {
  let component: ColoredDropdownComponent;
  let fixture: ComponentFixture<ColoredDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColoredDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoredDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
