import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouteConfigLoadStart } from '@angular/router';

@Component({
  selector: 'colored-dropdown',
  templateUrl: './colored-dropdown.component.html',
  styleUrls: ['./colored-dropdown.component.scss']
})
export class ColoredDropdownComponent implements OnInit {

  isOpen: boolean = false;
  selected:string = '';
  selectedColor:string;
  applyPadding:boolean = false;

  @Output() optionSelected = new EventEmitter<string>();

  @Input('options') options:Array<string>;

  @Input('placeholder') placeholder;

  @Input('value') value;

  @Input('objectOptions') objectOptions;

  @Input('colors') colors:Array<string>;

  @Input('defaultOption') defaultOption:any;

  constructor() { }

  ngOnInit() {
  }

  onOpen(){
    this.isOpen = !this.isOpen;
  }

  onSelect(event, option){
    event.stopPropagation();
    this.selected = this.value = option;
    // let pos = this.options.indexOf(this.selected);
    // this.selectedColor = this.options[pos];
    this.applyPadding = true;
    console.log(this.applyPadding)
    this.optionSelected.emit(option);
    this.isOpen = false;
  }

  onSelectObj(event, option){
    event.stopPropagation();
    // this.selected = this.value = option;
    this.optionSelected.emit(option);
    this.isOpen = false;
  }

}
