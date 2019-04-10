import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { InviteUserFieldComponent } from "./invite-user-field.component";

describe("InviteUserFieldComponent", () => {
  let component: InviteUserFieldComponent;
  let fixture: ComponentFixture<InviteUserFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
      declarations: [InviteUserFieldComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteUserFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
