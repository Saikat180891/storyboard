import { Component, OnInit, OnChanges, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UicontrolService} from '../services/uicontrol.service';
import {PageService} from '../services/page/page.service';
import {StepcontrolService} from '../services/stepcontrol/stepcontrol.service';

@Component({
  selector: 'app-createsop',
  templateUrl: './createsop.component.html',
  styleUrls: ['./createsop.component.scss']
})
export class CreatesopComponent implements OnInit, AfterContentChecked {
  openSidebar:any;
  toggleRecentSnapshot:boolean = false;
  imageGalleryContent = [];
  constructor(
    private routes:ActivatedRoute, 
    private __uic:UicontrolService,
    private __page:PageService,
    private __steps:StepcontrolService
    ) { }

  ngOnInit() {
    this.routes.params.subscribe(res=>{
      this.__page.projectId = res.id;
      this.__page.userStoryId = res.userStoryId;
    });
  }
  
  ngAfterContentChecked(){
    this.imageGalleryContent = this.__page.imageGalleryContent;
  }


  isSideBarOpen($event:Event){
    this.openSidebar = $event;
  }

  onOpenSidebar($event:Event){
    if($event.type == 'media'){
      this.openSidebar = $event["shouldOpen"];
    }
  }

  onOpenRecentScreenshot($event:boolean){
    this.toggleRecentSnapshot = $event;
  }

  onRequestedSelectType($event){
    if($event === 'section'){
      this.__steps.sopStepsList.push({sectionName:'section name'});
    }
  }

}
