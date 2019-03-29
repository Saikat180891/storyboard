import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { ProjectsModule } from "../../projects.module";

import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { Assignee } from "../../models/assignee.model";
import { Role } from "../../models/enums";
import { AssigneeCardComponent } from "./assignee-card.component";

describe("AssigneeCardComponent", () => {
  let component: AssigneeCardComponent;
  let fixture: ComponentFixture<AssigneeCardComponent>;
  let debugElement: DebugElement;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        GlobalmoduleModule,
        BrowserAnimationsModule,
        ProjectsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigneeCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("assignee details", () => {
    it("should display user name", () => {
      const testAssignee: Assignee = {
        user: "Test User",
        role: null,
      };
      component.assignee = testAssignee;
      fixture.detectChanges();
      expect(element.querySelector(".user-details").innerHTML).toContain(
        testAssignee.user
      );
    });

    it("should display email and user name", () => {
      const testAssignee: Assignee = {
        user: "Test User",
        email: "testuser@test.com",
        role: null,
      };
      component.assignee = testAssignee;
      fixture.detectChanges();
      expect(element.querySelector(".user-details").innerHTML).toContain(
        testAssignee.user
      );
      expect(element.querySelector(".user-details").innerHTML).toContain(
        testAssignee.email
      );
    });
  });

  describe("dropdown functionality", () => {
    // TODO: should test for contents of dropdown options

    it("should disable dropdown when changeRoleDisabled is true", () => {
      component.changeRoleDisabled = true;
      fixture.detectChanges();
      const disabled = element
        .querySelector(".select-role mat-select")
        .getAttribute("aria-disabled");
      expect(disabled).toBe("true");
    });

    it("should not disable dropdown when changeRoleDisabled is false", () => {
      component.changeRoleDisabled = false;
      fixture.detectChanges();
      const disabled = element
        .querySelector(".select-role mat-select")
        .getAttribute("aria-disabled");
      expect(disabled).toBe("false");
    });

    it("should display assignee's role", () => {
      const testAssignee: Assignee = {
        user: "Test User",
        email: "testuser@test.com",
        role: Role.SUPER_ADMIN,
      };
      component.assignee = testAssignee;
      fixture.detectChanges();
      expect(
        element.querySelector(".select-role mat-select").innerHTML
      ).toContain(testAssignee.role);

      testAssignee.role = Role.MANAGER;
      fixture.detectChanges();
      expect(
        element.querySelector(".select-role mat-select").innerHTML
      ).toContain(testAssignee.role);
    });
  });

  describe("delete functionality", () => {
    it("should display delete button when canRemoveAssignees is true", () => {
      component.canRemoveAssignees = true;
      fixture.detectChanges();
      const deleteButton = element.querySelector(".list-close");
      expect(deleteButton).toBeTruthy();
    });

    it("should emit removeAssignee on delete button click", () => {
      component.canRemoveAssignees = true;
      fixture.detectChanges();
      const deleteButton = element.querySelector(".list-close");
      spyOn(component.removeAssignee, "emit");

      deleteButton.click();
      fixture.detectChanges();

      expect(component.removeAssignee.emit).toHaveBeenCalledTimes(1);
    });

    it("should not display delete button when canRemoveAssignees is false", () => {
      component.canRemoveAssignees = false;
      fixture.detectChanges();
      const deleteButton = element.querySelector(".list-close");
      expect(deleteButton).toBeFalsy();
    });
  });
});
