import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'export-dialog-box',
  templateUrl: './export-dialog-box.component.html',
  styleUrls: ['./export-dialog-box.component.scss']
})
export class ExportDialogBoxComponent implements OnInit {

  sidebarLinks = ['User stories', 'Audit Trail'];
  linkSelected:number = 0;

  constructor() { }

  ngOnInit() {
  }

  onSelect(i){
    this.linkSelected = i;
  }

}
