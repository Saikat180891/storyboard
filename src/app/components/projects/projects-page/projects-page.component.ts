import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  OnChanges,
  OnInit,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { DataService } from "../../../data.service";
import { AuthorizationService } from "../../../services/authorization/authorization.service";
import { AppcontrolService } from "../../../services/controlservice/appcontrol.service";
import { UtilsService } from "../../../utils.service";
import { ProjectsPageService } from "./projects-page.service";

@Component({
  selector: "app-projects-page",
  templateUrl: "./projects-page.component.html",
  styleUrls: [
    "./projects-page.component.scss",
    "../../reasoncodes/completed-warning.scss",
  ],
})
export class ProjectsPageComponent implements OnInit, AfterViewChecked {
  userPermissions = [];
  openCreateProjectDialogBox: boolean = false;
  openEditProjectDialogBox: boolean = false;
  permissionsGrantedForBackdrop: any;
  warningToDeleteSop: boolean = false;
  sopIdToDelete: number;
  projectData: any;
  projectRole: any;

  constructor(
    private _dataService: DataService,
    private __uic: AppcontrolService,
    private _projectsPageService: ProjectsPageService,
    private __spinner: NgxSpinnerService,
    private __authorization: AuthorizationService,
    private __utils: UtilsService
  ) {}

  ngOnInit() {
    /**
     * Fetch data to load the cards
     */
    this.getListOfAllProjects();
  }

  ngAfterViewChecked() {}
  /**
   * fetch all projects and permission and combine both of them
   */
  getListOfAllProjects() {
    this.__spinner.show();
    const projectlist: any = [];
    const permissions = [];
    // make an api call to fetch the project list
    this._projectsPageService.getListOfAllProjects().subscribe(
      res => {
        // rearrange the project list as required for the frontend
        res.forEach(element => {
          projectlist.push({
            themeColor: this.__uic.colorPicker[
              this._projectsPageService.getUniqueNumber()
            ],
            reasonCodes: this.__uic.firstZero(Number(element["number_epics"])),
            ...element,
            logo: element["logo_url"],
            due_date: this.__utils.formatDateToUS(element["due_date"]),
          });
        });
      },
      err => {
        this.__spinner.hide();
      },
      () => {
        // once the above call the completed make another call to get the permissions dictionary
        this._dataService.getPermission(1).subscribe(
          res => {
            //rearrange as required for the frontend
            res.forEach(ele => {
              permissions.push({
                projectId: ele["proj_id"],
                role: ele["name"],
                permissions: ele["permissions"],
              });
            });
          },
          err => {
            this.__spinner.hide();
          },
          () => {
            // combine the list of projects and the list of permission with respect to their respective ids
            projectlist.forEach((project, projectIndex) => {
              permissions.forEach((projectPermission, permissionIndex) => {
                if (project.id == projectPermission.projectId) {
                  project["currentUserPermission"] =
                    projectPermission["permissions"];
                  project[
                    "permissionsGranted"
                  ] = this.__authorization.createPermissionAsPerUserRole(
                    projectPermission["role"]
                  );
                }
              });
            });
            this._projectsPageService.cardContents = projectlist;
            this.__spinner.hide();
          }
        );
      }
    );
  }

  onEditProject($event: any, index: number) {
    this.projectData = $event.data;
    this.projectRole = $event.role;
    this.openEditProjectDialogBox = $event.status;
  }

  onEditProjectClose() {
    this.openEditProjectDialogBox = false;
    this.openCreateProjectDialogBox = false;
    this.getListOfAllProjects();
  }

  onDeleteSop($event) {
    this.warningToDeleteSop = $event.status;
    this.sopIdToDelete = $event.id;
  }

  onSelectDoNotDeleteSop() {
    this.warningToDeleteSop = false;
  }
  /**
   * Delete project
   */
  onSelectDeleteSop() {
    this._dataService
      .delete("/sop", this.sopIdToDelete + ".json")
      .subscribe(response => {
        this._projectsPageService.cardContents.forEach((element, index) => {
          if (element.id == this.sopIdToDelete) {
            this._projectsPageService.cardContents.splice(index, 1);
            this.warningToDeleteSop = false;
          }
        });
      });
  }

  givenPermissions(permissions) {
    this.permissionsGrantedForBackdrop = permissions;
  }

  onCreateProject($event) {
    this.openCreateProjectDialogBox = true;
  }
}
