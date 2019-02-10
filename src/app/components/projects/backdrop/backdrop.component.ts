import { Component, OnInit, Input, OnChanges, AfterViewInit, AfterContentInit, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, FormControlName, FormControl, Validators} from '@angular/forms';
import {slideDown, hideInOut} from '../../../animation';
import {fromEvent} from 'rxjs';

import {AppcontrolService} from '../../../services/controlservice/appcontrol.service';
import {DataService} from '../../../data.service';
import {ContainerService} from '../container/container.service';
import {MatSnackBar} from '@angular/material';
import {PreloaderService} from '../../shared/preloader/preloader.service';
import {CardService} from '../card/card.service';
import {ContainerComponent} from '../container/container.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {EditProject} from '../model/edit-project.model';
import { identifierModuleUrl } from '@angular/compiler';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
  ENTER = 13
}

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
  animations: [slideDown, hideInOut]
})

export class BackdropComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() cardID;
  @Input('permissions') permissions:any;
  @Input('projectData') projectData:any;
  @Output('close') close = new EventEmitter<boolean>();
  @ViewChild('dialogBox') dialogBox:ElementRef;

  imagePath:string = '';
  userDatas;
  assigneeName:string = '';
  projectDataToEdit:EditProject = {
    id: -1,
    clientName: '',
    title: '',
    chargeCode: '',
    rCodes: '',
    logo: '',
    due_date: ''
  };

  createSOP = "Create New Project";
  editSOP = "Edit Project";

  invitationList = [];

  roles: string[] = ['SuperAdmin', 'Manager', 'Analyst'];
  disableSelect:boolean = false;
  // role = 'Super Admin';
  /**
   * This variables are used while creating a new card
   */

  createAssignees = [];

  inviteEmail = "";
  inviteFirstName = "";
  inviteLastName = "";
  inviteRole="";
  inviteMessage="";

  /**
   * Validate SOP form
   */
  validateAutomationSystemName:boolean = false;
  validateClientName:boolean = false;
  validateChargeCode:boolean = false;
  validateSelectedDate:boolean = false;

  /**
   * Validate Invite New User Form
   */

  validateInviteEmail: boolean = false;
  validateFirstName: boolean = false;
  validateLastName: boolean = false;
  validateRole: boolean = false;

  selectedTabIndex: number = 0;
  invitationSuccess: boolean = false;
  filePreview:any;


  /**
   * These variables are used to display messages using string interpolation technique
   * The "border" variable is used to change the border color of the due date box
   */
  validateClientNameMessage:string = "*Client name cannot be blank or contain numbers";
  validateAutomationSystemNameMessage:string = "*Automation system name cannot be blank";
  validateChargeCodeMessage:string = "*Please enter a valid charge code or due date";

  border = "1px solid #D1D1D1";

  users:string[] = ['SuperAdmin', 'Manager', 'Analyst'];
  user:string;

  //payload structure
  logo:any;

  /**
   * This variables are used while rearranging the date
   */
  editSelectedDate:Date;

  options = [];

  ID;

  permissionGranted:any;
  newlyCreatedAssignees:any = [];
  alreadyCreatedUsers:any = [];
  dueDate:Date;
 

  constructor(private _UIControllerService:AppcontrolService,
              private _dataService:DataService,
              private _ContainerService:ContainerService,
              private formBuilder: FormBuilder,
              private _preloaderService: PreloaderService,
              private _cardService: CardService,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService,
              private __containerComponent: ContainerComponent
              ) {}

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
    if (event.keyCode === KEY_CODE.ENTER) {
      this.onSave();
    } 
  }

  ngOnInit() {
    this.projectDataToEdit = {
      id: JSON.parse(JSON.stringify(this.projectData)).id,
      title: JSON.parse(JSON.stringify(this.projectData)).title,
      chargeCode: JSON.parse(JSON.stringify(this.projectData)).chargeCode,
      clientName: JSON.parse(JSON.stringify(this.projectData)).clientName,
      due_date: JSON.parse(JSON.stringify(this.projectData)).due_date,
      rCodes: JSON.parse(JSON.stringify(this.projectData)).number_epics,
      logo: JSON.parse(JSON.stringify(this.projectData)).logo
    };
    this.filePreview = this.projectDataToEdit.logo;
    this.alreadyCreatedUsers = JSON.parse(JSON.stringify(this.projectData.assignee));
    this.dueDate = this.arrangeDateInCorrectFormat(JSON.parse(JSON.stringify(this.projectData)).due_date);

    fromEvent(document, 'click').subscribe(res=>{
      this.options = [];
    })
  }

  onSelectedDateChange(date:Date){
    this.projectDataToEdit.due_date = this.formatDate(date);
    this.dueDate = date;
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
    console.log(event.target.value);
    this._dataService.fetchData(`/users.json?startsWith=${event.target.value}`)
      .subscribe(res=>{
        this.options = res;
      },
      err=>{
        console.log("Error while fetching users", err);
      });
  }

  /**
   * Select a name on click and display it in the assignee to input box
   * @param option 
   */
  onSelect(option:any){
    this.newlyCreatedAssignees.push(option);
    this.options = [];
    console.log(this.newlyCreatedAssignees, this.alreadyCreatedUsers);
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

  onSelectionChange(value, index){
    this.newlyCreatedAssignees
    console.log(this.newlyCreatedAssignees, value, index)
  }

  /**
   * To close the backdrop dialog-box
   */
  onClose(){
    this.close.emit(false);
  }

  /**
   * To select and preview image for logo
   * @param fileSelected
   */
  onFileSelected(fileSelected){
    if (fileSelected.target.files && fileSelected.target.files[0]) {
      this.projectDataToEdit.logo = fileSelected.target.files[0];
      let reader:any = new FileReader();
      reader.readAsDataURL(fileSelected.target.files[0]);
      reader.onload = (fileSelected) => {
        this.filePreview = fileSelected.target.result;
      }
    }
  }

  onRemoveListItem(index:number){
    this.newlyCreatedAssignees.splice(index, 1);
  }

  /**
   * To remove an assignee from the 'Assign To' list
   * @param assigneeListItem
   */
  onRemove(id:number){
    // if(this._ContainerService.permissions[0]["permissions"]["Can delete assignee"]){
      this._dataService.delete(`/sop/assignee`, `${id}.json`)
        .subscribe(res=>{
          this.alreadyCreatedUsers.forEach(element=>{
            if(element.id == id){
              this.alreadyCreatedUsers.splice(this.alreadyCreatedUsers.indexOf(element), 1);
            }
          });
      });
    // }
  }


  /**
   * Create a new SOP on click
   */
   validateForm(object){
    let validationStatus = [];

    for (let key in object) {

    }
    console.log(validationStatus);

    let sum = 0;
    for(let i of validationStatus){
      if(i == false){
        sum = sum + 1;
      }
    }

    return sum;
   }

   onTabChange($event){
      this.selectedTabIndex = $event.index;
  }

  onAddUser(){
    let temporaryObject = {
      inviteEmail:'',
      inviteRole:'',
      inviteFirstName:'',
      inviteLastName:''
    };
    this.invitationList.push(temporaryObject);
  }
  
  // onSave(){
    // }
    
    
    /**
     * Save an editted card
     */
    onSave(){
      console.log(this.invitationList, this.projectDataToEdit)
    // let validationCheck = this.validateForm(this.sopForm.value);

    // if(validationCheck == 0){
      this.spinner.show();

      let formData = new FormData();
      for(let formFieldValue in this.projectDataToEdit){
        formData.append(formFieldValue, this.projectDataToEdit[formFieldValue]);
        console.log(formData.get(formFieldValue));
      }
      if(typeof formData.get('logo') === 'string'){
        formData.set('logo', '');
      }
      formData.set('rCodes', '');

      this._dataService.update('/sop', this.projectDataToEdit.id + '.json', formData)
        .subscribe(response=>{
          console.log("RESPONSE ON SOP EDIT", response)

          if(this.newlyCreatedAssignees.length > 0){
            this.newlyCreatedAssignees.forEach((ele, index, array)=>{
              this._dataService.postData(`/sop/${this.projectDataToEdit.id}/assignee.json`, 
              {
                user: ele.email, 
                role: ele.role
              })
                .subscribe(res=>{
                  this.alreadyCreatedUsers.push(ele);
                  this.newlyCreatedAssignees.splice(this.newlyCreatedAssignees.indexOf(ele), 1);
                });
            });
          }else{
            this.spinner.hide();
            // this.onOverlayClose();
          }
          this.snackBar.open("Project has been modified", "Success", {duration: 2000});

      },
      (err)=> {
        console.error("ERROR",err);
        // this._preloaderService.openPreloader = false;
        var keys = Object.keys(err.error);
        var error= "";
        keys.forEach(key => {
          error += key+": "+err.error[key] +"\n";
        });
        this.spinner.hide();

        this.snackBar.open(error, "Failed", {duration: 2000});
    },
    ()=>{
      this.__containerComponent.getListOfAllProjects();
      this.onClose();
      this.spinner.hide();
    }
    );
  // }
  }

  /**
   * Rearrange the date in the following format DD/MM/YYYY
   * @param date 
   */
  formatDate(date){
    let dateStr = new Date(date)
    let strDate =  "" + dateStr.getDate() + "/" + (dateStr.getMonth()+1) + "/" + dateStr.getFullYear();
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
    return this.editSelectedDate;
  }

  JSONtoFormData(json){
    let formData = new FormData();
      for(let fieldValue in json){
        if(typeof fieldValue === 'string'){
          delete json.fieldValue;
        }else{
          formData.append(fieldValue, json[fieldValue]);
          console.log(formData.get(fieldValue));
        }
      }
      return formData;
  }

  onSendInvitation(){
    // console.log(this.inviteEmail+" "+this.inviteFirstName+" "+this.inviteLastName+" "+this.inviteRole);
    this.invitationList.forEach(ele=>{
      console.log(ele);

      this._dataService.postData('/invite_users/', 
      {
        "first_name": ele.inviteFirstName, 
        "email": ele.inviteEmail,               
        "last_name": ele.inviteLastName, 
        "role": ele.inviteRole, 
        "sop": this.projectDataToEdit.id
      }).subscribe(res=>{
          this.invitationSuccess = true;
          this.inviteMessage = res;
          console.log(this.inviteMessage);
        }, 
        (err)=>{
          this.inviteMessage = err;
        });
    });
  }
}
