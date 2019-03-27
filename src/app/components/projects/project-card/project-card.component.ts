import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { ProjectDisplay } from "../models/project.model";
import { ProjectsService } from "../projects.service";
import { ProjectCardService } from "./project-card.service";

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.scss"],
})
export class ProjectCardComponent implements OnInit, OnChanges {
  sopPermissions: any = [];
  @Input() cardData: ProjectDisplay;
  @Output("deleteSop") deleteSop = new EventEmitter();
  @Output("grantedPermissions") grantedPermissions = new EventEmitter();
  @Output("openEditProject") openEditProject = new EventEmitter();

  // this is the color required by the material directive to give the ripple effect
  rippleColor = "rbga(0,0,0,0.2)";
  localData: ProjectDisplay;
  id = "0";

  constructor(
    private cardService: ProjectCardService,
    private projectsService: ProjectsService
  ) {}

  /**
   * the initial values received from the Input is
   * initiated to the local variables also the
   * permission received for the projects page is and
   * is stored in the 'sopPermissions' variable
   */
  ngOnInit() {
    this.localData = this.cardData;
    this.cardService.cardContent = this.cardData;
    this.sopPermissions = this.projectsService.permissions;
  }

  ngOnChanges() {
    this.localData = this.cardData;
  }

  onPrevent(event: Event): void {
    event.stopPropagation();
  }

  /**
   * this function is used to open the edit dialog box with the data
   * of the projects and the permission required for authorization
   */
  onEdit(cardData: ProjectDisplay): void {
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
  onDelete(localData: ProjectDisplay): void {
    this.deleteSop.emit({ id: localData.id, status: true });
  }
}
