import { Component, OnInit, AfterViewInit, AfterContentInit, Input } from '@angular/core';
import { FormControl,  FormGroup, FormBuilder } from '@angular/forms';
import {StepService} from './step.service';
import {ScreenHolderService} from '../../screen-holder/screen-holder.service';
import {AddScreenService} from '../../add-screen/add-screen.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input('screenNumber') currentScreenId;
  @Input ('id') id;

  selected:string = 'Read';

  hide:boolean = false;

  stepTypes = ['Type', 'Read', 'UI Interaction', 'Calculation'];

  interactionType = ['Click', 'option2', 'option3'];

  parameter1 = ['param 1', 'param 2'];

  parameter2 = ['param 1', 'param 2'];

  clickOptions = ['Single Click', 'Double Click', 'Right Click'];

  UIInterSelected;
  UIInterClick;
  param1;
  param2;

  operationDetails = this.parentGroup.group({
    read: this.readGroup.group({
      readOperationNumber: [''],
      readFieldName: [''],
      readParameter: [''],
      readDataType: [''],
      readDataValue: [''],
      readNotes: [''],
      readExceptionHandling: ['']
    }),
    type: this.typeGroup.group({
      typeOperationNumber: [''],
      typeFieldName: [''],
      typeParameter: [''],
      typeExceptionHandling: [''],
      typeNotes: ['']
    }),
    uiinter: this.uiinterGroup.group({
      uiinterOperationNumber: [''],
      uiinterSelected: [this.UIInterSelected],
      uiinterParameter: [''],
      uiinterClickOptionSelected: [this.UIInterClick],
      uiinterExceptionHandling: [''],
      uiinterNotes: ['']
    }),
    calculation: this.clacGroup.group({
      calcOperationNumber: [''],
      calcparam1: [this.param1],
      calcparam2: [this.param2]
    })
  });
  


  constructor(private readGroup: FormBuilder,
              private typeGroup: FormBuilder,
              private uiinterGroup: FormBuilder,
              private clacGroup: FormBuilder,
              private parentGroup: FormBuilder,
              private _stepService: StepService,
              private _screenHolderService: ScreenHolderService,
              private _addScreenService: AddScreenService) {  }

  ngOnInit() {
    //The default step type is made 'Read' with the below data
    this._addScreenService.tempObj.numberOfSteps.push(
      {
        stepID: this.id, 
        steptype: this.selected ? this.selected: 'Read', 
        stepData: this.operationDetails.value.read
      });
  }
  ngAfterViewInit(){

    
  }

  ngAfterContentInit(){
    
  }

  onSelect(stepType){
    this.selected = stepType;
    console.log("ok")
    this._addScreenService.tempObj.numberOfSteps[this.id].steptype = this.selected;
    console.log("not ok")
    this.onUpdate();
    // switch(stepType){
    //   case 'Read':
    //   this._addScreenService.tempObj.numberOfSteps[this.id].stepData = this.operationDetails.value.read;
    //   break;
    //   case 'Type':
    //   this._addScreenService.tempObj.numberOfSteps[this.id].stepData = this.operationDetails.value.type;
    //   break;
    //   case 'UI Interaction':
    //   this._addScreenService.tempObj.numberOfSteps[this.id].stepData = this.operationDetails.value.uiinter;
    //   break;
    //   case 'Calculation':
    //   this._addScreenService.tempObj.numberOfSteps[this.id].stepData = this.operationDetails.value.calculation;
    //   break;
    //   default:
    //   break;
    // }
    // console.log(this._addScreenService.tempObj)
  }

  onCollapse(){
    this.hide = !this.hide;
  }

  onInteractionTypeSelected(option){
    this.UIInterSelected = option;
  }

  onParameter1Selected(option){
    this.param1 = option;
  }

  onParameter2Selected(option){
    this.param2 = option;
  }

  onClickOptionSelected(option){
    this.UIInterClick = option;
  }

  onDelete(){

    // if(this.selected === 'Read'){
    //   console.log(this.operationDetails.value.read);
    // }else if(this.selected === 'Type'){
    //   console.log(this.operationDetails.value.type);
    // }else if(this.selected === 'UI Interaction'){
    //   this.operationDetails.value.uiinter.uiinterSelected = this.UIInterSelected;
    //   this.operationDetails.value.uiinter.uiinterClickOptionSelected = this.UIInterClick;
    //   console.log(this.operationDetails.value.uiinter);
    // }else if(this.selected === 'Calculation'){
    //   this.operationDetails.value.calculation.calcparam1 = this.param1;
    //   this.operationDetails.value.calculation.calcparam2 = this.param2;
    //   console.log(this.operationDetails.value.calculation);
    // }
    console.log(this._addScreenService.tempObj);
  }

  onUpdate(){

    switch(this.selected){
      case 'Read':
      this._addScreenService.tempObj.numberOfSteps[this.id].stepData = this.operationDetails.value.read;
      break;
      case 'Type':
      this._addScreenService.tempObj.numberOfSteps[this.id].stepData = this.operationDetails.value.type;
      break;
      case 'UI Interaction':
      this.operationDetails.value.uiinter.uiinterSelected = this.UIInterSelected;
      this.operationDetails.value.uiinter.uiinterClickOptionSelected = this.UIInterClick;
      this._addScreenService.tempObj.numberOfSteps[this.id].stepData = this.operationDetails.value.uiinter;
      break;
      case 'Calculation':
      this.operationDetails.value.calculation.calcparam1 = this.param1;
      this.operationDetails.value.calculation.calcparam2 = this.param2;
      this._addScreenService.tempObj.numberOfSteps[this.id].stepData = this.operationDetails.value.calculation;
      break;
      default:
      break;
    }
    // console.log(this._addScreenService.tempObj);
  }
  
}
