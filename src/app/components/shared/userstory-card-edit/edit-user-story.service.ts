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
  

  editUserStory(usID, sprintID, payload){
    if(sprintID){

    }else{
      sprintID = 0;
    }
    const api = `/sop/reasoncode/userstories/${usID}/update/${sprintID}.json`;
    console.log(api);
    this._api.update(`/sop/reasoncode/userstories/${usID}/update`, `${sprintID}.json`, payload)
      .subscribe(
        response=>{
        this._rcService.userStories.forEach(element=>{
          if(element.id === usID){
            let pos = this._rcService.userStories.indexOf(element);
            this._rcService.userStories[pos] = response;
          }
        });
        this._rcService.getTotalCharData(this._rcService.sopId);
        this._rcService.getChartData(this._rcService.sopId);
        this._rcService.getUserStories(this._rcService.sopId);
        this._rcService.getCompletedUserStories(this._rcService.sopId);
        console.log("Edit us", response);
      }, 
      error=>{console.error(error)}
      );
  }
}
