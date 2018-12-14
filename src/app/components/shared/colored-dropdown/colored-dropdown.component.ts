import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { RouteConfigLoadStart } from '@angular/router';
interface Option{
  status: string;
  color: string;
}
@Component({
  selector: 'colored-dropdown',
  templateUrl: './colored-dropdown.component.html',
  styleUrls: ['./colored-dropdown.component.scss']
})
export class ColoredDropdownComponent implements OnInit, AfterViewInit {

  isOpen: boolean = false;
  selected:string = '';
  selectedColor:string;
  applyPadding:boolean = false;

  @Output() optionSelected = new EventEmitter<string>();

  @Input('options') options:Option[];

  @Input('placeholder') placeholder;

  @Input('value') value;

  @Input('objectOptions') objectOptions;

  @Input('colors') colors:Array<string>;

  @Input('defaultOption') defaultOption:any;

  constructor() { }

  ngOnInit() {
    this.changeColorofDefaultOption();
  }

  ngAfterViewInit(){
    
  }

  changeColorofDefaultOption(){
    this.options.forEach(element=>{
      if(element.status === this.defaultOption){
        this.selectedColor = element.color;
        console.log(element)
      }
    });
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
