import { Component, OnInit, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import {trigger,transition,style,animate,state} from '@angular/animations';
import {DataService} from '../../../data.service';
import {ScreenHolderService} from './screen-holder.service';

import {popupInOut} from '../../../animation';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
  ENTER = 13
}



@Component({
  selector: 'app-screen-holder',
  templateUrl: './screen-holder.component.html',
  styleUrls: ['./screen-holder.component.scss'],
  animations: [popupInOut]
})
export class ScreenHolderComponent implements OnInit {

  // @Output() res = new EventEmitter();
  @Output() currentScreen = new EventEmitter();

  imgs = [1,2,3,4,5,6];
  prev="";
  focus = "";
  nxt="";

  

  /**
   * These variables are used to handle the 'Add New Screen' popup
   */
  applicationName = '';
  screenName = '';
  tabName = '';
  previewScreen = '';
  previewImageStatus:boolean = true;
  fileLocation = '';

  addNewScreen:boolean;
  imageNotAvailable:boolean = true;
  ifEdit:boolean = false;

  insertImage = '';
  displayEditButton:boolean = false;

  // carousalContainer = [];
  carousalImageApplicationName = '';
  carousalImageScreenName = '';
  carousalImageTabName = '';
  carousalLengthTracker: number;
  currentScreenTracker: number = 0;

  previewLastImage = {
    applicationName: '',
    screenName: '',
    tabName: '',
    screenImage: ''
  };

  img_no:number = 0;
  constructor(
    private el: ElementRef, 
    private _apiService: DataService,
    private _screenHolderService: ScreenHolderService
    ) { }


    /**
   * Hide backdrop when escape is pressed
   * @param event 
   */
  @HostListener('document:keyup.escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event)
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.onClose();
    } 
  }

  ngOnInit() {
    // this.addNewScreen = this._screenHolderService.addNewScreen;
    // console.log(this.addNewScreen)
  }
  updateScreenTracker(payLoad){
    this.currentScreenTracker = this._screenHolderService.carousal.indexOf(payLoad);
    this._screenHolderService.currentScreen = this.currentScreenTracker;
    console.log("The current status tracker =",this.currentScreenTracker)
  }

  addNewScreenOverlay(){
    this._screenHolderService.addNewScreen = !this._screenHolderService.addNewScreen;
    this._screenHolderService.ifEdit = true;
  }
  onClose(){
    this._screenHolderService.addNewScreen = false;
    this.reset();
  }
  previous(){
    if(this._screenHolderService.carousal.length == 1){
      alert("There is no image to display");
    }else if(this._screenHolderService.carousal.length == 0){
      alert("Please add a new screen to begin");
    }else if(this._screenHolderService.carousal.length < 0){
      alert("No more screen to display");
    }else if(this.currentScreenTracker == 0){
      alert("No more image to display");
      this.prev = '';
      this.updateScreenTracker(this._screenHolderService.carousal[0]);
    }else{
        let getlastScreen = this.currentScreenTracker - 1;
        this.insertImage = this._screenHolderService.carousal[getlastScreen].get('screenImage');
        this.updateScreenTracker(this._screenHolderService.carousal[getlastScreen]);
        this.currentScreen.emit(this.currentScreenTracker);
  
        let lastScreen = this.currentScreenTracker - 1;
        if(lastScreen < 0){
          this.prev = '';
        }else{
          this.prev = this._screenHolderService.carousal[lastScreen].get('screenImage');
        }
        
    }

  }

  next(){
    if(this._screenHolderService.carousal.length == 1){
      alert("There is no image to display");
    }else if(this._screenHolderService.carousal.length == 0){
      alert("Please add a new screen to begin");
    }else if(this._screenHolderService.carousal.length == this.currentScreenTracker + 1){
      alert("No more image to display");
    }else{  
      let getNextScreen = this.currentScreenTracker + 1;
      this.prev = this._screenHolderService.carousal[this.currentScreenTracker].get('screenImage');

      this.insertImage = this._screenHolderService.carousal[getNextScreen].get('screenImage');
      this.updateScreenTracker(this._screenHolderService.carousal[getNextScreen]);
      this.currentScreen.emit(this.currentScreenTracker);
    }
  }
  reset(){
    this.applicationName = '';
    this.screenName = '';
    this.tabName = '';
    this.previewScreen = '';
    this.fileLocation = '';
    this.previewImageStatus = true;
  }

  onAdd(){
    if(this.applicationName != '' && this.screenName != '' && this.tabName != '' && this.previewScreen != ''){
      let payload = new FormData();

      payload.append('applicationName', this.applicationName);
      payload.append('screenName', this.screenName);
      payload.append('tabName', this.tabName);
      payload.append('screenImage', this.previewScreen);

      // this.res.emit(payload);

      this._screenHolderService.carousal.push(payload);
      this.updateScreenTracker(payload);
      this.currentScreen.emit(this.currentScreenTracker);
      console.log("Carousal Service ",this._screenHolderService.carousal)

      if(this._screenHolderService.carousal.length > 1){
        let lastScreen = this.currentScreenTracker - 1;
        this.prev = this._screenHolderService.carousal[lastScreen].get('screenImage');
        console.log(lastScreen);
      }

      /*
      this._apiService.postData('sop/reasoncode/userstories/1/sections/6.json', payload)
      .subscribe(
        response =>{
          console.log(response)
          
          this.carousalContainer.push(
            {
              ...response
            }
          );
        }
      )
      */

      // console.log(payload.get('applicationName'))
      // console.log(payload.get('screenName'))

      // let payload = {
      //   applicationName: this.applicationName,
      //   screenName: this.screenName,
      //   tabName: this.tabName,
      //   screenImage: this.previewScreen
      // }
      // console.log("Payload = ", payload)
      // this.carousalContainer.push(payload);
      

      this._screenHolderService.addNewScreen = this.imageNotAvailable = false;
      this.previewImageStatus = this.displayEditButton = true;

      // console.log(this.carousalContainer);
      this.insertImage = payload.get('screenImage') + '';
      this.reset();
      
    }else{
      alert("Please ensure none of the fields are empty.")
    }
  }

  onEdit(){
    this._screenHolderService.ifEdit = false;
    this._screenHolderService.addNewScreen = true;
    this.previewImageStatus = false;

    this.applicationName = this._screenHolderService.carousal[this.currentScreenTracker].get('applicationName');
    this.screenName = this._screenHolderService.carousal[this.currentScreenTracker].get('screenName');
    this.tabName = this._screenHolderService.carousal[this.currentScreenTracker].get('tabName');
    this.previewScreen = this._screenHolderService.carousal[this.currentScreenTracker].get('screenImage');

    console.log(this._screenHolderService.carousal[this.currentScreenTracker]);
  }

  onSave(){
    let payload = new FormData();

    payload.append('applicationName', this.applicationName);
    payload.append('screenName', this.screenName);
    payload.append('tabName', this.tabName);
    payload.append('screenImage', this.previewScreen);

    // this.res.emit(payload);
    this.insertImage = payload.get('screenImage') + '';
    this._screenHolderService.carousal[this.currentScreenTracker] = payload;
    this.currentScreen.emit(this.currentScreenTracker);
    this.onClose();
  }

  onFileSelected(fileSelected){
    if (fileSelected.target.files && fileSelected.target.files[0]) {
      let reader:any = new FileReader();
      
      this.fileLocation = fileSelected.target.files[0].name;
      reader.readAsDataURL(fileSelected.target.files[0]);
      reader.onload = (fileSelected) => {
        this.previewImageStatus = false;
        this.previewScreen = fileSelected.target.result;
      }
    }
  }


}
