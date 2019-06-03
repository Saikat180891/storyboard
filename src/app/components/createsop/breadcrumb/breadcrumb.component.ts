import { Component, Input, OnInit } from "@angular/core";
import { MatSelectChange } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../../projects/models/project.model";
import { ReasonCodeService } from "../../reasoncodes/reason-code.service";
import { LeftPanelService } from "../services/left-panel/left-panel.service";
import { PageService } from "../services/page/page.service";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnInit {
  @Input("project") project: Project;
  @Input("listOfUserStories") listOfUserStories: [];
  selectedUserStory: number;

  constructor(
    private reasonCodeService: ReasonCodeService,
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService,
    private leftPanelService: LeftPanelService
  ) {}

  ngOnInit() {
    this.selectedUserStory = this.pageService.userStoryId;
  }

  onProjectNameClick() {
    const navigateToProject = `/projects/${this.getProjectId()}`;
    this.leftPanelService.setCurrentActiveStepId(null);
    this.router.navigate([navigateToProject]);
  }

  onChange(event: MatSelectChange) {
    this.selectedUserStory = event.value;
    const navigateToChangedUserStroy = `/projects/${
      this.pageService.projectId
    }/userstory/${event.value}`;
    this.leftPanelService.setCurrentActiveStepId(null);
    this.router.navigate([navigateToChangedUserStroy]);
  }

  getProjectId() {
    return this.project ? this.project.id : null;
  }

  getProjectTitle() {
    return this.project ? this.project.title : "";
  }
}
