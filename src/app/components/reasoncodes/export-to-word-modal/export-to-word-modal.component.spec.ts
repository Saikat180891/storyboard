import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CookieService } from "ngx-cookie-service";
import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { ReasoncodeModule } from "../reasoncode.module";
import { ExportToWordModalComponent } from "./export-to-word-modal.component";
import { ExportToWordModalService } from "./export-to-word-modal.service";
//TODO: write test cases
// describe("ExportToWordModalComponent", () => {
//   let component: ExportToWordModalComponent;
//   let fixture: ComponentFixture<ExportToWordModalComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [ReasoncodeModule, HttpClientTestingModule, GlobalmoduleModule],
//       providers: [
//         ExportToWordModalService,
//         { provide: MAT_DIALOG_DATA, useValue: {} },
//         { provide: MatDialogRef, useValue: {} },
//         CookieService,
//       ],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ExportToWordModalComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });
// });
