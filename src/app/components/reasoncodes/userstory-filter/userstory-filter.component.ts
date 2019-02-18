import { Component, OnInit, Output, EventEmitter, AfterContentInit, AfterContentChecked } from '@angular/core';
import {ReasonCodeService} from '../reason-code.service';

interface Filter{
  high?: boolean;
  medium?: boolean;
  low?: boolean;
  sprints?:any;
}

@Component({
  selector: 'userstory-filter',
  templateUrl: './userstory-filter.component.html',
  styleUrls: ['./userstory-filter.component.scss']
})
export class UserstoryFilterComponent implements OnInit, AfterContentChecked {

  @Output('closeFilter') closeFilter = new EventEmitter<boolean>();
  sprints:any;
  statuss = ['Backlog', 'Rules', 'Development', 'Intl Testing', 'Ext Testing', 'Done'];
  priorities = ['High', 'Medium', 'Low'];
  others1 = ['True', 'False'];
  others2 = ['True', 'False'];
  rulesApproved:string;
  testCasesVerified:string;
  epics:any;


  constructor(private __rcService: ReasonCodeService) { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    this.sprints = this.__rcService.sprintConfig;
    this.epics = this.__rcService.reasonCodeData;
  }

  onCloseFilter(){
    if(!this.__rcService.filtersAppliedFlag){
      this.__rcService.filterItems = {};
      this.__rcService.rulesApproved = '';
      this.__rcService.testCasesVerified = '';
    }
    this.closeFilter.emit(false);
  }

  onApplyFilter(){
    let filter = this.__rcService.convertToStringPath(this.__rcService.filterItems);
    this.__rcService.filterPath = filter;
    let path = '';
    if(this.__rcService.sortBy != ''){
      path = "?" + this.__rcService.filterPath + "&" + this.__rcService.sortBy;
    }else{
      path = "?" + this.__rcService.filterPath;
    }
    this.__rcService.filterUserStories(`/sop/epics/${this.__rcService.sopId}/userstories/filter.json`, path);
    this.__rcService.filtersAppliedFlag = true;
    this.closeFilter.emit(false);
    // console.log(path); //this is required while testing
  }
  
}
