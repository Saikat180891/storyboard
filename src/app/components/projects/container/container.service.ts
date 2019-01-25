import { Injectable, EventEmitter } from '@angular/core';
import {DataService} from '.././../../data.service';
import {AppcontrolService} from '../../../services/controlservice/appcontrol.service';
import {CommondbService} from '../../../commondb.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ContainerService{
  permissions = [];
    constructor(
      private _dataService: DataService, 
      private _UIControlService: AppcontrolService,
      private _centralDB: CommondbService){ }

    createNewCard = {
      id: 0
    }

    cardContents = [];

    lastNumber:number = 0;
    colorPicker:string[] =["#0033A1", "#2A7DE1", "#40C0C4", "#54585A", "#8677C4", "#94BEF0"];

    getUniqueNumber(){
      this.lastNumber += 1;
      if(this.lastNumber == 5){
        this.lastNumber = 0;
      }
      return this.lastNumber;
    }

    getListOfAllProjects(){
      return this._dataService.fetchData(`/sop.json`);
    }


    /**
     * Return details of all the projects
     */
    getProjects(){
      return this.cardContents;
    }
}