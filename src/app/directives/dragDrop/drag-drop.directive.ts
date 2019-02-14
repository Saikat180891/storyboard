import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DragDropDirective implements OnInit {
  // @Input('appDraggable') appDraggable:any|ElementRef;

  constructor(private el:ElementRef) { }

  ngOnInit(){
    this.el.nativeElement.style.backgroundColor = "green";
    console.log(this.el.nativeElement);
  }

}
