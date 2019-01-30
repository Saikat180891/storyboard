import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UicontrolService} from '../services/uicontrol.service';
@Component({
  selector: 'app-createsop',
  templateUrl: './createsop.component.html',
  styleUrls: ['./createsop.component.scss']
})
export class CreatesopComponent implements OnInit, OnChanges {
  openSidebar:any;
  toggleRecentSnapshot:boolean = false;

  constructor(
    private routes:ActivatedRoute, 
    private __uic:UicontrolService
    ) { }

  ngOnInit() {
    console.log(this.routes)
  }
  
  ngOnChanges(){
  }


  isSideBarOpen($event:Event){
    this.openSidebar = $event;
  }

  onOpenSidebar($event:Event){
    console.log($event);
    if($event.type == 'media'){
      this.openSidebar = $event["shouldOpen"];
    }
  }

  onOpenRecentScreenshot($event:boolean){
    this.toggleRecentSnapshot = $event;
  }

}
