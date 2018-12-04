import { Injectable } from '@angular/core';

import {DataService} from '../../../data.service';
import {ReasonCodeService} from '../../reasoncodes/reason-code.service';
import {DeleteTableService} from '../delete-table/delete-table.service';


@Injectable({
  providedIn: 'root'
})
export class TableService {
  userStories = [];
  deletedUserStories = [];


  constructor(private _api: DataService,
              private _rcService: ReasonCodeService,
              private _deleteTable: DeleteTableService) { }

  getUserStory(){
    this._api.fetchData(`/sop/reasoncode/1/userstories.json`)
      .subscribe(response=>{
        this.userStories = response.reverse();
      });
  }

  createUserStory(sprintID, payload){
    this._api.postData(`/sop/reasoncode/1/userstories/${sprintID}.json`, payload)
      .subscribe(response=>{
        this.userStories.unshift(response);
        if(response){
          this._rcService.getTotalCharData(this._rcService.sopId);
          this._rcService.getChartData(sprintID);
        }
      });
  }

  editUserStory(usID, sprintID, payload){
    this._api.update(`/sop/reasoncode/userstories/${usID}/update`, `${sprintID}.json`, payload)
      .subscribe(response=>{
        this.userStories.forEach(element=>{
          if(element.id === usID){
            let pos = this.userStories.indexOf(element);
            this.userStories[pos] = response;
          }
        });
        console.log("Edit us", response);
      });
  }

  deleteUserStory(id){
    this._api.delete(`/sop/reasoncode/userstories`, `${id}.json`)
      .subscribe(response=>{
        this.userStories.forEach(element=>{
          if(element.id === id){
            let pos = this.userStories.indexOf(element);
            this.userStories.splice(pos, 1);
          }
        });
        this.getDeletedUserStories();
        console.log(`Rpw with id ${id} deleted successfully.`);
      });
  }

  getDeletedUserStories(){
    this._api.fetchData('/sop/reasoncode/1/userstories/fetchDeleted.json')
      .subscribe(response=>{
        this.deletedUserStories = response;
        console.log("Deleted user stories",response);
      })
  }

  restoreUserStories(id){
    this._api.fetchData(`/sop/reasoncode/userstories/${id}/unarchive/`)
      .subscribe(response=>{
        this.deletedUserStories.forEach(element => {
          if(element.id === id){
            let pos = this.deletedUserStories.indexOf(element);
            this.deletedUserStories.splice(pos, 1);
            this.userStories.push(response);
          }
          // this.userStories.push(element);
        });
        console.log(`Restored US with id ${id}`, response);
      });
  }
}
