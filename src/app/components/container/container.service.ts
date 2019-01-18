import { Injectable, EventEmitter } from '@angular/core';
import {DataService} from '.././../data.service';
import {AppcontrolService} from '../../controlservice/appcontrol.service';
import {CommondbService} from '../../commondb.service';

@Injectable({
    providedIn: 'root'
})

export class ContainerService{
    constructor(
      private _dataService: DataService, 
      private _UIControlService: AppcontrolService,
      private _centralDB: CommondbService){ }

    createNewCard = {
      id: 0,
      automationSystemName: "",
      chargeCode: "",
      clientName: "",
      due_date: "",
      logo: "",
      rCodes: "",
      themeColor: ""
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
      
      if(this.cardContents.length > 1){

      }else{
        this.cardContents = [];
        this.cardContents.push(this.createNewCard);
        this._dataService.fetchData('/sop.json')
        .subscribe(data => {
          // console.log("Response received GET", data)
          data.forEach((element)=>{
            this.cardContents.push({
              themeColor: this._UIControlService.colorPicker[this.getUniqueNumber()],
              reasonCodes: this._UIControlService.firstZero(Number(element["number_epics"])),
              ...element,
              logo: element["image_url"]
            });
          });
          this._centralDB.cardContents = this.cardContents;
            console.log("GET", this._centralDB.cardContents);
            }
          );
        }
      }

}