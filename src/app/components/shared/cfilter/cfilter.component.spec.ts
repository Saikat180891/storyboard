import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfilterComponent } from './cfilter.component';

describe('CfilterComponent', () => {
  let component: CfilterComponent;
  let fixture: ComponentFixture<CfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
