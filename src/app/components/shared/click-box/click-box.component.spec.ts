import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickBoxComponent } from './click-box.component';

describe('ClickBoxComponent', () => {
  let component: ClickBoxComponent;
  let fixture: ComponentFixture<ClickBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
