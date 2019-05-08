import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { UserstoryMenuBarComponent } from "./userstory-menu-bar.component";

describe("UserstoryMenuBarComponent", () => {
  let component: UserstoryMenuBarComponent;
  let fixture: ComponentFixture<UserstoryMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
      declarations: [UserstoryMenuBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
