import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-header-title',
  templateUrl: './project-header-title.component.html',
  styleUrls: ['./project-header-title.component.scss']
})
export class ProjectHeaderTitleComponent implements OnInit {
  @Input('projectTitle') projectTitle:any;

  constructor() { }

  ngOnInit() {
  }

}
