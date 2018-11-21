import { Component, OnInit, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

import {DataService} from '../../../data.service';
import {ScreenHolderService} from './screen-holder.service';
import {CommondbService} from '../../../commondb.service';
import {popupInOut, hideAccordian} from '../../../animation';
import {AddScreenService} from '../add-screen/add-screen.service';

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
  animations: [popupInOut, hideAccordian]
})
export class ScreenHolderComponent implements OnInit {

  // @Output() res = new EventEmitter();
  @Output() currentScreen = new EventEmitter();

  imgs = [1,2,3,4,5,6];
  prev="";
  focus = "";
  nxt="";
  hover:boolean = false;
  

  /**
   * These variables are used to handle the 'Add New Screen' popup
   */
  applicationName = '';
  screenName = '';
  tabName = '';
  previewScreen = '';
  imageFile;

  imageDimension = {
    width : "auto",
    height: "auto"
  }
  
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

  sliderHeight;
  editTopBtn;

  pos = 0;

  img_no:number = 0;
  constructor(
    private el: ElementRef, 
    private _apiService: DataService,
    private _screenHolderService: ScreenHolderService,
    private _commonDB: CommondbService,
    private _addScreen: AddScreenService
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
    if(window.innerWidth > 1368){
      this.sliderHeight = 650;
      this.editTopBtn = 0;
    }else{
      this.sliderHeight = 450;
    }
    console.log(window.innerWidth, this.sliderHeight);

    if(this._screenHolderService.carousal){
      this.imageNotAvailable = false;
    }
  }

  onHover(){
    this.hover = false;
  }

  onUnHover(){
    this.hover = true;
  }

  /**
   * Update screen tracker
   * @param payLoad 
   */
  updateScreenTracker(payLoad){
    this._screenHolderService.currentScreen = this._screenHolderService.carousal.indexOf(payLoad);
    console.log("The current status tracker =",this._screenHolderService.currentScreen)
  }

  /**
   * open add screen
   */
  addNewScreenOverlay(){
    this._screenHolderService.addNewScreen = !this._screenHolderService.addNewScreen;
    this._screenHolderService.ifEdit = true;
  }

  /**
   * close add screen
   */
  onClose(){
    this._screenHolderService.addNewScreen = false;
    this.reset();
  }
  
  /**
   * go to the previous screen
   */
  previous(){

    if(this.pos == parseInt("-"+(this._screenHolderService.carousal.length - 1) * this.sliderHeight)){
      alert("No more screen to display");
    }else{
      this.pos = this.pos - this.sliderHeight;
      this._screenHolderService.currentScreen = this._screenHolderService.currentScreen - 1;
      // this._screenHolderService.currentScreen = this.currentScreenTracker;
      this.currentScreen.emit(this._screenHolderService.currentScreen);
      console.log("The current status tracker =",this._screenHolderService.currentScreen);
    }
    
    // console.log("the previous image index is", this.counter, this. pos)
  }

  /**
   * go to the next screen
   */
  next(){
    
    if(this.pos == 0){
      alert("No more screen to display");
    }else{
      this.pos = this.pos + this.sliderHeight;
      this._screenHolderService.currentScreen = this._screenHolderService.currentScreen + 1;
      // this._screenHolderService.currentScreen = this.currentScreenTracker;
      this.currentScreen.emit(this._screenHolderService.currentScreen);
      console.log("The current status tracker =",this._screenHolderService.currentScreen);
    }
    
    // console.log("the next image index is", this.counter, this. pos)
  }

  /**
   * reset all fields
   */
  reset(){
    this.applicationName = '';
    this.screenName = '';
    this.tabName = '';
    this.previewScreen = '';
    this.fileLocation = '';
    this.previewImageStatus = true;
  }

  /**
   * add screen on btn click
   */
  onAdd(){
    if(this.applicationName != '' && this.screenName != '' && this.tabName != '' && this.previewScreen != ''){
      let payload = new FormData();

      payload.append('applicationName', this.applicationName);
      payload.append('screenName', this.screenName);
      payload.append('tabName', this.tabName);
      payload.append('screenImage', this.imageFile);
      
      this._apiService.postData('/sop/reasoncode/userstories/8/sections/31.json', payload)
      .subscribe(
        response =>{

          this._screenHolderService.carousal.push(response);
          this.updateScreenTracker(response);
          this.currentScreen.emit(this._screenHolderService.currentScreen);
          console.log("Carousal Service ",this._screenHolderService.carousal);
          this._screenHolderService.payload = this._screenHolderService.carousal[this._screenHolderService.currentScreen];
          console.log("Response for uploading screen",response);
        }
      );
      

      this._screenHolderService.addNewScreen = this.imageNotAvailable = false;
      this.previewImageStatus = this.displayEditButton = true;
      this.pos = 0;

      // this.insertImage = payload.get('screenImage') + '';
      this.reset();
      
    }else{
      alert("Please ensure none of the fields are empty.")
    }
  }

  /**
   * edit screen on btn click
   */
  onEdit(){
    this._screenHolderService.ifEdit = false;
    this._screenHolderService.addNewScreen = true;
    this.previewImageStatus = false;

    this.applicationName = this._screenHolderService.carousal[this._screenHolderService.currentScreen].applicationName;
    this.screenName = this._screenHolderService.carousal[this._screenHolderService.currentScreen].screenName;
    this.tabName = this._screenHolderService.carousal[this._screenHolderService.currentScreen].tabName;
    this.previewScreen = this._screenHolderService.carousal[this._screenHolderService.currentScreen].image_url;
    console.log(this._screenHolderService.currentScreen);
    console.log(this._screenHolderService.carousal[this._screenHolderService.currentScreen]);
  }

  /**
   * save edited screen on btn click
   */
  onSave(){
    let payload;
    if(typeof this.imageFile == 'string'){
      payload = {
        applicationName: this.applicationName,
        screenName: this.screenName,
        tabName: this.tabName
      }
    }else{
      payload = new FormData();
      payload.append('applicationName', this.applicationName);
      payload.append('screenName', this.screenName);
      payload.append('tabName', this.tabName);
      payload.append('screenImage', this.imageFile);
    }

    this._apiService.update('/sop/reasoncode/userstories/sections/screens', this._screenHolderService.carousal[this._screenHolderService.currentScreen].id + '.json', payload)
      .subscribe(response =>{
        // console.log(response);
        this._screenHolderService.carousal[this._screenHolderService.currentScreen] = response;
      });
    this.currentScreen.emit(this._screenHolderService.currentScreen);
    this.onClose();
  }

  onDelete(){

    this._apiService.delete('/sop/reasoncode/userstories/8/sections/screens/destroy', this._screenHolderService.carousal[this._screenHolderService.currentScreen].id + '.json')
      .subscribe(response=>{
        this._screenHolderService.carousal.splice(this._screenHolderService.currentScreen, 1);
        this._screenHolderService.currentScreen = this._screenHolderService.currentScreen - 1;

        if(this._screenHolderService.currentScreen == -1){
          this.pos = this.pos + this.sliderHeight;
          this._screenHolderService.currentScreen = 0;
        }
        
        if(this._screenHolderService.carousal.length == 0){
          this.imageNotAvailable = true;
        }
        
        console.log(response, this._screenHolderService.carousal);
      })
  }

  /**
   * convert file to base64
   */
  onFileSelected(fileSelected){
    if (fileSelected.target.files && fileSelected.target.files[0]) {
      let reader:any = new FileReader();
      //the file is stored in imageFile
      this.imageFile = fileSelected.target.files[0];
      //file name is stored in fileLocation
      this.fileLocation = fileSelected.target.files[0].name;
      //file is converted to base64 for preview
      reader.readAsDataURL(fileSelected.target.files[0]);
      reader.onload = (fileSelected) => {
        //calculated file dimension
        this.getImageDimension(fileSelected.target.result);
        //close add screen preview dialog box
        this.previewImageStatus = false;
        //base64 string data is generated and asigned to previewScreen
        this.previewScreen = fileSelected.target.result;
      }
    }
  }

  /**
   * get dimension of the file
   * @param file 
   */
  getImageDimension(file){
    var image = new Image();
    image.src = file;
    let sliderHeight = this.sliderHeight;
    let imageDimension = {
      height: "auto",
      width: "auto"
    };
    image.onload = function() {
      // access image size here 
      // console.log("Image width is ",image.width);
      // console.log("Image height is ",image.height);
      if(image.height > sliderHeight){
        imageDimension.height = sliderHeight + "px";
        imageDimension.width = sliderHeight + "px";
      }
    };
    this.imageDimension = imageDimension;
  }

  JSONtoFormData(json){
    let formData = new FormData();
      for(let fieldValue in json){
        formData.append(fieldValue, json[fieldValue])
      }
      return formData;
  }

}
