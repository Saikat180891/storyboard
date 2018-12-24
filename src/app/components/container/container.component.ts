import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../../data.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AppcontrolService } from '../../controlservice/appcontrol.service';
import {ContainerService} from './container.service';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss', '../reasoncodes/completed-warning.scss'],
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

  warningToDeleteSop:boolean = false;

  sopIdToDelete:number;

  ngOnInit() {
    /**
     * Fetch data to load the cards
     */
      // this.getdataFromDB();
     setTimeout(()=>{
      this._ContainerService.getdataFromDB();
      this.cardDatas = this._ContainerService.cardContents;

      console.log("card datas",this.cardDatas)
     }, 1000);
      
  }


  onDeleteSop($event){
    this.warningToDeleteSop = $event.status;
    this.sopIdToDelete = $event.id;
  }

  onSelectDoNotDeleteSop(){
    this.warningToDeleteSop = false;
  }

  onSelectDeleteSop(){
    this._dataService.delete('/sop',this.sopIdToDelete + '.json')
      .subscribe(response => {
        this._ContainerService.cardContents.forEach((element, index)=>{
          if(element.id == this.sopIdToDelete){
            this._ContainerService.cardContents.splice(index, 1);
            this.warningToDeleteSop = false;
          }
        })
      });
  }
}
