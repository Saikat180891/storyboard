import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {
  @Input('type') type:string;
  @Input('data') data:any;
  @Output('optionSelected') optionSelected = new EventEmitter<any>();
  selected:number = -1;

  constructor() { }

  ngOnInit() {
    console.log(this.type)
  }

  onThumbnailSelect(index:number, content:any){
    this.selected = index;
  }
  
  onViewImage(index:number, content:any){
    this.optionSelected.emit({index:index, content:content});
  }

}
