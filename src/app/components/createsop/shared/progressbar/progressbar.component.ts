import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {UicontrolService} from '../../services/uicontrol.service';
@Component({
  selector: 'progress-bar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit, OnChanges {
  @Input('progressChange') progressChange:number;
  @Output('changeCurrentTime') changeCurrentTime = new EventEmitter<any>();
  width:string;
  progressValue:number = 0;

  constructor(private __uic:UicontrolService) { }

  ngOnInit() {
  }
  
  ngOnChanges(){
    this.width = this.progressChange.toFixed(1) + "%";
    this.progressValue = this.progressChange;
  }

  onDragHandle($event){
    this.width = $event + "%";
    this.progressValue = $event;
  }
  
  onClickHandle(value){
    this.changeCurrentTime.emit(value);
    // console.log(value)
  }

}
