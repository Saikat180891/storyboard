import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {UicontrolService} from '../services/uicontrol.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private __uic:UicontrolService) { }

  ngOnInit() {
  }

}
