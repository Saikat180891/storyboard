import { Component, OnInit, Input, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

import {AppcontrolService} from '../../controlservice/appcontrol.service';
import {DataService} from '../../data.service';


@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.css'],
  animations: [
    trigger('fadeIn',[
      state('void', style({opacity:0, top:'-100%'})),
      // state('*', style({opacity:1, right:'0'})),
      transition('void <=> *',[
        animate('200ms ease-in')
      ])
    ]),
    trigger('fadeOut',[
      transition('void => *',[
        style({height: "0px"}),
        animate(100, style({height: "26px"}))
      ]),
      transition('* => void',[
        animate(100, style({height: "0px"}))
      ])
    ])
  ]
})
export class BackdropComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() cardID;
  imagePath:string = '';
  userDatas;
  assigneeName:string = '';

  createSOP = "Create New SOP";
  editSOP = "Edit SOP";

  arr = ["Saikat paul", "sujit", "Aadesh", "kanishka", "Manjit", "rakesh", "ayush", "arpit", "arijit", "venkat", "Bhavana", "manbir", "shankar"]

  /**
   * This variables are used while creating a new card
   */
  automationSystemName;
  clientName;
  chargeCode;
  selectedDate;

  /**
   * This variables are used while editing a card
   */
  editFields;
  editAutomationSystemName;
  editClientName;
  editChargeCode;
  editSelectedDate;

  options;

  constructor(private _UIControllerService:AppcontrolService,
              private _dataService:DataService) 
  { 
    this._UIControllerService.data.subscribe(
        (data:any)=>{
          console.log("dataFrom_UIControllerService ",data)
          this.editAutomationSystemName = data.title;
          this.editClientName = data.clientName;
          this.editChargeCode = data.chargeCode;
          this.editSelectedDate = this.arrangeDateInCorrectFormat(data.dueDate);
        }
      );
  }

  ngOnInit() {
    setTimeout(()=>{
      this.userDatas = this._dataService.getBackdropData();
    })
  }

  ngOnChanges(){
  }

  ngAfterViewInit(){
  }

  onKeyPress(event){
    console.log(this.assigneeName)

    this.options = this.arr.filter(calc(this.assigneeName))

    function calc(elementToSearch){
      return function(element){
        let characters = element.replace(/ /g, "").toLowerCase().split("");
        let charactersToSearch = elementToSearch.toLowerCase().split("");
    
        for(let i = 0; i < charactersToSearch.length; i++){
          if(charactersToSearch[i] != characters[i]){
            return;
          }
        }
    
        return element;
      }
      
    }
    
    if(this.assigneeName == ""){
      this.options = [];
    }
    console.log(this.options)
  }

  onSelect(option){
    this.assigneeName = option;
    this.options = [];
  }

  /**
   * backdrop controls
   */
  onOverlayClose(){
    this._UIControllerService.setOverlay(false);
  }

  /**
   * Prevent click bubbling to the parent element
   * @param clickEvent - capture click event
   */
  preventPropagation(clickEvent){
    clickEvent.stopPropagation();
  }

  /**
   * To close the backdrop dialog-box
   */
  onClose(){
    this._UIControllerService.setOverlay(false);
  }

  /**
   * To select and preview image for logo
   * @param fileSelected
   */
  onFileSelected(fileSelected){
    if (fileSelected.target.files && fileSelected.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(fileSelected.target.files[0]);

      reader.onload = (fileSelected) => {
        this.imagePath = fileSelected.target.result;
      }
    }
  }

  /**
   * To remove an assignee from the 'Assign To' list
   * @param assigneeListItem
   */
  onRemove(assigneeListItem){
    this._dataService.removeBackdropData(assigneeListItem);
  }

  /**
   * To add an assignee to the 'Assign To' list
   * 
   */
  addAssignee(){
    if(this.assigneeName){
    let acknowledge = this._dataService.addBackdropData(this.imagePath,this.assigneeName);
      this.assigneeName = '';
    }
  }

  /**
   * Create a new card on click
   */
  onCreateNew(){
    let acknowledgement = this._dataService.setCardContent(this.automationSystemName, this.formatDate(this.selectedDate), this.chargeCode, this.imagePath);
    if(acknowledgement == true){
      this.onClose();
    }
    
  }

  /**
   * Save an editted card
   */
  onSave(){
    this.editSelectedDate = this.arrangeDateInCorrectFormat(this.editFields[0].dueDate);
  }

  /**
   * The (ngModelChange) event edits the editAutomationSystemName property
   * @param editedASN 
   */
  onEditASN(editedASN){
    this.editAutomationSystemName = editedASN;
    console.log(editedASN)
  }

  /**
   * The (ngModelChange) event edits the editCN property
   * @param editCN 
   */
  onEditClientName(editCN){
    this.editClientName = editCN;
    console.log(editCN)
  }

  /**
   * The (ngModelChange) event edits the editCC property
   * @param editCC 
   */
  onEditCargeCode(editCC){
    this.editChargeCode = editCC;
    console.log(editCC)
  }

  /**
   * Rearrange the date in the following format DD/MM/YYYY
   * @param date 
   */
  formatDate(date){
    let dateStr = new Date(date)
    let strDate =  "" + dateStr.getDate() + "/" + dateStr.getMonth() + "/" + dateStr.getFullYear();
    return strDate;
  }
  
  /**
   * Format the year as 00YY
   * @param year 
   */
  formatYear(year){
    let digits = year.toString().split("");
    return ""+ digits[2] + digits[3];
  }

  /**
   * Get the date as a string and then split the string using 
   * the "/" then using the date, month and year 
   * set the due date in the editSelectedDate property
   * @param date 
   */
  arrangeDateInCorrectFormat(date){
    let newDate = date.toString().split("/");
    this.editSelectedDate = new Date();
    this.editSelectedDate.setFullYear(Number(newDate[2]));
    this.editSelectedDate.setMonth(Number(newDate[1])-1);
    this.editSelectedDate.setDate(Number(newDate[0]));
    console.log(this.editSelectedDate)
    return this.editSelectedDate;
  }
}
