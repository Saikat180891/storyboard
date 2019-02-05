import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentScreenShotsComponent } from './recent-screen-shots.component';

describe('RecentScreenShotsComponent', () => {
  let component: RecentScreenShotsComponent;
  let fixture: ComponentFixture<RecentScreenShotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentScreenShotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentScreenShotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
