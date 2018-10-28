import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../../data.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AppcontrolService } from '../../controlservice/appcontrol.service';
import {ContainerService} from './container.service';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
//   animations:[
//     trigger('rotatedState', [
//       state('default', style({ transform: 'rotate(0)' })),
//       state('rotated', style({ transform: 'rotate(-180deg)' })),
//       transition('rotated => default', animate('400ms ease-out')),
//       transition('default => rotated', animate('400ms ease-in'))
// ])
//   ]
})

export class ContainerComponent implements OnInit {
  filesLists: string[] = ['Recent Files', 'All Files'];
  selected;
  cards = [1,2,3,4,5,6,7,8,9,10];
  
  constructor(
    private _dataService: DataService, 
    private _UIControllerService: AppcontrolService,
    private _ContainerService: ContainerService) {  }

  cardDatas;

  ngOnInit() {
    /**
     * Fetch data to load the cards
     */
      // this.getdataFromDB();
     
      this._ContainerService.getdataFromDB();
      this.cardDatas = this._ContainerService.cardContents;
  }

  // getdataFromDB(){
  //   this._dataService.getJSON()
  //   .subscribe(data => {
  //     data.forEach((element)=>{
  //       this.cardDatas.push({
  //         themeColor: this._UIControllerService.colorPicker[this._UIControllerService.getUniqueNumber()],
  //         reasonCodes: this._UIControllerService.firstZero(Number(element.rCodes)),
  //         ...element
  //       })
  //     })
  //       console.log("GET", this.cardDatas)
  //      }
  //    );
  // }

  state: string = 'default';

    rotate() {
        this.state = (this.state === 'default' ? 'rotated' : 'default');
    }


    

}
