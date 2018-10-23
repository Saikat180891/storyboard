import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainScreenHolderComponent } from './main-screen-holder.component';

describe('MainScreenHolderComponent', () => {
  let component: MainScreenHolderComponent;
  let fixture: ComponentFixture<MainScreenHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainScreenHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainScreenHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
