import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-export-to-sop',
  templateUrl: './export-to-sop.component.html',
  styleUrls: ['./export-to-sop.component.scss']
})
export class ExportToSopComponent implements OnInit {
  @Output('close') close = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onCloseExportModal(){
    this.close.emit(false);
  }
}
