import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { ProjectsPageService } from "../projects-page/projects-page.service";
import { ProjectCardService } from "./project-card.service";

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.scss"],
})
export class ProjectCardComponent implements OnInit, OnChanges {
  sopPermissions: any = [];
  @Input() cardData: any;
  @Output("deleteSop") deleteSop = new EventEmitter();
  @Output("grantedPermissions") grantedPermissions = new EventEmitter();
  @Output("openEditProject") openEditProject = new EventEmitter();

  //this is the color required by the material directive to give the ripple effect
  rippleColor = "rbga(0,0,0,0.2)";
  localData: any;
  id = "0";

  constructor(
    private _cardService: ProjectCardService,
    private _projectsPageService: ProjectsPageService
  ) {}

  /**
   * the initial values received from the Input is
   * initiated to the local variables also the
   * permission received for the projects page is and
   * is stored in the 'sopPermissions' variable
   */
  ngOnInit() {
    this.localData = this.cardData;
    this._cardService.cardContent = this.cardData;
    this.sopPermissions = this._projectsPageService.permissions;
  }

  ngOnChanges() {
    this.localData = this.cardData;
  }

  onPrevent(event: any) {
    event.stopPropagation();
  }

  /**
   * this function is used to open the edit dialog box with the data
   * of the projects and the permission required for authorization
   */
  onEdit(cardData: any) {
    this.openEditProject.emit({
      data: cardData,
      role: cardData.assignee[0].role,
      permissions: cardData.currentUserPermission,
      status: true,
    });
  }

  /**
   * this function is used to open the confirm deletion of projects
   */
  onDelete(localData) {
    this.deleteSop.emit({ id: localData.id, status: true });
  }
}
