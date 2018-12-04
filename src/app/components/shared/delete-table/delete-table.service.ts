import { Injectable } from '@angular/core';
import {DataService} from '../../../data.service';
// import {TableService} from '../table/table.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteTableService {

  dataSource = [];
  deletedUserstories;

  constructor(private _api: DataService) { }

  // getDeletedUserStories(){
  //   this._api.fetchData('/sop/reasoncode/1/userstories/fetchDeleted.json')
  //     .subscribe(response=>{
  //       this.dataSource = response;
  //       console.log("Deleted user stories",response);
  //     })
  // }

  // restoreUserStories(id){
  //   this._api.fetchData(`/sop/reasoncode/userstories/${id}/unarchive/`)
  //     .subscribe(response=>{
  //       this.dataSource.forEach(element => {
  //         if(element.id === id){
  //           this.deletedUserstories = element;
  //           let pos = this.dataSource.indexOf(element);
  //           this.dataSource.splice(pos, 1);
  //         }
  //         // this._tableService.userStories.push(element);
  //       });
  //       console.log(`Restored US with id ${id}`, response);
  //     });
  // }

}
