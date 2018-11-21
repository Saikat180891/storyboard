import { Component, OnInit, Input } from '@angular/core';
import {ScreenHolderService} from '../screen-holder/screen-holder.service';
import {StepService} from '../add-steps-holder/steps/step.service';
import {AddScreenService} from './add-screen.service';

@Component({
  selector: 'app-add-screen',
  templateUrl: './add-screen.component.html',
  styleUrls: ['./add-screen.component.scss']
})
export class AddScreenComponent implements OnInit {
  @Input() headerPayload;

  currentScreenTitle;


  tasks = ['Operation', 'Condition', 'Loop'];

  constructor(private _screenHolderService: ScreenHolderService,
              private _stepService: StepService,
              private _addScreen: AddScreenService) { }

  ngOnInit() {
  }

  onSelect(task){

    if(task === 'Operation'){
      // this._addScreen.tempObj["screenDetails"] = {
      //   applicationName: this._screenHolderService.carousal[this._screenHolderService.currentScreen].get('applicationName'),
      //   screenName: this._screenHolderService.carousal[this._screenHolderService.currentScreen].get('screenName'),
      //   tabName: this._screenHolderService.carousal[this._screenHolderService.currentScreen].get('tabName')
      // };
      this._addScreen.tempObj["currentScreen"] = this._screenHolderService.currentScreen;
      this._screenHolderService.steps.push(this._addScreen.tempObj.numberOfSteps);
      // console.log(task,this._screenHolderService.carousal2[this._screenHolderService.currentScreen].steps);
      // this._screenHolderService.steps.push(1);
    }
    console.log(this._screenHolderService.steps)
    // console.log(this._screenHolderService.carousal2[this._screenHolderService.currentScreen].steps)
  }

}
