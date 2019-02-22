import { Injectable, EventEmitter } from '@angular/core';
import {DataService}  from '../../data.service';
import {environment} from '../../../environments/environment';
// import { EventEmitter } from 'protractor'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import {UtilsService} from '../../utils.service'

@Injectable({
  providedIn: 'root'
})
export class ReasonCodeService {
  sopId:number;
  sprintConfig = [];
  currentSprintData = [];
  totalSprintData = [];
  // currentSprintData = [];
  currentProject = {};
  userStories = [];
  movemodal:boolean = false;
  openCreateSideBar:boolean = false;
  openEditSideBar:boolean = false;
  benefitsChartData = [];
  totalProjectStatus = [];
  currentSprintDuration = [];
  completeUserStories = [];
  deletedUserStories = [];
  reasonCodeData = [];
  filteredValues = [];
  filterItems = {};
  filtersAppliedFlag:boolean = false;
  rulesApproved:string;
  testCasesVerified:string;
  doneSelectStatus:EventEmitter<boolean> = new EventEmitter();

  sortBy = '';
  filterPath = '';

  grantedPermission:any;
  role:string;

  constructor(private _api:DataService,
              public snackbar:MatSnackBar,
              private __utils: UtilsService) { }

  
  /**
   * 
   * get permission
   */
  getPermission(pageNumber:number, projectId:number){
    return this._api.getPermission(pageNumber, projectId);
  }
  

  /**
   * This api is used to create a new sprint, it is called in the sprint config component
   * @param payload 
   */
  createSprint(payload){
    payload.forEach(element => {
      element.start_date = this.__utils.datetypeToStringWithoutTime(element.start_date);
      if(element.duration){
        this._api.postData(`/sop/${this.sopId}/sprint.json`, element).subscribe(response=>{});
      }
    });
    this.getSprint(this.sopId);
  }

  /**
   * This API call is used to get SOP by ID
   * @param id 
   */
  getSopByID(id:number){
    this._api.fetchData(`/sop/${id}.json`)
      .subscribe(response=>{
        this.currentProject = response;
      });
  }

  /**
   * This api is used to get details of all the sprints
   */
  getSprint(id){
    this._api.fetchData(`/sop/${id}/sprint.json`)
      .subscribe(response=>{
        response.forEach((element, index)=>{
          element['sprintNumber'] = index + 1;
        });
        this.sprintConfig = response.reverse();
      });
  }

  /**
   * this api is used to delete a sprint by it id
   * @param id - id of the sprint
   */
  deleteSprint(id){
    this._api.delete('/sop/sprint', `${id}.json`)
      .subscribe(response=>{
        this.refresh(this.sopId);
      });
  }

  editSprint(id, data){
    data['start_date'] = this.__utils.datetypeToStringWithoutTime(data['start_date']);
    this._api.update(`/sop/sprint`, `${id}.json`, data)
      .subscribe(response=>{
        this.getSprint(this.sopId);
      });
  }

  getDeletedUserStories(id){
    this._api.fetchData(`/sop/epics/${id}/userstories/fetchDeleted.json`)
      .subscribe(response=>{
        response.forEach(element=>{
          element['productivity'] = (parseFloat(element.ftes) / parseFloat(element.dev_hrs)).toFixed(1);
          element['productivity'] = isFinite(element['productivity']) ? element['productivity'] : '----';
          element['planned_delivery'] = this.__utils.formatDateToUS(element['planned_delivery']);
          element['revised_delivery'] = element['revised_delivery'] != null ? this.__utils.formatDateToUS(element['revised_delivery']) : '-----';
        });
        this.deletedUserStories = response;
      });
  }

  getUserStories(id){
    const api =  `/sop/epics/${id}/userstories.json`;
    this._api.fetchData(api)
      .subscribe(response=>{
        console.log("UserStory", response);
        response.forEach(element=>{
          if(element['ftes'] == 0 ){
            element['ftes'] = '-----';
          }
          if(element['dev_hrs'] == '' ){
            element['dev_hrs'] = '-----';
          }
          element['ftes'] = parseFloat(element['ftes']).toFixed(1);
          element['ftes'] = isFinite(element['ftes']) ? element['ftes'] : '-----';
          element['productivity'] = (parseFloat(element.ftes) / parseFloat(element.dev_hrs)).toFixed(1);
          element['productivity'] = isFinite(element['productivity']) ? element['productivity'] : '-----';
          element['planned_delivery'] = this.__utils.formatDateToUS(element['planned_delivery']);
          element['revised_delivery'] = element['revised_delivery'] != null ? this.__utils.formatDateToUS(element['revised_delivery']) : '-----';

        });
        
        this.userStories = response.reverse();
        this.getProjectStatusChartData(this.sopId); //check
        this.getChartData(this.sopId); //check
      });
  }

  deleteUserStory(id){
    this._api.delete(`/sop/epics/userstories`, `${id}.json`)
      .subscribe(response=>{
        this.refresh(this.sopId);
      });
  }

  getCompletedUserStories(id){
    this._api.fetchData(`/sop/epics/${id}/userstories/fetchCompleted.json`)
      .subscribe(response=>{
        response.forEach(element=>{
          element['productivity'] = (parseFloat(element.ftes) / parseFloat(element.dev_hrs)).toFixed(1);
          element['productivity'] = isFinite(element['productivity']) ? element['productivity'] : '----';
          element['planned_delivery'] = this.__utils.formatDateToUS(element['planned_delivery']);
          element['revised_delivery'] = element['revised_delivery'] != null ? this.__utils.formatDateToUS(element['revised_delivery']) : '-----';
        });
        this.completeUserStories = response;
      });
  }

  getProjectStatus(id){
    this._api.fetchData(`/sop/${id}/duration.json`)
      .subscribe(response=>{
        this.totalProjectStatus = response[0];
      });
  }

  getSprintStatus(id){
    this._api.fetchData(`/sop/${id}/currentSprint/duration.json`)
      .subscribe(response=>{
        this.currentSprintDuration = response[0];
      });
  }
  
  getUserStory(){
    return this.userStories;
  }

  restoreUserStories(id){
    this._api.fetchData(`/sop/epics/userstories/${id}/unarchive/`)
      .subscribe(response=>{
        this.refresh(this.sopId);
      });
  }

  /**
   * 
   * @param id Current not in use
   */
  getChartData(id){
  }

  getCurrentSprintData(id){
    this._api.fetchData(`/sop/${id}/currentSprint/graphdata.json`)
      .subscribe(response=>{
        this.currentSprintData = response;
      });
  }

  /**
   * to fetch data for the project status chart
   * @param id -->sop id
   */
  getProjectStatusChartData(id){
    this._api.fetchData(`/sop/${id}/graphdata.json`)
      .subscribe(response=>{
        this.totalSprintData = response;
      });
  }

  /**
   * to fetch the benefits for the ftes chart
   * @param id 
   */
  getBenefits(id){
    this._api.fetchData(`/sop/${id}/ftes.json`)
      .subscribe(response=>{
        this.benefitsChartData = response;
      });
  }

  createReasonCode(id, body){
    body.forEach(element=>{
      this._api.postData(`/sop/${id}/epics.json`, element)
        .subscribe(response=>{
          this.reasonCodeData.push(response);
        });
    });
  }

  getReasonCode(id){
    this._api.fetchData(`/sop/${id}/epics.json`)
      .subscribe(response=>{
        this.reasonCodeData = response;
      });
  }

  deleteReasonCode(id){
    this._api.delete(`/sop/epics`, `${id}.json`)
      .subscribe(response=>{
        this.reasonCodeData.forEach((element, index)=>{
          if(element.id == id){
            this.reasonCodeData.splice(index, 1);
          }
        });
      });
  }

  editReasonCode(id,body){
    if(body.name != ''){
      this._api.update(`/sop/epics`, `${id}.json`, body)
      .subscribe(response=>{
        this.reasonCodeData.forEach(element=>{
          if(element.id == id){
            let pos = this.reasonCodeData.indexOf(element);
            this.reasonCodeData[pos] = response;
          }
        });
      });
    }
  }

  refresh(sopID?:number){
    this.getUserStories(sopID);
    this.getProjectStatus(sopID);
    this.getSopByID(sopID);
    this.getProjectStatusChartData(sopID);
    this.getCurrentSprintData(sopID);
    this.getBenefits(sopID);
    this.getSprintStatus(sopID);
    this.getCompletedUserStories(sopID);
    this.getDeletedUserStories(sopID);
    this.getReasonCode(sopID);
    this.getSprint(sopID);
  }

  importStories(file){
    return this._api.postData(`/sop/${this.sopId}/import.json`, file);
  }

  downloadFile(){
    window.location.href = this._api.apiUrl+`/sop/${this.sopId}/export.json`;
  }
 
  filterUserStories(endpointUrl:string, queryParameter:string){
    this._api.fetchData(endpointUrl + queryParameter)
      .subscribe(response=>{
        response.forEach(element=>{
          if(element['ftes'] == 0 ){
            element['ftes'] = '-----';
          }
          if(element['dev_hrs'] == '' ){
            element['dev_hrs'] = '-----';
          }
          element['ftes'] = parseFloat(element['ftes']).toFixed(1);
          element['ftes'] = isFinite(element['ftes']) ? element['ftes'] : '-----';
          element['productivity'] = (parseFloat(element.ftes) / parseFloat(element.dev_hrs)).toFixed(1);
          element['productivity'] = isFinite(element['productivity']) ? element['productivity'] : '-----';
          element['planned_delivery'] = this.__utils.formatDateToUS(element['planned_delivery']);
          element['revised_delivery'] = element['revised_delivery'] != null ? this.__utils.formatDateToUS(element['revised_delivery']) : '-----';
        });
        this.userStories = response;
      });
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
    this.filteredValues = filterValues();
    // console.log(this.filteredValues)

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
      this.filteredValues.push("Rules Approved = True");
    }
    if(this.rulesApproved === 'False'){
      url = url + "&" + "rules_approved=False";
      this.filteredValues.push("Rules Approved = False");
    }
    if(this.testCasesVerified === 'True'){
      url = url + "&" + "verified_test_cases=True";
      this.filteredValues.push("Verified Test Cases = True");
    }
    if(this.testCasesVerified === 'False'){
      url = url + "&" + "verified_test_cases=False";
      this.filteredValues.push("Verified Test Cases = False");
    }
    // console.log(url);
    return url;
  }

  getFile(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  downLoadAuditTrailFile(projectId: number, startDate?:string, endDate?:string){
    let api:string;
    if(startDate && endDate){
      api = `/audit_trails/${projectId}/${startDate}/${endDate}/`;
    }else{
      api = `/audit_trails/${projectId}/`;
    }
    window.location.href = this._api.apiUrl+api;
  }

  getBenefiftChart(projectId:number){
    this._api.fetchData(`/sop/epics/charts/${projectId}/benefits_realization.png`).subscribe(res=>{
    });
  }
}
