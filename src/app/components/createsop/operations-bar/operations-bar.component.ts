import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {StepcontrolService} from '../services/stepcontrol/stepcontrol.service';
import {fromEvent} from 'rxjs';
import {DragDropService} from '../services/draganddrop/drag-drop.service';
@Component({
  selector: 'operations-bar',
  templateUrl: './operations-bar.component.html',
  styleUrls: ['./operations-bar.component.scss']
})
export class OperationsBarComponent implements OnInit {
  @Output('selectedType') selectedType:any = new EventEmitter();
  @ViewChild('calc') calc:ElementRef;
  isMouseDown:boolean = false;

  constructor(
    private __steps:StepcontrolService,
    private __dragDrop:DragDropService) { }

  ngOnInit() {

    // fromEvent(this.calc.nativeElement, 'dragend').subscribe(res=>{
    //   if(this.isMouseDown){
    //     this.__dragDrop.setEvent(res);
    //     // console.log("dragend", res);
    //   }
    // });

    // fromEvent(this.calc.nativeElement, 'mouseup').subscribe(res=>{
    //   console.log("mouseup", res);
    //   this.isMouseDown = false;
    // });
  }

  onInsertNewSection(){
    this.selectedType.emit('section');
  }

  onDragStart($event){
    console.log($event);
    $event.dataTransfer.setData('text/plain', $event.target.innerText);
  }

}
