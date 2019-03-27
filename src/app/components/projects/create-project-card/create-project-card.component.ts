import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-create-project-card",
  templateUrl: "./create-project-card.component.html",
  styleUrls: [
    "./create-project-card.component.scss",
    "../project-card/project-card.component.scss",
  ],
})
export class CreateProjectCardComponent implements OnInit {
  @Output("openCreateProject") openCreateProject = new EventEmitter();

  // this is the color required by the material directive to give the ripple effect
  rippleColor = "rbga(0,0,0,0.2)";

  constructor() {}

  ngOnInit() {}

  /**
   * this function open the create project dialog box when
   * the user clicks on the create project card
   */
  onCreateProject(): void {
    this.openCreateProject.emit(true);
  }
}
