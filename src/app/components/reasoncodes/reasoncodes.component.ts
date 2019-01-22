import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import {ReasonCodeService} from './reason-code.service';
import {ContainerService} from '../projects/container/container.service';
import {CreateUserstoryService} from './userstory-card-create/create-userstory.service';
import {charts} from './chartoptions';
import {fromEvent} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PreloaderService} from '../shared/preloader/preloader.service';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
export interface Userstories {
  id: number;
  sprint: number;
  us: number;
  uname: string;
  priority: string;
  rules: string;
  verified: string;
  fte: number;
  devhrs: number;
  notes: string;
  status: string;
  btn: string;
}

export interface SprintConfig{
  sprint_name: string;
  start_date: string;
  duration: string;
  end_date: string;
}

export interface ReceivedSprintConfig{
  id:number;
  sprint_name: string;
  start_date: string;
  duration: string;
  end_date: string;
}



@Component({
  selector: 'app-reasoncodes',
  templateUrl: './reasoncodes.component.html',
  styleUrls: ['./reasoncodes.component.scss', './move-user-story.scss','./draggable.scss', './completed-warning.scss', './export.scss']
})
export class ReasoncodesComponent implements OnInit, AfterViewInit {
  @ViewChild('totalPage') totalPage:ElementRef;
  @ViewChild('userStoryContainer') userStoryContainer:ElementRef;
  panelOpenState = false;
  options = [1,2,3];
  pieChartOptions = {};
  barChartOptions = {};
  openAddSprint = false;
  sopId:number;
  dateCounter:number = 0;
  userStories = [];
  openEditSideBar:boolean = false;    //toggler to open or close the right side bar to edit
  openCreateSideBar:boolean = false;    //toggler to open or close the right side bar to create
  sprintOptions = [];
  reasonCodeOptions = [];
  fixToTop:boolean = false;
  filter:boolean = false;
  sortBy:boolean = false;
  warning: boolean = false;
  warningToDeleteUserStory:boolean = false;
  clearAllFilter:boolean = true;
  openExport:boolean = false;
  showBenefitsChart:boolean = false;

  addSprintPayload:SprintConfig = {
    sprint_name: '',
    start_date: '',
    duration: '',
    end_date: ''
  };

  validateSprintConfig = {
    start_date: true,
    duration: true,
    end_date: true
  }

  currentSprintData;

  currentProject;

  receivedSprintConfig:ReceivedSprintConfig;

  addSprint = [this.addSprintPayload];

  // fruits = [
  //   {name: 'Lemon'},
  //   {name: 'Lime'},
  //   {name: 'Apple'},
  // ];

  // todo = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];

  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];

  constructor(private route: ActivatedRoute,
              private _reasonCode: ReasonCodeService,
              private _containerService: ContainerService,
              private _createUserStory: CreateUserstoryService,
              private __preloaderService: PreloaderService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._reasonCode.sopId = this._createUserStory.sopId = parseInt(params.id);
      this._containerService.cardContents.forEach(element => {
        if(element.id == this._reasonCode.sopId){
          this.currentProject = element;
        }
      });
    });

  this._reasonCode.refresh(this._reasonCode.sopId);
   
   this.pieChartOptions = charts.pieChart;
   this.barChartOptions = charts.barChart;

   fromEvent(window, 'scroll')
      .subscribe(res => {
        let position = res.target['scrollingElement'].scrollTop;
        if(position > 360){
          // this.fixToTop = true;
          // console.log(this.fixToTop);
        }
      });
    
    setTimeout(()=>{
      fromEvent(this.userStoryContainer.nativeElement, 'scroll')
      .subscribe(res => {
        console.log(res["target"].scrollTop);
        if(res["target"].scrollTop <= 0){
          // this.fixToTop = false;
          // console.log(this.fixToTop);
        }
      });
    }, 500);
  }

  ngAfterViewInit(){
  }

  onSelectDeletedUS(){
    // console.log("deleted us")
    // this._deletedTable.getDeletedUserStories();
  }

  getChart(){
    this._reasonCode.getChartData(35);
  }

  onCloseBenefits(){
    this.showBenefitsChart = false;
  }

  benefitChartImage:string;
  onShowBenefits(){
    if(environment.production){
      this.benefitChartImage = `http://storyboard.service.soroco/sop/epics/charts/${this._reasonCode.sopId}/benefits_realization.png`;
    }else{
      this.benefitChartImage = `http://localhost:8000/sop/epics/charts/${this._reasonCode.sopId}/benefits_realization.png`;
    }
    this.showBenefitsChart = true;
  }

  onAddSprint(){
    // this.addSprint.push(this.addSprintPayload);
    console.log(this.addSprintPayload)
  }

  showNotification(){
    
  }

  clearAllSort(){
    this._reasonCode.getUserStories(this._reasonCode.sopId);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  onOpenAddSprint(){
    this._reasonCode.getSprint(this._reasonCode.sopId);
    this._reasonCode.getReasonCode(this._reasonCode.sopId);
    console.log(this._reasonCode.sprintConfig)
    let sprints = this._reasonCode.sprintConfig;
    this.openAddSprint = !this.openAddSprint;
    
    
  }

  openFilter(){
    this.clearAllFilter = true;
    this.filter = !this.filter;
  }

  createOptionsWithSprintName(){
    this._reasonCode.getSprint(this._reasonCode.sopId);
    this.sprintOptions = [];
    let sprints = this._reasonCode.sprintConfig;
    sprints.forEach(ele=>{
      let temp = {};
      temp = Object.assign({
        status:ele['sprint_name'],
        color:'transparent'
      }
        , temp);
      this.sprintOptions.push(temp);
      console.log(this.sprintOptions);
    });

    this.createOptionsWithReasonCodeName();
  }


  createOptionsWithReasonCodeName(){
    this._reasonCode.getReasonCode(this._reasonCode.sopId);
    this.reasonCodeOptions = [];

    let rcCodes = this._reasonCode.reasonCodeData;
    rcCodes.forEach(element=>{
      let temp = {};
      temp = Object.assign({
        status:element['name'],
        color:'transparent'
      }
        , temp);
      this.reasonCodeOptions.push(temp);
      console.log(this.reasonCodeOptions);
    })
  }

  onCloseAddSprint(){
    this.openAddSprint = false;
  }

  // onSaveSprint(){
  //   this.addSprintPayload.start_date = this.formatDate(this.addSprintPayload.start_date);
  //   this._reasonCode.createSprint(this.addSprintPayload);
  //   this.addSprintPayload = {
  //     sprint_name: '',
  //     start_date: '',
  //     duration: '',
  //     end_date: ''
  //   };
  //   console.log("Received data",this._reasonCode.sprintConfig);
  // }



  onCancel(){
    this._reasonCode.movemodal = false;
  }

  onCreate(){
    this.openCreateSideBar = !this.openCreateSideBar;
    this.createOptionsWithSprintName();
  }


  userStoryData;

  onOpenUserStorySidebar(event, userStory){
    this.openEditSideBar = event;
    this.userStoryData = userStory;
  }

  onCloseEditUserStories(event){
    this.openEditSideBar = event;
  }

  onCloseCreateUserStories(event){
    this.openCreateSideBar = event;
  }

  onDoneWarning($event){
    this.warning = $event;
  }

  onOpenExport(){
    this.openExport = !this.openExport;
  }

  onSelectNo(){
    this.warning = false;
    this._reasonCode.doneSelectStatus.emit(false);
  }

  onSelectYes(){
    this.warning = false;
    this._reasonCode.doneSelectStatus.emit(true);
  }

  onTabChange($event){
    if($event.index == 0){
      this._reasonCode.getUserStories(this._reasonCode.sopId);
    }else if($event.index == 1){
      this._reasonCode.getCompletedUserStories(this._reasonCode.sopId);
    }else if($event.index == 2){
      this._reasonCode.getDeletedUserStories(this._reasonCode.sopId);
    }
  }

  idOfUserStoryToDelete:number;

  onDeleteUserStory($event){
    this.warningToDeleteUserStory = $event.status;
    this.idOfUserStoryToDelete = $event.id;
  }
  
  onSelectDoNotDeleteUserStory(){
    this.warningToDeleteUserStory = false;
  }
  
  onSelectDeleteUserStory(){
    this._reasonCode.deleteUserStory(this.idOfUserStoryToDelete);
    this.warningToDeleteUserStory = false;
  }

  onSortBy(args:string){
    this._reasonCode.sortBy = args;
    let path = '';
    if(this._reasonCode.filterPath != ''){
      path = "?" + this._reasonCode.filterPath + "&" + this._reasonCode.sortBy;
    }else{
      path = "?" + this._reasonCode.sortBy;
    }
    this._reasonCode.filterUserStories(`/sop/epics/${this._reasonCode.sopId}/userstories/filter.json`, path);

    console.log(path)
  }

  onClearAllFilters(){
    this._reasonCode.filterItems = {};
    this._reasonCode.rulesApproved = '';
    this._reasonCode.testCasesVerified = '';
    this._reasonCode.filteredValues = [];
    this._reasonCode.filterPath = '';
    // this._reasonCode.getUserStories(this._reasonCode.sopId);
    this._reasonCode.filterUserStories(`/sop/epics/${this._reasonCode.sopId}/userstories/filter.json`, "?" + this._reasonCode.sortBy);
    this.clearAllFilter = false;
    this._reasonCode.filtersAppliedFlag = false;

  }

  makePath(){
    let filter = this._reasonCode.convertToStringPath(this._reasonCode.filterItems);
    this._reasonCode.filterPath = filter;
    let path = '';
    if(this._reasonCode.sortBy != ''){
      path = "?" + this._reasonCode.filterPath + "&" + this._reasonCode.sortBy;
    }else{
      path = "?" + this._reasonCode.filterPath;
    }
    return path;
  }

  onRemoveFilter(value:string, index:number){
    for(let key in this._reasonCode.filterItems){
      if(key.indexOf(value) != -1){
        delete this._reasonCode.filterItems[key];
        this._reasonCode.filteredValues.splice(index, 1);
        this._reasonCode.filterUserStories(`/sop/epics/${this._reasonCode.sopId}/userstories/filter.json`, this.makePath());
      }
    }
    if(value === "Verified Test Cases = True" || value === "Verified Test Cases = False"){
      this._reasonCode.testCasesVerified = '';
      this._reasonCode.filterUserStories(`/sop/epics/${this._reasonCode.sopId}/userstories/filter.json`, this.makePath());
    }

    if(value === "Rules Approved = True" || value === "Rules Approved = False"){
      this._reasonCode.rulesApproved = '';  
      this._reasonCode.filterUserStories(`/sop/epics/${this._reasonCode.sopId}/userstories/filter.json`, this.makePath());
    }
    console.log(this._reasonCode.filterItems, value);
  }


  /**
   * Rearrange the date in the following format DD/MM/YYYY
   * @param date 
   */
  formatDate(date){
    let dateStr = new Date(date)
    let strDate =  "" + dateStr.getDate() + "/" + (dateStr.getMonth()+1) + "/" + dateStr.getFullYear();
    return strDate;
  }
  
  /**
   * Format the year as 00YY
   * @param year 
   */
  formatYear(year){
    let digits = year.toString().split("");
    return ""+ digits[2] + digits[3];
  }


}
