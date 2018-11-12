import { Component, OnInit } from '@angular/core';
import {ScreenHolderService} from '../screen-holder/screen-holder.service';

@Component({
  selector: 'app-add-steps-holder',
  templateUrl: './add-steps-holder.component.html',
  styleUrls: ['./add-steps-holder.component.scss']
})
export class AddStepsHolderComponent implements OnInit {

  constructor(private _screenHolderService: ScreenHolderService) { }

  ngOnInit() {
    console.log(this._screenHolderService.steps)
  }

}
