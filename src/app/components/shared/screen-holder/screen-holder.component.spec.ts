import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenHolderComponent } from './screen-holder.component';

describe('ScreenHolderComponent', () => {
  let component: ScreenHolderComponent;
  let fixture: ComponentFixture<ScreenHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
