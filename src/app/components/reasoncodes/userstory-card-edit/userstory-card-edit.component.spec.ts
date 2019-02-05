import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstoryCardEditComponent } from './userstory-card-edit.component';

describe('UserstoryCardEditComponent', () => {
  let component: UserstoryCardEditComponent;
  let fixture: ComponentFixture<UserstoryCardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstoryCardEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
