import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ReasonCodeService } from "../reason-code.service";
@Component({
  selector: "app-import-stories",
  templateUrl: "./import-stories.component.html",
  styleUrls: ["./import-stories.component.scss"],
})
export class ImportStoriesComponent implements OnInit {
  @Output("payloadChange") payloadChange = new EventEmitter<any>();
  @Output("close") close = new EventEmitter<boolean>();

  private excelFile = new FormData();

  uploadForm = new FormGroup({
    isSorocoTemplateUsed: new FormControl("", Validators.required),
  });

  constructor(private reasonCodeService: ReasonCodeService) {}

  ngOnInit() {}

  onFileSelected(fileSelected: File) {
    this.excelFile.set("File", fileSelected);
  }

  exportToExcel() {
    this.reasonCodeService.downloadFile(this.reasonCodeService.sopId);
  }

  onOptionChosen(index: number) {
    switch (index) {
      case 1:
        if (
          this.uploadForm.valid &&
          this.uploadForm.value.isSorocoTemplateUsed === true
        ) {
          this.reasonCodeService.importStories(this.excelFile).subscribe(
            res => this.reasonCodeService.snackbar.open(res),
            err => this.reasonCodeService.snackbar.open(err),
            () => {
              this.reasonCodeService.snackbar.open("Uploaded Successfully");
              this.reasonCodeService.refresh(this.reasonCodeService.sopId);
            }
          );
        }
        return;
      case 2:
        this.close.emit(false);
        return;
    }
  }
}
