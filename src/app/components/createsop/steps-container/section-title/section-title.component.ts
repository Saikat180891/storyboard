import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import {fromEvent} from 'rxjs';
import {DragDropService} from '../../services/draganddrop/drag-drop.service';
@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit, OnChanges {
  @ViewChild('droppable') droppable:ElementRef;
  isCollapsed:boolean = false;
  @Input('stepParameters') stepParameters:any;
  @Input('externalStepIndex') externalStepIndex:number;
  hovered:boolean = false;
  steps = ['Read', 'Type', 'Condition'];
  constructor(private __dragDrop:DragDropService) {

   }

  ngOnInit() {
    fromEvent(this.droppable.nativeElement, 'drop').subscribe(res=>{
      console.log(res)
    });
    // this.__dragDrop.getEventLocation().subscribe(res=>{
    //   // console.log(res.clientX, res.clientY, this.droppable)
    // });
  }

  ngOnChanges(){
  }

  onCollapse(){
    this.isCollapsed = !this.isCollapsed;
  }

  onDrop($event){
    console.log($event.dataTransfer.getData("text"));
    this.hovered = false;
  }

  allowDrop($event){
    $event.preventDefault();
  }

  onDragEnter($event){
    $event.preventDefault();
    this.hovered = true;
  }

  onDragLeave($event){
    this.hovered = false;
  }
}
