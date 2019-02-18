import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {StepcontrolService} from '../../services/stepcontrol/stepcontrol.service';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit, OnChanges {
  @Input('stepParameters') stepParameters:any;
  @Input('externalStepIndex') externalStepIndex:number;
  @Output('sectionPayload') sectionPayload = new EventEmitter<any>();

  isCollapsed:boolean = false;
  constructor(private stepCtrl:StepcontrolService) {}

  ngOnInit() {
  }
  
  ngOnChanges(){
    console.log(this.stepParameters)
  }

  onCollapse(){
    this.isCollapsed = !this.isCollapsed;
  }

  allowDrop($event){
    $event.preventDefault();
  }

  onDropData($event:any){
    this.sectionPayload.emit({
      data: $event,
      index: this.externalStepIndex
    });
    console.log($event);
  }
}
