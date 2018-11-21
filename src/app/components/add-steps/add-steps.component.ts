import { Component, OnInit } from '@angular/core';
import {AppcontrolService} from '../../controlservice/appcontrol.service';
import {CardService} from '../card/card.service';
import {ContainerService} from '../container/container.service';
import { ActivatedRoute } from '@angular/router';
import {AddStepsService} from './add-steps.service';
import {ScreenHolderService} from '../shared/screen-holder/screen-holder.service';
import {DataService} from '../../data.service';
import { element } from '@angular/core/src/render3';

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

  sections = [];
  

  constructor(
    private _containerService: ContainerService, 
    private route: ActivatedRoute,
    private _addStepsService: AddStepsService,
    private _screenHolderService: ScreenHolderService,
    private _apiService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clientId = parseInt(params.id);
   });

    this._containerService.cardContents.forEach((element)=>{
      if(element.id == this.clientId){
        this._addStepsService.clientData = element;
        return;
      }
    });

    let section = {};

    this.sections = this._addStepsService.getPreviouslyCreatedSections();
    this.sections.forEach((element)=>{
      section[element['section_name'] + " " + element['id']] = this._addStepsService.getScreens(8,element['id']);
    });

    this._screenHolderService.sections = section;
    console.log("Section Data",this._screenHolderService.sections);
    this._screenHolderService.carousal = this._addStepsService.getScreens(8,31);
    this._screenHolderService.currentScreen = this._screenHolderService.carousal.length - 1;
    // this._screenHolderService.position = 0;
    console.log("Screen Data",this._screenHolderService.carousal);

  }

  onReceivePayload(payload){
    // this.applDetails = {
    //   applicationName: payload.get('applicationName'),
    //   screenName: payload.get('screenName'),
    //   tabName: payload.get('tabName')
    // }
    // console.log( this.applDetails)
  }

  screenTracker(event){
    this.applDetails = {
      applicationName: this._screenHolderService.carousal[event].applicationName,
      screenName: this._screenHolderService.carousal[event].screenName,
      tabName: this._screenHolderService.carousal[event].tabName
    }
    // console.log("received ", event);
  }

}
