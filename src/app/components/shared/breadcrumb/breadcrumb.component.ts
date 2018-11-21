import { Component, OnInit } from '@angular/core';
import {AddScreenService} from '../add-screen/add-screen.service';
import {ScreenHolderService} from '../screen-holder/screen-holder.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private _addScreenService: AddScreenService,
              private _screenHolderService: ScreenHolderService) { }

  ngOnInit() {
  }

  onSaveChange(){
    // this._addScreenService.tempObj["currentScreen"] = this._screenHolderService.currentScreen;
    // this._screenHolderService.carousal2[this._screenHolderService.currentScreen]["steps"] = this._addScreenService.tempObj.numberOfSteps;
    console.log("This is the carousel service 2",this._screenHolderService.carousal2);
  }

}
