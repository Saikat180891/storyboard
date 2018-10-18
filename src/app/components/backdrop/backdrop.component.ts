import { Component, OnInit, Input, OnChanges, AfterViewInit, AfterContentInit, HostListener } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

import {AppcontrolService} from '../../controlservice/appcontrol.service';
import {DataService} from '../../data.service';
import {ContainerService} from '../container/container.service';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
  ENTER = 13
}

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
  openPreloader:boolean = false;

  arr = ["Saikat paul", "sujit", "Aadesh", "kanishka", "Manjit", "rakesh", "ayush", "arpit", "arijit", "venkat", "Bhavana", "manbir", "shankar"]

  /**
   * This variables are used while creating a new card
   */
  automationSystemName = '';
  clientName = '';
  chargeCode = '';
  selectedDate;
  createAssignees = [];
  postPayload;

  /**
   * Validate create SOP form
   */
  validateAutomationSystemName:boolean = false;
  validateClientName:boolean = false;
  validateChargeCode:boolean = false;
  validateSelectedDate:boolean = false;

  /**
   * These variables are used to display messages using string interpolation technique
   * The "border" variable is used to change the border color of the due date box
   */
  validateAutomationSystemNameMessage:string = '';
  validateClientNameMessage:string = '';
  validateChargeCodeMessage:string = '';
  validateSelectedDateMessage:string = '';
  border;

  /**
   * This variables are used while editing a card
   */
  editFields;
  editAutomationSystemName;
  editClientName;
  editChargeCode;
  editSelectedDate;
  editImagePath;
  editAssignees = [];

  options;

  ID;

  constructor(private _UIControllerService:AppcontrolService,
              private _dataService:DataService,
              private _ContainerService:ContainerService) 
  {
    this._UIControllerService.data.subscribe(
        (data:any)=>{
          console.log("dataFrom_UIControllerService ",data)
          this.ID = data.id;
          this.editAutomationSystemName = data.title;
          this.editClientName = data.clientName;
          this.editChargeCode = data.chargeCode;
          this.editSelectedDate = this.arrangeDateInCorrectFormat(data.dueDate);
          this.editAssignees = data.assigneeList;
          this.editImagePath = data.logo;
          this.editAssignees = data.assigneeList;
        }
      );
  }

  /**
   * Hide backdrop when escape is pressed
   * @param event 
   */
  @HostListener('document:keyup.escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event)
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.onOverlayClose();
    } 
  }
  /**
   * Create new Sop on enter press
   * @param event
   */
  @HostListener('document:keyup.enter', ['$event'])
  keyEventEnter(event: KeyboardEvent) {
    //console.log(event)
    if (event.keyCode === KEY_CODE.ENTER) {
      this.onCreateNew();
    } 
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

  /**
   * Function to Search for name and add them to the assignee list
   * @param event 
   */
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

  /**
   * Select a name on click and display it in the assignee to input box
   * @param option 
   */
  onSelect(option){
    this.assigneeName = option;
    this.options = [];
  }

  /**
   * Close the overlay and reset all fields
   */
  onOverlayClose(){
    this._UIControllerService.setOverlay(false);
    this.onClose();
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
    this.automationSystemName = '';
    this.clientName = '';
    this.chargeCode = '';
    this.selectedDate = '';
    this.imagePath = '';
    this.createAssignees = [];
    this.validateAutomationSystemName = false;
    this.validateClientName = false;
    this.validateChargeCode = false;
    this.validateSelectedDate = false;
    this.border = "1px solid #D1D1D1";
    this.assigneeName = '';
  }

  /**
   * To select and preview image for logo
   * @param fileSelected
   */
  onFileSelected(fileSelected){
    if (fileSelected.target.files && fileSelected.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(fileSelected.target.files[0]);
      //console.log(reader, fileSelected)
      reader.onload = (fileSelected) => {
        this.imagePath = fileSelected.target.result;
        console.log(fileSelected.target)
      }
    }
  }

  /**
   * To remove an assignee from the 'Assign To' list
   * @param assigneeListItem
   */
  onRemove(assigneeListItem){
    console.log(assigneeListItem)
    this._dataService.removeBackdropData(this.ID, assigneeListItem);
  }

  /**
   * To add an assignee to the 'Assign To' list
   * 
   */
  addAssignee(status){
    //if status==true then add name in the create new dialog box
    if(status){
      if(this.imagePath==""){
        this.imagePath = 'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg';
      }
      this.createAssignees.unshift([this.imagePath,this.assigneeName]);
      this.assigneeName = '';
      this.imagePath = '';
      //console.log(this.imagePath,this.assigneeName);
    }else{
      let acknowledge = this._dataService.addBackdropData(this.imagePath,this.assigneeName);
      this.assigneeName = '';
      this.imagePath = '';
    }
  }

  /**
   * Create a new SOP on click
   */
  onCreateNew(){
    let successStatus = {
      clientName: 0,
      automationSystemName: 0,
      chargeCode: 0,
      selectedDate: 0
    };
    let patternToMatch = /[0-9]/g;
    //console.log(patternToMatch.test(this.clientName))
    /**
     * Check if client name is blank or contains numbers,
     * if the condition is true then show the message and make the clientName 
     * property of the successStatus object 1, successStatus.clientName = 1 ==>
     * this will be used to validate if all the fields are correct or not
     */
    if(this.clientName === '' || patternToMatch.test(this.clientName)){
      this.validateClientName = true;
      this.validateClientNameMessage = "*Client name cannot be blank or contain numbers";
      successStatus.clientName = 1;
    }else{
      this.validateClientName = false;
      successStatus.clientName = 0;
    }
    /**
     * check if the automation system name is blank or contains numbers, if it contains numbers then
     * validation fails
     */
    if(this.automationSystemName === '' || patternToMatch.test(this.clientName)){
      this.validateAutomationSystemName = true;
      this.validateAutomationSystemNameMessage = "*Automation system name cannot be blank";
      successStatus.automationSystemName = 2;
    }else{
      this.validateAutomationSystemName = false;
      successStatus.automationSystemName = 0;
    }
    /**
     * Check if the charge code is blank or not
     */
    if(this.chargeCode === ''){
      this.validateChargeCode = true;
      this.validateChargeCodeMessage = "*Please enter a valid charge code";
      successStatus.chargeCode = 3;
    }else{
      this.validateChargeCode = false;
      successStatus.chargeCode = 0;
    }
    /**
     * Check if the user has entered due date or not
     */
    if(!this.selectedDate){
      this.validateSelectedDate = true;
      this.border = "1px solid rgb(245, 117, 117)";
      this.validateChargeCodeMessage = "*Please choose the date from the datepicker";
      successStatus.selectedDate = 4;
    }else{
      this.validateSelectedDate = false;
      successStatus.selectedDate = 0;
      this.border = "1px solid #D1D1D1";
    }
    /**
     * Check for charge code and due date
     */
    if(this.chargeCode === '' && !this.selectedDate){
      this.validateChargeCode = this.validateSelectedDate = true;
      this.border = "1px solid rgb(245, 117, 117)";
      this.validateChargeCodeMessage = "*Please enter a valid charge code and due date";
      successStatus.chargeCode = 3;
      successStatus.selectedDate = 4;
    }else{
      this.validateSelectedDate = this.validateSelectedDate = false;
      successStatus.chargeCode = 0;
      successStatus.selectedDate = 0;
      this.border = "1px solid #D1D1D1";
    }
    /**
     * This is the checklist, i.e. if there are validation errors in the above 
     * code the sum won't be zero and hence the API call is not executed
     */
    let sum = 0;
    for(let status in successStatus){
      sum += parseInt(successStatus[status]);
      console.log(sum, successStatus[status], status);
    }
    console.log("Sum = ", sum)
    /**
     * If the sum is zero only then the api is called to store the create new SOP data to 
     * database
     */
    if(sum == 0){
      this.openPreloader = true;
      this.postPayload = {
        id: 17,
        title: this.automationSystemName,
        dueDate: this.formatDate(this.selectedDate),
        rCodes: 5,
        chargeCode: this.chargeCode,
        clientName: this.clientName,
        logo: this.imagePath ? this.imagePath : 'https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg',
      }
    
      this._dataService.addData(this.postPayload)
      .subscribe(
        (res)=> {
          console.log(res);
          if(res){
            this.onOverlayClose();
            this._ContainerService.getdataFromDB();
            this.automationSystemName = '';
            this.clientName = '';
            this.chargeCode = '';
            this.selectedDate = '';
            this.createAssignees = [];
        //this.cardDatas = this._ContainerService.cardContents;
          }
          this.openPreloader = false;
        },
        (err)=> console.log(err)
      );
    }
  }

  /**
   * Save an editted card
   */
  onSave(){
    console.log(this.editAutomationSystemName)
    console.log(this.editClientName)
    console.log(this.editChargeCode)
    console.log(this.editSelectedDate)
    console.log(this.editImagePath)
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
