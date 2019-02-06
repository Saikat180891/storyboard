import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UicontrolService} from '../services/uicontrol.service';
import {PageService} from '../services/page/page.service';
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
    private __uic:UicontrolService,
    private __page:PageService
    ) { }

  ngOnInit() {
    this.routes.params.subscribe(res=>{
      this.__page.projectId = res.id;
      this.__page.userStoryId = res.userStoryId;
    });
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
