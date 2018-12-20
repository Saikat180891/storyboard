import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class ColoredDropdownComponent implements OnInit, AfterViewInit, OnChanges {

  isOpen: boolean = false;
  selected:any = '';
  selectedColor:string;
  applyPadding:boolean = false;

  @Output() optionSelected = new EventEmitter<string>();

  @Input('options') options:Option[];

  @Input('placeholder') placeholder;

  @Input('value') value:Option;

  @Input('objectOptions') objectOptions;

  @Input('colors') colors:Array<string>;

  @Input('defaultOption') defaultOption:any;

  constructor() { }

  ngOnInit() {
    this.changeColorofDefaultOption();
  }

  ngAfterViewInit(){
    
  }

  ngOnChanges(changes: SimpleChanges){
    // this.value.status = changes.defaultOption.currentValue;
    console.log(changes);
  }

  changeColorofDefaultOption(){
    this.options.forEach(element=>{
      if(element.status === this.defaultOption){
        // this.selectedColor = element.color;
        // console.log(element)
        let pos = this.options.indexOf(element);
        this.selected = this.value = this.options[pos];

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
