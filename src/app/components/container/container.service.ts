import { Injectable, EventEmitter } from '@angular/core';
import {DataService} from '.././../data.service';
import {AppcontrolService} from '../../controlservice/appcontrol.service';

@Injectable({
    providedIn: 'root'
})

export class ContainerService{
    constructor(private _dataService: DataService, private _UIControlService: AppcontrolService){ }

    createNewCard = {
        id: this._UIControlService.getID()
    }

    cardContents = [];

    getdataFromDB(){
        this.cardContents = [];
        this.cardContents.push(this.createNewCard);
        this._dataService.getJSON()
        .subscribe(data => {
          data.forEach((element)=>{
            this.cardContents.push({
              themeColor: this._UIControlService.colorPicker[this._UIControlService.getUniqueNumber()],
              reasonCodes: this._UIControlService.firstZero(Number(element.rCodes)),
              ...element
            })
          })
            console.log("GET", this.cardContents)
           }
         );
      }

}