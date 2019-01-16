import { Injectable, EventEmitter } from '@angular/core';
import {DataService}  from '../../data.service';
import {environment} from '../../../environments/environment';
import {PreloaderService} from '../shared/preloader/preloader.service';
// import { EventEmitter } from 'protractor'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

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

  doneSelectStatus:EventEmitter<boolean> = new EventEmitter();

  sortBy = '';
  filterPath = '';

  constructor(private _api:DataService,
              private __preLoad: PreloaderService, private snackbar:MatSnackBar) { }


  /**
   * This api is used to create a new sprint, it is called in the sprint config component
   * @param payload 
   */
  createSprint(payload){
    payload.forEach(element => {
      element.start_date = this.formatDate(element.start_date);
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
        console.log("The sop is ", this.currentProject);
      });
  }

  /**
   * This api is used to get details of all the sprints
   */
  getSprint(id){
    this._api.fetchData(`/sop/${id}/sprint.json`)
      .subscribe(response=>{
        response.forEach((element, index)=>{
          element['start_date'] = this.arrangeDateInCorrectFormat(element['start_date']);
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
        this.sprintConfig.forEach(element=>{
          if(element.id === id){
            let pos = this.sprintConfig.indexOf(element);
            this.sprintConfig.splice(pos, 1);
            console.log(`Delete sprint with id = ${id}`);
            this.getProjectStatus(this.sopId);
          }
        });
      });
  }

  editSprint(id, data){
    data['start_date'] = this.formatDate(data['start_date']);
    this._api.update(`/sop/sprint`, `${id}.json`, data)
      .subscribe(response=>{
        this.getSprint(this.sopId);
        // this.sprintConfig.forEach(element=>{
        //   if(element.id === response[id]){
        //     // console.log("The edit response is 2", response);
        //     let pos = this.sprintConfig.indexOf(element);
        //     response['start_date'] = this.arrangeDateInCorrectFormat(response['start_date']);
        //     this.sprintConfig[pos] = response;
        //   }
        // });
        // console.log("The response is ",response);
      });
  }

  getDeletedUserStories(id){
    this._api.fetchData(`/sop/epics/${id}/userstories/fetchDeleted.json`)
      .subscribe(response=>{
        response.forEach(element=>{
          element['productivity'] = (parseFloat(element.ftes) / parseFloat(element.dev_hrs)).toFixed(1);
          element['productivity'] = isFinite(element['productivity']) ? element['productivity'] : '----';
        });
        this.deletedUserStories = response;
        // this.getUserStories(id);
        console.log("Deleted user stories",response);
      });
  }

  getUserStories(id){
    console.log("Get all user story", id)
    const api =  `/sop/epics/${id}/userstories.json`;
    this._api.fetchData(api)
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
          element['planned_delivery'] = this.reArrangeDate(element['planned_delivery']);
          element['revised_delivery'] = element['revised_delivery'] != null ? this.reArrangeDate(element['revised_delivery']) : '-----';

        });
        
        this.userStories = response.reverse();
        this.getProjectStatusChartData(this.sopId);
        this.getChartData(this.sopId);
      });
      console.log("the userstories are", this.userStories)
  }

  deleteUserStory(id){
    this._api.delete(`/sop/epics/userstories`, `${id}.json`)
      .subscribe(response=>{
        this.userStories.forEach(element=>{
            let pos = this.userStories.indexOf(element);
            this.userStories.splice(pos, 1);
            this.getProjectStatusChartData(this.sopId);
            this.getProjectStatus(this.sopId);
            this.getSprintStatus(this.sopId);
            // this.getChartData(this.sopId);
            this.getUserStories(this.sopId);
            this.getBenefits(this.sopId);
            this.getCurrentSprintData(this.sopId);
            // this.getDeletedUserStories(this.sopId);
            this.getCompletedUserStories(this.sopId);
        });
        // this.getDeletedUserStories();
        console.log(`Rpw with id ${id} deleted successfully.`);
      });
  }

  getCompletedUserStories(id){
    this._api.fetchData(`/sop/epics/${id}/userstories/fetchCompleted.json`)
      .subscribe(response=>{
        response.forEach(element=>{
          element['productivity'] = (parseFloat(element.ftes) / parseFloat(element.dev_hrs)).toFixed(1);
          element['productivity'] = isFinite(element['productivity']) ? element['productivity'] : '----';
        });
        this.completeUserStories = response;
        console.log("The completed user stories are" ,response);
      });
  }

  getProjectStatus(id){
    this._api.fetchData(`/sop/${id}/duration.json`)
      .subscribe(response=>{
        this.totalProjectStatus = response[0];
        console.log("Total project status", this.totalProjectStatus);
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
        this.getDeletedUserStories(this.sopId);
        this.getProjectStatusChartData(this.sopId);
        this.getProjectStatus(this.sopId);
        this.getSprintStatus(this.sopId);
        // this.getChartData(this.sopId);
        // this.getUserStories(this.sopId);
        this.getBenefits(this.sopId);
        this.getCurrentSprintData(this.sopId);
        console.log(`Restored US with id ${id}`, response);
      });
  }

  /**
   * 
   * @param id Current not in use
   */
  getChartData(id){
    // this._api.fetchData(`/sop/sprint/${id}/graphdata.json`)
    //   .subscribe(response=>{
    //     this.currentSprintData = response;
    //   });
  }

  getCurrentSprintData(id){
    this._api.fetchData(`/sop/${id}/currentSprint/graphdata.json`)
      .subscribe(response=>{
        this.currentSprintData = response;
        console.log("Current Sprint Data", response);
      })
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
        // this.getReasonCode(this.sopId);
        this.reasonCodeData.forEach(element=>{
          if(element.id == id){
            this.reasonCodeData.splice(element, 1);
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
    // this.getCompletedUserStories(sopID);
    // this.getDeletedUserStories(sopID);
    this.getReasonCode(sopID);
    this.getSprint(sopID);
  }

  /**
   * Rearrange the date in the following format DD/MM/YYYY
   * @param date 
   */
  formatDate(date){
    let dateStr = new Date(date)
    let strDate =  "" + dateStr.getFullYear() + "-" + (dateStr.getMonth()+1) + "-" + dateStr.getDate();
    return strDate;
  }


    /**
   * Get the date as a string and then split the string using 
   * the "/" then using the date, month and year 
   * set the due date in the editSelectedDate property
   * @param date 
   */
  arrangeDateInCorrectFormat(date){
    
    // let newDate = date
    // console.log(newDate)
    // let dateFormat = new Date(date);
    // dateFormat.setFullYear(Number(newDate[2]));
    // dateFormat.setMonth(Number(newDate[1])-1);
    // dateFormat.setDate(Number(newDate[0]));
    // console.log(dateFormat)
    return new Date(date);
  }

  reArrangeDate(date){
    
    let newDate = new Date(date);

    let strDate = newDate.getDate() + "/" + (newDate.getMonth() + 1)+ "/" + newDate.getFullYear();
    
    return strDate;
  }

  importStories(file){
    console.log("File", file);
    this._api.postData(`/sop/${this.sopId}/import.json`, file).subscribe(response=>{

      console.log("Response",response["status"])
      console.log("Response",response["message"])


      if(response["status"] == "Success")
      { 
        this.snackbar.open("Your sprints, epics and stories are now available on the dashboard", "Success", {duration : 2000, panelClass: "style-success"});
      }
      else if(response["status"]=="Failure")
      {
        this.snackbar.open(response["message"], "Fail");
      }
      else{
        this.snackbar.open("Please check the template and try again." , "Fail");
      }

    });
  }
  downloadFile(){
    window.location.href = this._api.apiUrl+`/sop/${this.sopId}/export.json`;
    }

  filterUserStories(endpointUrl:string, queryParameter:string){
    this._api.fetchData(endpointUrl + queryParameter)
      .subscribe(response=>{
        console.log(response);
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
          element['planned_delivery'] = this.reArrangeDate(element['planned_delivery']);
          element['revised_delivery'] = element['revised_delivery'] != null ? this.reArrangeDate(element['revised_delivery']) : '-----';

        });
        
        this.userStories = response;
        // this.getProjectStatusChartData(this.sopId);
        // this.getChartData(this.sopId);
      });
  }

  rulesApproved:string;
  testCasesVerified:string;

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
}
