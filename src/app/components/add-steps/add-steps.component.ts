import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-steps',
  templateUrl: './add-steps.component.html',
  styleUrls: ['./add-steps.component.scss']
})
export class AddStepsComponent implements OnInit {

  applDetails = {
    applicationName: '',
    screenName: '',
    tabName: ''
  }

  constructor() { }

  ngOnInit() {
  }

  // payload.append('applicationName', this.applicationName);
  //     payload.append('screenName', this.screenName);
  //     payload.append('tabName', this.tabName);
  //     payload.append('screenImage', this.previewScreen);

  onReceivePayload(payload){
    this.applDetails = {
      applicationName: payload.get('applicationName'),
      screenName: payload.get('applicationName'),
      tabName: payload.get('tabName')
    }
    console.log( this.applDetails)
  }

}
