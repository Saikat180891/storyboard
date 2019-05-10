import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CookieService } from "ngx-cookie-service";
import { DataService } from "src/app/data.service";
import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { UserstoryCreateEditModalComponent } from "./userstory-create-edit-modal.component";

describe("UserstoryCreateEditModalComponent", () => {
  let component: UserstoryCreateEditModalComponent;
  let fixture: ComponentFixture<UserstoryCreateEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserstoryCreateEditModalComponent],
      imports: [GlobalmoduleModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        DataService,
        CookieService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
