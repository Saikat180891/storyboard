import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';
import {AddStepsService} from '../../add-steps/add-steps.service';
import {DataService} from '../../../data.service';
import {ScreenHolderService} from '../screen-holder/screen-holder.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


import {popupInOut, openClose} from '../../../animation';
import { STICKY_DIRECTIONS } from '@angular/cdk/table';

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
  animations: [openClose, popupInOut]
})
export class SidebarComponent implements OnInit {
  @Input('sections') sections;
  panelOpenState = false;
  isOpen = false;
  clientData;
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
    //get client data from the add step service when the page loads
    this.clientData = this._addStepsService.clientData;

    //get all previously created sections and display them on the sidebar
    this.numberOfSections = this.sections;
  }

  /**
   * Sidebar open/close
   */
  toggle() {
    this.isOpen = !this.isOpen;
    this.onCloseAddSection();
    setTimeout(()=>{
      this.el.nativeElement.querySelector(".sections").style.height = `${(Number(window.screen.height) - (150 + 100 + 50 + 100))}px`;
    }, 100)
  }

  /**
   * Request to open add screen dialog box
   * @param event 
   */
  onAddNewScreenRequest(event){
    this._screenHolderService.addNewScreen = event;
    this._screenHolderService.ifEdit = event;
    this.toggle();
  }

  /**
   * close add section dialog box
   */
  onCloseAddSection(){
    this.addSectionStatus = false;
  }

  /**
   * open add section dialog box
   */
  onCreateSections(){
    this.addSectionStatus = true;
  }

  /**
   * reset create add section 
   */
  resetForm(){
    this.createSectionName = '';
    this.createSectionDescription = '';
  }

  drop(event: CdkDragDrop<string[]>) {
    
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  /**
   * Add new section api call method
   */
  addSection(){
    if(this.createSectionName != ''){
      let payload = {section_name: this.createSectionName, description: this.createSectionDescription}
      this._apiService.postData('/sop/reasoncode/userstories/8/sections.json', payload)
        .subscribe(response =>{
          this.numberOfSections.push({...response});
        });
      this.addSectionStatus = false;
      this.resetForm();
    }else{
      alert("Atleast section name is required");
    }
  }
}
