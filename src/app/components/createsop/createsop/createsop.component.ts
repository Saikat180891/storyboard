import { Component, OnInit, OnChanges, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UicontrolService} from '../services/uicontrol.service';
import {PageService} from '../services/page/page.service';
import {StepcontrolService} from '../services/stepcontrol/stepcontrol.service';
import {DataService} from "../../../data.service";
@Component({
  selector: 'app-createsop',
  templateUrl: './createsop.component.html',
  styleUrls: ['./createsop.component.scss']
})
export class CreatesopComponent implements OnInit, AfterContentChecked, OnChanges {
  openSidebar:any;
  toggleRecentSnapshot:boolean = false;
  imageGalleryContent = [];
  showExportToSop:boolean = false;
  constructor(
    private routes:ActivatedRoute, 
    private __uic:UicontrolService,
    private __page:PageService,
    private __steps:StepcontrolService,
    private __api:DataService
    ) { }

  ngOnInit() {
    /**
     * in the ngOnInit function the windows.location is checked and
     * the the project id and userstory id is extracted and stored in
     * the PageService service
     */
    this.routes.params.subscribe(res=>{
      this.__page.projectId = res.id;
      this.__page.userStoryId = res.userStoryId;
    });
    this.showExportToSop = this.__page.shouldShowExportToSopModal;
  }
  
  ngAfterContentChecked(){
    this.imageGalleryContent = this.__page.imageGalleryContent;
  }

  ngOnChanges(){
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
    // if($event === 'section'){
    //   this.__steps.sopStepsList.push({sectionName:'section name'});
    //   console.log(this.__steps.sopStepsList);
    // }
  }

}
