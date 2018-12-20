import { Injectable } from '@angular/core';
import {DataService} from '../../../data.service';
import {ReasonCodeService} from '../../reasoncodes/reason-code.service';

@Injectable({
  providedIn: 'root'
})
export class CreateUserstoryService {

  sopId:number;

  constructor(private __api: DataService, private __rcService: ReasonCodeService) { }

  createUserStory(sprintID, reasonCodeId, payload){
    if(sprintID){

    }else{
      sprintID = -1;
    }
    payload.planned_delivery = this.__rcService.formatDate(payload.planned_delivery);
    // payload.revised_delivery = payload.revised_delivery == '' ? delete payload.revised_delivery : this.__rcService.formatDate(payload.revised_delivery);
    const api = `/sop/reasoncode/${this.sopId}/userstories/${sprintID}/${reasonCodeId}.json`;
    console.log(api, payload)
    this.__api.postData(api, payload)
      .subscribe(response=>{
        this.__rcService.getUserStories(this.sopId);
      });
  }
}
