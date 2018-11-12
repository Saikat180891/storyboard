import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  isOpen: boolean = false;
  selected:string = '';

  @Output() optionSelected = new EventEmitter<string>();

  @Input('options') options;

  @Input('placeholder') placeholder;

  constructor() { }

  ngOnInit() {
  }

  onOpen(){
    this.isOpen = !this.isOpen;
  }

  onSelect(event, option){
    event.stopPropagation();
    this.selected = option;
    this.optionSelected.emit(option);
    this.isOpen = false;
  }

}
