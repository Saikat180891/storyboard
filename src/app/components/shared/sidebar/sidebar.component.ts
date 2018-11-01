import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

import {DataService} from '../../../data.service';

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
    } 
  }

  constructor(private el: ElementRef, private _apiService: DataService) { }

  ngOnInit() {
    
  }

  isOpen = false;
 
  toggle() {
    this.isOpen = !this.isOpen;
    setTimeout(()=>{
      this.el.nativeElement.querySelector(".sections").style.height = `${(Number(window.screen.height) - (150 + 100 + 50 + 100))}px`;
    }, 100)
  }

  onAddSectionClose(){
    this.addSectionStatus = false;
  }

  onCreateSections(){
    this.addSectionStatus = true;
    // this.imageCounter++;
    
  }

  addSection(){
    
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
  }
}
