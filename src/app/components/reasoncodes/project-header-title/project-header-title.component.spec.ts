import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHeaderTitleComponent } from './project-header-title.component';

describe('ProjectHeaderTitleComponent', () => {
  let component: ProjectHeaderTitleComponent;
  let fixture: ComponentFixture<ProjectHeaderTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectHeaderTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectHeaderTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
