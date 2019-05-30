import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { fromEvent } from "rxjs";
import { DragDropService } from "./drag-drop.service";

@Directive({
  selector: "[appDraggable]",
})
export class DragDropDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private dragDrop: DragDropService
  ) {}

  ngOnInit() {
    // Firefox requires this setData for drag/drop to work.
    this.el.nativeElement.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", "");
    });

    this.render.setAttribute(this.el.nativeElement, "draggable", "true");

    fromEvent(this.el.nativeElement, "dragstart").subscribe((res: any) => {
      this.dragDrop.setPayload(res.target.getAttribute("data-buttonType"));
    });

    fromEvent(this.el.nativeElement, "drag").subscribe(res => {});
  }
}
