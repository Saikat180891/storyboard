import { Injectable } from '@angular/core';
import {DataService}  from '../../data.service';
import {environment} from '../../../environments/environment';
import {PreloaderService} from '../shared/preloader/preloader.service';

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

  constructor(private _api:DataService,
              private __preLoad: PreloaderService) { }

  createSprint(payload){
    payload.forEach(element => {
      element.start_date = this.formatDate(element.start_date);
      this._api.postData(`/sop/${this.sopId}/sprint.json`, element)
      .subscribe(response=>{
        if(response){
          
        }else{
          return false;
        }
      });
    });
    this.getSprint();
    return true;
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
        
        response.forEach((element, index)=>{
          element['start_date'] = this.arrangeDateInCorrectFormat(element['start_date']);
          element['sprintNumber'] = index + 1;
        });
        // console.log(response);
        this.sprintConfig = response.reverse();
      });
  }

  deleteSprint(id){
    this._api.delete('/sop/sprint', `${id}.json`)
      .subscribe(response=>{
        // this.sprintConfig.forEach(element=>{
        //   if(element.id === id){
        //     let pos = this.sprintConfig.indexOf(element);
        //     this.sprintConfig.splice(pos, 1);
        //   }
        // });
        this.getSprint();
        console.log(`Delete sprint with id = ${id}`)
      });
  }

  editSprint(id, data){
    data['start_date'] = this.formatDate(data['start_date']);
    this._api.update(`/sop/sprint`, `${id}.json`, data)
      .subscribe(response=>{
        this.getSprint();
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

  getUserStories(id){
    console.log("Get all user story", id)
    const api = !environment.production ? `/sop/reasoncode/${id}/userstories.json` : '';
    this._api.fetchData(api)
      .subscribe(response=>{
        this.userStories = response.reverse();
      });
      console.log("the userstories are", this.userStories)
  }

  deleteUserStory(id){
    this._api.delete(`/sop/reasoncode/userstories`, `${id}.json`)
      .subscribe(response=>{
        this.userStories.forEach(element=>{
          if(element.id === id){
            let pos = this.userStories.indexOf(element);
            this.userStories.splice(pos, 1);
            this.getTotalCharData(this.sopId);
          }
        });
        // this.getDeletedUserStories();
        console.log(`Rpw with id ${id} deleted successfully.`);
      });
  }
  
  getUserStory(){
    return this.userStories;
  }

  getChartData(id){
    this._api.fetchData(`/sop/sprint/${id}/graphdata.json`)
      .subscribe(response=>{
        this.currentSprintData = response;
      });
  }

  getCurrentSprintData(){
    this._api.fetchData(`/sop/${this.sopId}/currentSprint/graphdata.json`)
      .subscribe(response=>{
        this.currentSprintData = response;
        console.log("Current Sprint Data", response);
      })
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

  getBenefits(id){
    this._api.fetchData(`/sop/${id}/ftes.json`)
      .subscribe(response=>{
        this.benefitsChartData = response;
      })
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

  

}
