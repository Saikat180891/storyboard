import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CanvasCrouselComponent } from "./canvas-crousel.component";

describe("CanvasCrouselComponent", () => {
  let component: CanvasCrouselComponent;
  let fixture: ComponentFixture<CanvasCrouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasCrouselComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasCrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
