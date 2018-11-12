import { Component, OnInit, Input } from '@angular/core';
import {ScreenHolderService} from '../screen-holder/screen-holder.service';

@Component({
  selector: 'app-add-screen',
  templateUrl: './add-screen.component.html',
  styleUrls: ['./add-screen.component.scss']
})
export class AddScreenComponent implements OnInit {
  @Input() headerPayload;

  currentScreenTitle;

  tempObj = {};

  tasks = ['Operation', 'Condition', 'Loop'];

  constructor(private _screenHolderService: ScreenHolderService) { }

  ngOnInit() {
  }

  onSelect(task){
    console.log(this._screenHolderService.currentScreen);
    this.currentScreenTitle = this._screenHolderService.carousal[this._screenHolderService.currentScreen].get('applicationName') + '_' + 
                              this._screenHolderService.carousal[this._screenHolderService.currentScreen].get('screenName')      + '_' +
                              this._screenHolderService.carousal[this._screenHolderService.currentScreen].get('tabName');
    if(task === 'Operation'){
      console.log(this.currentScreenTitle);
      this.tempObj["title"] = this.currentScreenTitle+'_'+task;
      this.tempObj["currentScreen"] = this._screenHolderService.currentScreen;
      console.log(this.tempObj)
      this._screenHolderService.steps.push(this.tempObj);
    }
  }

}
