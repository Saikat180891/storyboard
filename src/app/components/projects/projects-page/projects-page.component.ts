import { AfterViewChecked, Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmModalService } from "../../shared/confirm-modal/confirm-modal.service";
import { ProjectDisplay } from "../models/project.model";
import { ProjectsService } from "../projects.service";

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
  projectData: any;
  projectRole: any;

  constructor(
    public projectsService: ProjectsService,
    private spinner: NgxSpinnerService,
    private confirm: ConfirmModalService
  ) {}

  ngOnInit() {
    /**
     * Fetch data to load the cards
     */
    this.getListOfAllProjects();
    this.refreshProjectsList();
  }

  ngAfterViewChecked() {}

  refreshProjectsList() {
    this.projectsService.getProjectPageNeedsRefresh().subscribe(res => {
      if (res) {
        this.getListOfAllProjects();
      }
    });
  }
  /**
   * fetch all projects and permission and combine both of them
   */
  getListOfAllProjects(): void {
    this.spinner.show();
    this.projectsService.getProjectsDisplayList().subscribe(
      (res: ProjectDisplay[]) => {
        this.projectsService.cardContents = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
      }
    );
  }

  onEditProject($event: any, index: number): void {
    this.projectData = $event.data;
    this.projectRole = $event.role;
    this.openEditProjectDialogBox = $event.status;
  }

  onEditProjectClose(): void {
    this.openEditProjectDialogBox = false;
    this.openCreateProjectDialogBox = false;
    this.getListOfAllProjects();
  }

  onDeleteSop($event): void {
    this.confirm.confirmDelete(
      "Are you sure you want to delete this SOP? All the associated sprints and user stories will be deleted.",
      () => {
        this.projectsService.deleteProject($event.id);
      },
      () => {}
    );
  }

  givenPermissions(permissions): void {
    this.permissionsGrantedForBackdrop = permissions;
  }

  onCreateProject($event): void {
    this.openCreateProjectDialogBox = true;
  }
}
