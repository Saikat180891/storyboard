import { Injectable } from '@angular/core';
import {DataService}  from '../../data.service';


@Injectable({
  providedIn: 'root'
})
export class ReasonCodeService {
  sopId:number;
  sprintConfig = [];
  currentSprintData = [];
  totalSprintData = [];
  currentProject = {};
  userStories = [];
  movemodal:boolean = false;

  constructor(private _api:DataService) { }

  createSprint(payload){
    this._api.postData(`/sop/${this.sopId}/sprint.json`, payload)
      .subscribe(response=>{
        // console.log(response);
        response['start_date'] = this.arrangeDateInCorrectFormat(response['start_date']);
        this.sprintConfig.unshift(response);
      });
  }

  getSopByID(id){
    this._api.fetchData(`/sop/${id}.json`)
      .subscribe(response=>{
        this.currentProject = response;
        console.log("The sop is ", this.currentProject);
      })
  }

  getSprint(){
    this._api.fetchData(`/sop/${this.sopId}/sprint.json`)
      .subscribe(response=>{
        // console.log("The get response is ",response);
        response.forEach(element=>{
          element['start_date'] = this.arrangeDateInCorrectFormat(element['start_date']);
        });
        this.sprintConfig = response;
      });
  }

  deleteSprint(id){
    this._api.delete('/sop/sprint', `${id}.json`)
      .subscribe(response=>{
        this.sprintConfig.forEach(element=>{
          if(element.id === id){
            let pos = this.sprintConfig.indexOf(element);
            this.sprintConfig.splice(pos, 1);
          }
        });
        console.log(`Delete sprint with id = ${id}`)
      });
  }

  editSprint(id, data){
    data['start_date'] = this.formatDate(data['start_date']);
    this._api.update(`/sop/sprint`, `${id}.json`, data)
      .subscribe(response=>{
        this.sprintConfig.forEach(element=>{
          if(element.id === response[id]){
            // console.log("The edit response is 2", response);
            let pos = this.sprintConfig.indexOf(element);
            response['start_date'] = this.arrangeDateInCorrectFormat(response['start_date']);
            this.sprintConfig[pos] = response;
          }
        });
        // console.log("The response is ",response);
      });
  }

  getUserStory(){
    this._api.fetchData(`/sop/reasoncode/1/userstories.json`)
      .subscribe(response=>{
        this.userStories = response;
      });
  }

  getChartData(id){
    this._api.fetchData(`/sop/sprint/${id}/graphdata.json`)
      .subscribe(response=>{
        this.currentSprintData = response;
      });
  }

  getTotalCharData(id){
    this._api.fetchData(`/sop/${id}/graphdata.json`)
      .subscribe(response=>{
        // response.forEach(element=>{
          // if(element.y == 0){
          //   this.totalSprintData = [];
          // }else{
            this.totalSprintData = response;
          // }
        // })
        
      })
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
   * Get the date as a string and then split the string using 
   * the "/" then using the date, month and year 
   * set the due date in the editSelectedDate property
   * @param date 
   */
  arrangeDateInCorrectFormat(date){
    let newDate = date.toString().split("/");
    let dateFormat = new Date();
    dateFormat.setFullYear(Number(newDate[2]));
    dateFormat.setMonth(Number(newDate[1])-1);
    dateFormat.setDate(Number(newDate[0]));
    // console.log(dateFormat)
    return dateFormat;
  }

  

}
