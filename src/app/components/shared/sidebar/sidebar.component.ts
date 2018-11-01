import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';
import {AddStepsService} from '../../add-steps/add-steps.service';
import {DataService} from '../../../data.service';
import {ScreenHolderService} from '../screen-holder/screen-holder.service';



export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
  ENTER = 13
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', './hamburgers.min.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        left: '0'
      })),
      state('closed', style({
        left: '-180px'
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.1s')
      ]),
    ]),
    trigger('fadeIn',[
      state('void', style({opacity:0})),
      // state('*', style({opacity:1, right:'0'})),
      transition('void <=> *',[
        animate('0.1s ease-in')
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  panelOpenState = false;
  isOpen = false;
  clientData;
  clientLogo;
  logoPlaceholder = "../../../../assets/pics/logo-placeholder.jpg";
  /**
   * numberOfSections is an array
   */
  numberOfSections = [];
  imageCounter = 0;
  sectionName = '';
  createSectionName:string = '';
  createSectionDescription:string = '';
  addSectionStatus:boolean = false;

    /**
   * Hide backdrop when escape is pressed
   * @param event 
   */
  @HostListener('document:keyup.escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event)
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.isOpen = false;
      this.resetForm();
    } 
  }

  constructor(
    private el: ElementRef, 
    private _apiService: DataService,
    private _addStepsService: AddStepsService,
    private _screenHolderService: ScreenHolderService) { }

  ngOnInit() {
   this.clientData = this._addStepsService.clientData;
   this.clientLogo = this.clientData.logo?this.logoPlaceholder:this.logoPlaceholder;
   console.log("Side bar reads ",this.clientData)
  }

  
 
  toggle() {
    this.isOpen = !this.isOpen;
    this.onCloseAddSection();
    setTimeout(()=>{
      this.el.nativeElement.querySelector(".sections").style.height = `${(Number(window.screen.height) - (150 + 100 + 50 + 100))}px`;
    }, 100)
  }

  onAddNewScreenRequest(event){
    this._screenHolderService.addNewScreen = event;
    console.log(event)
    this.toggle();

  }

  onCloseAddSection(){
    this.addSectionStatus = false;
  }

  onCreateSections(){
    this.addSectionStatus = true;
  }
  resetForm(){
    this.createSectionName = '';
    this.createSectionDescription = '';
  }

  addSection(){
    if(this.createSectionName != ''){
      let payload = {section_name: this.createSectionName, description: this.createSectionDescription}
    console.log(payload)
    this._apiService.postData('/sop/reasoncode/userstories/1/sections.json', payload)
      .subscribe(
        response =>{
          console.log(response)
          this.numberOfSections.push(
            {
              ...response
            }
            );
          console.log(response);
        }
      )
    this.addSectionStatus = false;
    this.resetForm();
    }else{
      alert("Atleast section name is required");
    }
  }
}
