import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import {ReasonCodeService} from './reason-code.service';
import {ContainerService} from '../projects/container/container.service';
import {CreateUserstoryService} from './userstory-card-create/create-userstory.service';
import {charts} from './chartoptions';
import {fromEvent} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PreloaderService} from '../shared/preloader/preloader.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {DataService} from '../../data.service';
import {ScrollbarService} from '../../services/scrollbarService/scrollbar.service';

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
export class ReasoncodesComponent implements OnInit, AfterViewInit, OnChanges {
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
  rippleColor = 'rbga(0,0,0,0.2)';
  selectedTabIndex:number = 0;
  activateStickybar:boolean = false;
  activateVirtualFilter:boolean = false;
  role:string;
  permissions:any;
  enableView:boolean = true;

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

  constructor(private route: ActivatedRoute,
              private _reasonCode: ReasonCodeService,
              private _containerService: ContainerService,
              private _createUserStory: CreateUserstoryService,
              private __preloaderService: PreloaderService,
              public spinner: NgxSpinnerService,
              private __api:DataService,
              private __scrollbar:ScrollbarService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._reasonCode.sopId = this._createUserStory.sopId = parseInt(params.id);
      this.getPermissionForEpicsPage(2, this._reasonCode.sopId);
      this._containerService.cardContents.forEach(element => {
        if(element.id == this._reasonCode.sopId){
          this.currentProject = element;
        }
      });
    });
    
    
   
    /**
     * assign chart options
     */
    this.pieChartOptions = charts.pieChart;
    this.barChartOptions = charts.barChart;

    /**
     * to make the tab navbar fixed
     */
    this.__scrollbar.broadCastScrollPosition.subscribe(res=>{
      if(res > 401){
        this.activateStickybar = true;
        this.activateVirtualFilter = true;
      }else{
        this.activateStickybar = false;
        this.activateVirtualFilter = false;
      }
    });

  }

  ngOnChanges(){
    
  }
  
  ngAfterViewInit(){
  }

  onSelectDeletedUS(){
    // console.log("deleted us")
    // this._deletedTable.getDeletedUserStories();
  }

  getPermissionForEpicsPage(pageNumber:number, projectId:number){
    this._reasonCode.getPermission(pageNumber, projectId).subscribe(res=>{
      this._reasonCode.role = this.role = res[0].name;
      this._reasonCode.grantedPermission = this.permissions = res[0].permissions;
      if('Can add user stories' in  this.permissions){
        this.enableView = this.permissions['Can add user stories'];
      }
      console.log("Permission for epics", this._reasonCode.role, this._reasonCode.grantedPermission);
    },
    err=>{
      console.log("Error while fetching permissions for epics page", err);
    },
    ()=>{
      this._reasonCode.refresh(this._reasonCode.sopId);
      console.log(this._reasonCode.role, this._reasonCode.grantedPermission);
    });
  }

  getChart(){
    this._reasonCode.getChartData(35);
  }

  onCloseBenefits(){
    this.showBenefitsChart = false;
  }

  benefitChartImage:string;

  onShowBenefits(){
    // if(environment.production){
    this.benefitChartImage = `${this.__api.apiUrl}/sop/epics/charts/${this._reasonCode.sopId}/benefits_realization.png?q=${new Date().getTime()}`;
    // }else{
    //   this.benefitChartImage = `http://localhost:8000/sop/epics/charts/${this._reasonCode.sopId}/benefits_realization.png?q=${new Date().getTime()}`;
    // }
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

  onVirtualTabClicked(value:number){
    if(value == 0){
      this.selectedTabIndex = value;
      this._reasonCode.getUserStories(this._reasonCode.sopId);
    }else if(value == 1){
      this.selectedTabIndex = value;
      this._reasonCode.getCompletedUserStories(this._reasonCode.sopId);
    }else if(value == 2){
      this.selectedTabIndex = value;
      this._reasonCode.getDeletedUserStories(this._reasonCode.sopId);
    }
  }

  onTabChange($event){
    if($event.index == 0){
      this.selectedTabIndex = 0;
      this._reasonCode.getUserStories(this._reasonCode.sopId);
    }else if($event.index == 1){
      this.selectedTabIndex = 1;
      this._reasonCode.getCompletedUserStories(this._reasonCode.sopId);
    }else if($event.index == 2){
      this.selectedTabIndex = 2;
      this._reasonCode.getDeletedUserStories(this._reasonCode.sopId);
    }
  }

  openVirtualFilter(){
    this.activateVirtualFilter = !this.activateVirtualFilter;
    this.openFilter();
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
    this.sortBy = true;
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
    this._reasonCode.getUserStories(this._reasonCode.sopId);
    // this._reasonCode.filterUserStories(`/sop/epics/${this._reasonCode.sopId}/userstories/filter.json`, "?" + this._reasonCode.sortBy);
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
