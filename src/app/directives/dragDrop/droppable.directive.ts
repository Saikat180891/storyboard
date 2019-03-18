import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";
import { fromEvent } from "rxjs";
import { DragDropService } from "./drag-drop.service";
@Directive({
  selector: "[appDroppable]",
})
export class DroppableDirective implements OnInit {
  @Output("transferedData") transferedData = new EventEmitter<string>();

  renderStyles: boolean = false;

  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private dragDrop: DragDropService
  ) {}

  ngOnInit() {
    fromEvent(this.el.nativeElement, "dragover").subscribe(res => {
      // console.log("dragover", res);
      if (this.renderStyles) {
        this.render.setStyle(
          this.el.nativeElement,
          "border",
          "5px dashed #989B9C"
        );
      }
    });

    fromEvent(this.el.nativeElement, "dragenter").subscribe(res => {
      // console.log("dragenter", res);
      this.renderStyles = true;
    });

    fromEvent(this.el.nativeElement, "dragleave").subscribe(res => {
      // console.log("dragleave", res);
      this.renderStyles = false;
      if (!this.renderStyles) {
        this.render.setStyle(
          this.el.nativeElement,
          "border",
          "1px dashed #989B9C"
        );
      }
    });

    fromEvent(this.el.nativeElement, "drop").subscribe(res => {
      // console.log("drop", res);
      this.renderStyles = false;
      if (!this.renderStyles) {
        this.render.setStyle(
          this.el.nativeElement,
          "border",
          "1px dashed #989B9C"
        );
      }
      this.transferedData.emit(this.dragDrop.getPayload());
    });
  }
}
//(dragover)="allowDrop($event)" (drop)="onDrop($event)" (dragenter)="onDragEnter($event)" dragleave
