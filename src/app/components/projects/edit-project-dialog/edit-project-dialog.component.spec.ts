import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DebugElement } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieService } from "ngx-cookie-service";
import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { ProjectsModule } from "../projects.module";
import { EditProjectDialogComponent } from "./edit-project-dialog.component";

describe("EditProjectDialogComponent", () => {
  let component: EditProjectDialogComponent;
  let fixture: ComponentFixture<EditProjectDialogComponent>;
  let debugElement: DebugElement;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        GlobalmoduleModule,
        BrowserAnimationsModule,
        ProjectsModule,
        HttpClientTestingModule,
      ],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectDialogComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("dialog text", () => {
    describe("in create mode", () => {
      beforeEach(() => {
        component.createMode = true;
        fixture.detectChanges();
      });

      it("has correct header text", () => {
        expect(element.querySelector(".dialog-header").innerHTML).toContain(
          component.newProjectHeaderText
        );
      });
      it("has correct submit button text", () => {
        expect(element.querySelector(".button-box").innerHTML).toContain(
          component.newProjectSubmitButtonText
        );
      });
    });

    describe("in edit mode", () => {
      it("has correct header text", () => {
        expect(element.querySelector(".dialog-header").innerHTML).toContain(
          component.editProjectHeaderText
        );
      });
      it("has correct submit button text", () => {
        expect(element.querySelector(".button-box").innerHTML).toContain(
          component.editProjectSubmitButtonText
        );
      });
    });
  });
});
