import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReasoncodeModule } from "../reasoncode.module";
import { ModalFooterComponent } from "./modal-footer.component";

describe("ModalFooterComponent", () => {
  let component: ModalFooterComponent;
  let fixture: ComponentFixture<ModalFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReasoncodeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
