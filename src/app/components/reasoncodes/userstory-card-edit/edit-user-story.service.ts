import { Injectable } from '@angular/core';
import {DataService} from '../../../data.service';
import {ReasonCodeService} from '../../reasoncodes/reason-code.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserStoryService {
  selected:number = -1;
  
  constructor(private _api: DataService,
              private _rcService: ReasonCodeService,) { }
  

  editUserStory(usID, sprintID, reasonCodeId, payload){
    // payload['planned_delivery'] = this.formatDateToSendData(payload['planned_delivery']);
    // payload['revised_delivery'] == '-----' || isNaN(payload['revised_delivery']) ? payload['revised_delivery'] = null : payload['revised_delivery'] = this.formatDateToSendData(payload['revised_delivery']);
    payload['dev_hrs'] == '-----' ? delete payload['dev_hrs'] : payload['dev_hrs'];
    if(sprintID){

    }else{
      sprintID = 0;
    }
    const api = `/sop/reasoncode/userstories/${usID}/update/${sprintID}.json`;
    console.log(api);
    this._api.update(`/sop/epics/userstories/${usID}/update`, `${sprintID}/${reasonCodeId}.json`, payload)
      .subscribe(
        response=>{
        this._rcService.userStories.forEach(element=>{
          if(element.id === usID){
            let pos = this._rcService.userStories.indexOf(element);
            this._rcService.userStories[pos] = response;
          }
        });
        this._rcService.getProjectStatusChartData(this._rcService.sopId);
        this._rcService.getChartData(this._rcService.sopId);
        this._rcService.getUserStories(this._rcService.sopId);
        this._rcService.getCompletedUserStories(this._rcService.sopId);
        this._rcService.getBenefits(this._rcService.sopId);
        this._rcService.getProjectStatus(this._rcService.sopId);
        this._rcService.getSprintStatus(this._rcService.sopId);
        this._rcService.getCurrentSprintData(this._rcService.sopId);
        console.log("Edit us", response);
      }, 
      error=>{console.error(error)}
      );
  }

  formatDateToSendData(date){
    let newDate = new Date(date);
    return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
  }

  formatDateToSendDataFromDisplayDate(date){
    let newDate = date.toString().split("/").reverse().join("-");
    newDate = new Date(newDate);
    return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
  }
}
