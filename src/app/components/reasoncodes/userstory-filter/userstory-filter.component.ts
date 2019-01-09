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


  constructor(private __rcService: ReasonCodeService) { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    this.sprints = this.__rcService.sprintConfig;
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
    // console.log(this.filter, "rules_approved=" + this.rulesApproved + "," + "verified_test_cases=" + this.testCasesVerified);

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
    // console.log(path);
    // this.__rcService.filterItems
  }

  convertToStringPath(object){

    for(let x in object){
      if(object[x] === false){
        delete object[x]
      }
    }

    let keys = Object.keys(object), splitedElements = [], temp = [], newArrayX = [], keysExtracted;
    for(let element of keys){
      let formatedText = element.split("$");
      temp.push(formatedText[0]);
      splitedElements.push(formatedText);
    }
    // console.log(temp, splitedElements)

    let filterValues = function(){
      let ele = [];
      for(let x of splitedElements){
        ele.push(x[1]);
      }
      return ele;
    }
    this.__rcService.filteredValues = filterValues();
    console.log(this.__rcService.filteredValues)

    function removeDups(names) {
      let unique = {};
      names.forEach(function(i) {
        if(!unique[i]) {
          unique[i] = true;
        }
      });
      return Object.keys(unique);
    }
    keysExtracted = removeDups(temp);
    // console.log(keysExtracted)

    keysExtracted.forEach(element=>{
      let newArray = [];
      newArray.push(element);
      newArray.push("=");
      for(let ele of splitedElements){
        if(ele[0] === element){
          newArray.push(ele[1]);
          if(ele.indexOf(element) != -1){
            newArray.push(",");
          }
        }
      }
      newArrayX.push(newArray);
    });
    let path = [];
    for(let ele of newArrayX){
      ele.pop();
      path.push(ele.join(""));
    }
    let url = path.join("&");
    if(this.rulesApproved === 'True'){
      url = url + "&" + "rules_approved=True";
    }
    if(this.rulesApproved === 'False'){
      url = url + "&" + "rules_approved=False";
    }
    if(this.testCasesVerified === 'True'){
      url = url + "&" + "verified_test_cases=Yes";
    }
    if(this.testCasesVerified === 'False'){
      url = url + "&" + "verified_test_cases=False";
    }
    // console.log(url);
    return url;
  }

}
