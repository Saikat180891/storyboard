import { Injectable } from '@angular/core';
import {DataService} from '../../data.service';


@Injectable({
  providedIn: 'root'
})
export class AddStepsService{
  clientData;

  private sections = [];
  private screens = [];

  constructor(private _apiService: DataService){}

  /**
   * Get sections
   */
  getPreviouslyCreatedSections(){
    this._apiService.fetchData("/sop/reasoncode/userstories/8/sections.json")
    .subscribe(response => {
      this.sections = response;
    });
    return this.sections;
  }

  /**
   * Get screens
   */
  getScreens(userstory, section){
    this._apiService.fetchData(`/sop/reasoncode/userstories/${userstory}/sections/${section}.json`)
      .subscribe(response=>{
        this.screens = response;
      });
      return this.screens;
  }
}