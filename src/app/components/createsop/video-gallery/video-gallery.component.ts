import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { SharedService } from "../../../services/shared-services/shared.service";
import { PageService } from "../services/page/page.service";
import { SidebarService } from "../services/sidebar/sidebar.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./video-gallery.component.html",
  styleUrls: ["./video-gallery.component.scss"],
})
export class VideoGalleryComponent implements OnInit, OnChanges {
  @Input("type") type: string;
  @Input("data") data: any;
  @Output("optionSelected") optionSelected = new EventEmitter<any>();
  @Output("addNewFile") addNewFile = new EventEmitter<any>();
  @Output("deleteContent") deleteContent = new EventEmitter<any>();

  selected: number = -1;

  allowedFileFormats = ["video/mp4"];

  constructor(
    private __sidebarService: SidebarService,
    private __page: PageService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {}

  ngOnChanges() {}

  onThumbnailSelect(index: number, content: any) {
    this.selected = index;
  }

  onViewImage(index: number, content: any) {
    this.optionSelected.emit({ index, content });
  }

  onFileSelected($event: any) {
    if (this.isAllowedFormatFile($event.target.files[0])) {
      this.addNewFile.emit($event.target.files[0]);
    } else {
      this.sharedService.raiseError(
        "Only .mp4 video file formats are allowed to upload"
      );
    }
  }

  onPlayVideo(content: any, index: number) {
    this.optionSelected.emit({ index, content });
  }

  onDeleteContent(content, i, type) {
    this.deleteContent.emit({ content, index: i, type });
  }

  isAllowedFormatFile(file) {
    return this.allowedFileFormats.includes(file.type);
  }
}
