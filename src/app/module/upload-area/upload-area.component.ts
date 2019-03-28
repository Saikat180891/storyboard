import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-upload-area",
  templateUrl: "./upload-area.component.html",
  styleUrls: ["./upload-area.component.scss"],
})
export class UploadAreaComponent implements OnInit {
  @Input("fileType") fileType: string;
  @Input("disabled") disabled: boolean;
  @Output("fileChange") fileChange = new EventEmitter<File>();
  @Input("uploaderName") uploaderName: string;
  @Input("maxLimitText") maxLimitText: string;
  displayFileName: string;
  isFileChosen: boolean = false;
  previewFile: string;
  height: number;

  @ViewChild("fileUploadWrapper") fileUploadWrapper: ElementRef;

  constructor() {}

  ngOnInit() {}

  onFileSelected(fileSelected) {
    this.previewFile = null;
    if (fileSelected.target.files && fileSelected.target.files[0]) {
      this.displayFileName = fileSelected.target.files[0].name;
      this.isFileChosen = true;

      if (fileSelected.target.files[0].type.split("/")[0] === "image") {
        this.height = this.fileUploadWrapper.nativeElement.clientHeight;
        const reader: any = new FileReader();
        reader.readAsDataURL(fileSelected.target.files[0]);
        reader.onload = fileSelected => {
          this.previewFile = fileSelected.target.result;
        };
      }

      this.fileChange.emit(fileSelected.target.files[0]);
    }
  }
}
