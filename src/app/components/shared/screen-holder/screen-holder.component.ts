import { Component, OnInit, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import {trigger,transition,style,animate,state} from '@angular/animations';
import {DataService} from '../../../data.service';


@Component({
  selector: 'app-screen-holder',
  templateUrl: './screen-holder.component.html',
  styleUrls: ['./screen-holder.component.scss'],
  animations: [
    trigger('fadeInOut',[
      state('void', style({opacity:0})),
      // state('*', style({opacity:1, right:'0'})),
      transition('void <=> *',[
        animate('100ms ease-in')
      ])
    ])
  ]
})
export class ScreenHolderComponent implements OnInit {

  @Output() res = new EventEmitter();

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

  addNewScreen:boolean = false;
  imageNotAvailable:boolean = true;
  ifEdit:boolean = false;

  insertImage = '';
  displayEditButton:boolean = false;

  carousalContainer = [];
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
  constructor(private el: ElementRef, private _apiService: DataService) {
    
   }

  ngOnInit() {
    
  }
  updateScreenTracker(payLoad){
    this.currentScreenTracker = this.carousalContainer.indexOf(payLoad);
    console.log("The current status tracker =",this.currentScreenTracker)
  }

  addNewScreenOverlay(){
    this.addNewScreen = !this.addNewScreen;
    this.ifEdit = true;
  }
  onClose(){
    this.addNewScreen = false;
    this.reset();
  }
  previous(){
    if(this.carousalContainer.length == 1){
      alert("There is no image to display");
    }else if(this.carousalContainer.length == 0){
      alert("Please add a new screen to begin");
    }else if(this.carousalContainer.length < 0){
      alert("No more screen to display");
    }else{
      
    }

  }

  next(){
    if(this.carousalContainer.length == 1){
      alert("There is no image to display");
    }else if(this.carousalContainer.length == 0){
      alert("Please add a new screen to begin");
    }else if(this.carousalContainer.length - 1){
      alert("There is no more image to display");
    }else{  
      
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

      this.res.emit(payload);
      
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

      console.log(payload.get('applicationName'))
      console.log(payload.get('screenName'))

      // let payload = {
      //   applicationName: this.applicationName,
      //   screenName: this.screenName,
      //   tabName: this.tabName,
      //   screenImage: this.previewScreen
      // }
      // console.log("Payload = ", payload)
      this.carousalContainer.push(payload);
      this.updateScreenTracker(payload);

      this.addNewScreen = this.imageNotAvailable = false;
      this.previewImageStatus = this.displayEditButton = true;

      console.log(this.carousalContainer);
      this.insertImage = payload.get('screenImage') + '';
      this.reset();
      
    }else{
      alert("Please ensure none of the fields are empty.")
    }
  }

  onEdit(){
    this.ifEdit = false;
    this.addNewScreen = true;
    this.previewImageStatus = false;

    this.applicationName = this.carousalContainer[this.currentScreenTracker].get('applicationName');
    this.screenName = this.carousalContainer[this.currentScreenTracker].get('screenName');
    this.tabName = this.carousalContainer[this.currentScreenTracker].get('tabName');
    this.previewScreen = this.carousalContainer[this.currentScreenTracker].get('screenImage');

    console.log(this.carousalContainer[this.currentScreenTracker]);
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
