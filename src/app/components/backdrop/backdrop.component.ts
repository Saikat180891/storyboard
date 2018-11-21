import { Component, OnInit, Input, OnChanges, AfterViewInit, AfterContentInit, HostListener } from '@angular/core';
import {FormBuilder, FormGroup, FormControlName, FormControl, Validators} from '@angular/forms';
import {slideDown, hideInOut} from '../../animation';

import {AppcontrolService} from '../../controlservice/appcontrol.service';
import {DataService} from '../../data.service';
import {ContainerService} from '../container/container.service';
import {PreloaderService} from '../shared/preloader/preloader.service';


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
  imagePath:string = '';
  userDatas;
  assigneeName:string = '';

  createSOP = "Create New SOP";
  editSOP = "Edit SOP";

  arr = ["Saikat paul", "sujit", "Aadesh", "kanishka", "Manjit", "rakesh", "ayush", "arpit", "arijit", "venkat", "Bhavana", "manbir", "shankar"];

  /**
   * This variables are used while creating a new card
   */

  createAssignees = [];

  /**
   * Validate SOP form
   */
  validateAutomationSystemName:boolean = false;
  validateClientName:boolean = false;
  validateChargeCode:boolean = false;
  validateSelectedDate:boolean = false;

  /**
   * These variables are used to display messages using string interpolation technique
   * The "border" variable is used to change the border color of the due date box
   */
  validateClientNameMessage:string = "*Client name cannot be blank or contain numbers";
  validateAutomationSystemNameMessage:string = "*Automation system name cannot be blank";
  validateChargeCodeMessage:string = "*Please enter a valid charge code or due date";

  border = "1px solid #D1D1D1";

  /**
   * This variables are used while rearranging the date
   */
  editSelectedDate;

  options;

  ID;

  sopForm = this.formBuilder.group({
            id: [''],
            clientName: ['', Validators.required],
            title: ['', Validators.required],
            chargeCode: ['', Validators.required],
            due_date: ['', Validators.required],
            rCodes: [''],
            logo: ['']
          });
 

  constructor(private _UIControllerService:AppcontrolService,
              private _dataService:DataService,
              private _ContainerService:ContainerService,
              private formBuilder: FormBuilder,
              private _preloaderService: PreloaderService) {

              this._UIControllerService.data.subscribe(
                  (data:any)=>{
                    console.log("dataFrom_UIControllerService ",data)
                    this.sopForm.patchValue({
                      id: data.id,
                      clientName: data.clientName,
                      title: data.title,
                      chargeCode: data.chargeCode,
                      due_date: this.arrangeDateInCorrectFormat(data.due_date),
                      rCodes: 5,
                      logo: data.logo
                    });
                    this.filePreview = this.sopForm.value.logo;
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
    this.imagePath = '';
    this.createAssignees = [];
    this.validateAutomationSystemName = false;
    this.validateClientName = false;
    this.validateChargeCode = false;
    this.validateSelectedDate = false;
    this.border = "1px solid #D1D1D1";
    this.assigneeName = '';
    this.filePreview = '';
    
  
    /**
     * Clear the form
     */
    this.sopForm.setValue({
      id: '',
      clientName: '',
      title: '',
      chargeCode: '',
      due_date: '',
      rCodes: '',
      logo: ''
    });

  }
  filePreview;
  /**
   * To select and preview image for logo
   * @param fileSelected
   */
  onFileSelected(fileSelected){
    if (fileSelected.target.files && fileSelected.target.files[0]) {
      this.sopForm.value.logo = fileSelected.target.files[0];
      console.log(this.sopForm.value.logo)
      let reader:any = new FileReader();
      reader.readAsDataURL(fileSelected.target.files[0]);
      reader.onload = (fileSelected) => {
        this.filePreview = fileSelected.target.result;
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


   validateForm(object){
    let validationStatus = [];

    for (let key in this.sopForm.value) {
      if(key == 'clientName'){
        validationStatus[0] = !(this.sopForm.value[key] == '');
        this.validateClientName = !validationStatus[0];
      }

      if(key == 'title'){
        validationStatus[1] = !(this.sopForm.value[key] == '');
        this.validateAutomationSystemName = !validationStatus[1];
      }

      if(key == 'chargeCode'){
        validationStatus[2] = !(this.sopForm.value[key] == '');
        this.validateChargeCode = !validationStatus[2];
      }

      if(key == 'due_date'){
        validationStatus[3] = !(this.sopForm.value[key] == 'NaN/NaN/NaN');
        this.validateSelectedDate = !validationStatus[3];
        this.border = !validationStatus[3]?"1px solid rgb(245, 117, 117)":"1px solid #D1D1D1";
      }
    }

    let sum = 0;
    for(let i of validationStatus){
      if(i == false){
        sum = sum + 1;
      }
    }

    return sum;
   }

  onCreateNew(){
    this.sopForm.value.due_date = this.formatDate(this.sopForm.value.due_date);
    let validationCheck = this.validateForm(this.sopForm.value);

    if(validationCheck == 0){
      this._preloaderService.openPreloader = true;
      console.log("the created sop form is ", this.sopForm.value);

      let formData = this.JSONtoFormData(this.sopForm.value);

      this._dataService.postData('/sop.json',  formData)
      .subscribe(
        (response)=> {
          console.log("Response ",response);
          if(response){
            this._ContainerService.cardContents.push(
              {
                themeColor: this._ContainerService.colorPicker[this._ContainerService.getUniqueNumber()],
                reasonCodes: 0,
                ...response,
                logo: response["image_url"]
              }
            );
            console.log("this is the service contents", this._ContainerService.cardContents)
          }
          this._preloaderService.openPreloader = false;
          this.onOverlayClose();
          setTimeout(()=>{
            this._preloaderService.openPreloader = false;
          });
        },
        (err)=> console.log(err)
      );
    }
  }

  /**
   * Save an editted card
   */
  onSave(){
    this.sopForm.value.due_date = this.formatDate(this.sopForm.value.due_date);
    
    let validationCheck = this.validateForm(this.sopForm.value);

    if(validationCheck == 0){
      this._preloaderService.openPreloader = true;
      console.log("the edited sop form is ", this.sopForm.value);

      let formData = this.JSONtoFormData(this.sopForm.value);
      if(typeof formData.get("logo") === "string"){
        formData.delete("logo");
      }


        this._dataService.update('/sop', this.sopForm.value.id + '.json', formData)
        .subscribe(response=>{
          this._ContainerService.cardContents.forEach((element, index)=>{
            if(element.id == this.sopForm.value.id){
              this._ContainerService.cardContents[index] = {
                themeColor: this._ContainerService.colorPicker[this._ContainerService.getUniqueNumber()],
                reasonCodes: 0,
                ...response,
                logo: response["image_url"]
              }
            }
          });
          this._preloaderService.openPreloader = false;
          this.onOverlayClose();

          setTimeout(()=>{
            this._preloaderService.openPreloader = false;
          });
      });

    }

    
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
    console.log(this.editSelectedDate)
    return this.editSelectedDate;
  }

  JSONtoFormData(json){
    let formData = new FormData();
      for(let fieldValue in json){
        formData.append(fieldValue, json[fieldValue])
      }
      return formData;
  }
}
