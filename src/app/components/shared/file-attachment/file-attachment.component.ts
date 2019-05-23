import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";

export interface DialogData {
  message: string;
}

enum FileIcon {
  ms_word = "word.svg",
  ms_excel = "excel.svg",
  ms_powerpoint = "powerpoint.svg",
  pdf = "pdf.png",
}

@Component({
  selector: "app-file-attachment",
  templateUrl: "./file-attachment.component.html",
  styleUrls: ["./file-attachment.component.scss"],
})
export class FileAttachmentComponent {
  fileNameSelected: string = "File Name";
  fileSelected: any;
  fileIconType: string;

  constructor(
    public dialogRef: MatDialogRef<FileAttachmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.fileSelected = event.target.files[0];
      this.fileNameSelected = this.fileSelected.name;
      if (this.fileSelected.size > 26214400) {
        this.snackBar.open("File Size must be less than 25MB", "Fail", {
          duration: 3000,
        });
        this.fileSelected = "";
        this.fileNameSelected = "";
      }
      const fileExtension = this.fileNameSelected.split(".").pop();
      this.getFileIcon(fileExtension);
    }
  }

  onAttach() {
    this.dialogRef.close(this.fileSelected);
  }

  onCancel() {
    this.dialogRef.close();
  }

  getFileIcon(extension) {
    switch (extension) {
      case "docx": {
        this.fileIconType = FileIcon.ms_word;
        break;
      }
      case "xlsx": {
        this.fileIconType = FileIcon.ms_excel;
        break;
      }
      case "pdf": {
        this.fileIconType = FileIcon.pdf;
        break;
      }
      case "pptx": {
        this.fileIconType = FileIcon.ms_powerpoint;
        break;
      }
      case "doc": {
        this.fileIconType = FileIcon.ms_word;
        break;
      }
    }
    return this.fileIconType;
  }
}
