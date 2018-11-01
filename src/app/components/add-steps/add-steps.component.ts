import { Component, OnInit } from '@angular/core';
import {AppcontrolService} from '../../controlservice/appcontrol.service';
import {CardService} from '../card/card.service';
import {ContainerService} from '../container/container.service';
import { ActivatedRoute } from '@angular/router';
import {AddStepsService} from './add-steps.service';

@Component({
  selector: 'app-add-steps',
  templateUrl: './add-steps.component.html',
  styleUrls: ['./add-steps.component.scss']
})
export class AddStepsComponent implements OnInit {

  applDetails = {
    applicationName: '',
    screenName: '',
    tabName: ''
  }

  clientId:number;

  constructor(
    private _containerService: ContainerService, 
    private route: ActivatedRoute,
    private _addStepsService: AddStepsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clientId = parseInt(params.id);
      console.log(params)
   });

    this._containerService.cardContents.forEach((element)=>{
      if(element.id == this.clientId){
        this._addStepsService.clientData = element;
        console.log("add steps reads ",this._addStepsService.clientData)
        return;
      }
    })
  }

  // payload.append('applicationName', this.applicationName);
  //     payload.append('screenName', this.screenName);
  //     payload.append('tabName', this.tabName);
  //     payload.append('screenImage', this.previewScreen);

  onReceivePayload(payload){
    this.applDetails = {
      applicationName: payload.get('applicationName'),
      screenName: payload.get('screenName'),
      tabName: payload.get('tabName')
    }
    console.log( this.applDetails)
  }

}
