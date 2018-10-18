import { Component, OnInit, HostListener } from '@angular/core';


export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
  ENTER = 13
}


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  selectedValue = '';
  expandDropdown: boolean = false;
  options = ["Option 1", "Option 2", "Option 3"];

  constructor() { }

  ngOnInit() {
  }

  @HostListener('document:keyup.escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event)
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.expandDropdown = false;
    } 
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    //console.log(event)
    // if (event.keyCode === KEY_CODE.ESCAPE) {
    //   this.expandDropdown = false;
    // } 

    //1150 - 1320
    //120 - 275
    let sreenXStart = 1150;
    let screenXEnd = 1320;
    let screenYStart = 120;
    let screenYEnd = 275;
    if(event.screenX > sreenXStart && event.screenX < screenXEnd && event.screenY > screenYStart && event.screenY < screenYEnd){
      console.log("Clicked on the dropdown")
    }else{
      this.expandDropdown = false;
    }
    
  }

  onClickDropdown(){
    this.expandDropdown = !this.expandDropdown;
  }

  onSelect(option){
    this.selectedValue = option;
    this.expandDropdown = false;
  }

}
