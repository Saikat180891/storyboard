import { Component, Input, OnInit } from "@angular/core";
import { MatSelectChange } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../../projects/models/project.model";
import { ReasonCodeService } from "../../reasoncodes/reason-code.service";
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
    private pageService: PageService
  ) {}

  ngOnInit() {
    this.selectedUserStory = this.pageService.userStoryId;
  }

  onChange(event: MatSelectChange) {
    this.selectedUserStory = event.value;
    const navigateToChangedUserStroy = `/projects/${
      this.pageService.projectId
    }/userstory/${event.value}`;
    this.router.navigate([navigateToChangedUserStroy]);
  }

  getProjectId() {
    return this.project ? this.project.id : null;
  }

  getProjectTitle() {
    return this.project ? this.project.title : "";
  }
}
