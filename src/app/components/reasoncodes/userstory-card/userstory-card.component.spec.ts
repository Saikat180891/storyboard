import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstoryCardComponent } from './userstory-card.component';

describe('UserstoryCardComponent', () => {
  let component: UserstoryCardComponent;
  let fixture: ComponentFixture<UserstoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
