import { Injectable, EventEmitter } from '@angular/core';
import {DataService} from '.././../data.service';
import {AppcontrolService} from '../../controlservice/appcontrol.service';

@Injectable({
    providedIn: 'root'
})

export class ContainerService{
    constructor(private _dataService: DataService, private _UIControlService: AppcontrolService){ }

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

    getdataFromDB(){
        this.cardContents = [];
        this.cardContents.push(this.createNewCard);
        this._dataService.fetchData()
        .subscribe(data => {
          data.forEach((element)=>{
            this.cardContents.push({
              themeColor: this._UIControlService.colorPicker[this.getUniqueNumber()],
              reasonCodes: this._UIControlService.firstZero(Number(element.rCodes)),
              ...element
            })
          })
            console.log("GET", this.cardContents)
           }
         );
      }

}