import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
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

  constructor(
    private __sidebarService: SidebarService,
    private __page: PageService
  ) {}

  ngOnInit() {
    // console.log(this.data)
  }

  ngOnChanges() {
    // if(this.type == 'VIDEO'){
    //   this.optionSelected.emit({index:0, content:this.data[0]});
    // }
  }

  onThumbnailSelect(index: number, content: any) {
    this.selected = index;
  }

  onViewImage(index: number, content: any) {
    this.optionSelected.emit({ index, content });
  }

  onFileSelected($event: any) {
    this.addNewFile.emit($event.target.files[0]);
  }

  onPlayVideo(content: any, index: number) {
    this.optionSelected.emit({ index, content });
  }

  onDeleteContent(content, i, type) {
    this.deleteContent.emit({ content, index: i, type });
  }
}
