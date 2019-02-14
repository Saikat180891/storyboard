import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  //this variable is used to control the display of the mat-progress-bar
  loading:boolean = false;
  constructor() { }

}
