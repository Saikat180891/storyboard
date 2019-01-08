import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstoryFilterComponent } from './userstory-filter.component';

describe('UserstoryFilterComponent', () => {
  let component: UserstoryFilterComponent;
  let fixture: ComponentFixture<UserstoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
