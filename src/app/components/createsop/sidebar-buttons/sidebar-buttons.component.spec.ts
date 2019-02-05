import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarButtonsComponent } from './sidebar-buttons.component';

describe('SidebarButtonsComponent', () => {
  let component: SidebarButtonsComponent;
  let fixture: ComponentFixture<SidebarButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
