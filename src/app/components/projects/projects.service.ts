import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { forkJoin } from "rxjs/observable/forkJoin";
import { map } from "rxjs/operators";
import { DataService } from "../../data.service";
import { Assignee } from "./models/assignee.model";
import { InviteUser } from "./models/invite-user.model";
import {
  ProjectPermissions,
  projectPermissionsAdapter,
  ServerProjectPermissions,
} from "./models/permissions.model";
import {
  Project,
  projectAdapter,
  ProjectDisplay,
  ServerProject,
} from "./models/project.model";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  permissions = []; // TODO this might be unused - we should see if we can remove it
  constructor(private dataService: DataService) {}

  cardContents: ProjectDisplay[] = [];
  lastNumber: number = 0;
  // the color palette
  colorPicker: string[] = [
    "#0033A1",
    "#2A7DE1",
    "#40C0C4",
    "#54585A",
    "#8677C4",
    "#94BEF0",
  ];

  private projectRefresh = new BehaviorSubject<boolean>(false);

  setProjectPageNeedsRefresh(value: boolean) {
    this.projectRefresh.next(value);
  }

  getProjectPageNeedsRefresh() {
    return this.projectRefresh;
  }

  getProjectsList(): Observable<Project[]> {
    return this.dataService.fetchData(`/sop.json`).pipe(
      map((response: ServerProject[]) => {
        return response.map(projectResponse => projectAdapter(projectResponse));
      })
    );
  }

  getPermissions(): Observable<ProjectPermissions[]> {
    return this.dataService.getPermission(1).pipe(
      map((response: ServerProjectPermissions[]) => {
        return response.map(permissionsResponse =>
          projectPermissionsAdapter(permissionsResponse)
        );
      })
    );
  }

  getProjectsDisplayList(): Observable<ProjectDisplay[]> {
    const allProjectsObservable = this.getProjectsList();
    const allPermissionsObservable = this.getPermissions();

    return forkJoin([allProjectsObservable, allPermissionsObservable]).pipe(
      map(results => {
        const allProjects = results[0];
        const allPermissions = results[1];
        return allProjects.map(project => {
          const permissions = allPermissions.find(
            permissions => permissions.projectId === project.id
          );
          return {
            ...project,
            permissions,
            currentUserPermission: permissions.permissions, // TODO refactor out currentUserPermission
            themeColor: this.colorPicker[this.getUniqueNumber()],
          };
        });
      })
    );
  }

  createProject(data: FormData) {
    // TODO FormData should be more specific
    return this.dataService.postData("/sop.json", data);
  }

  updateProject(id: number, data: FormData) {
    // TODO FormData should be more specific
    return this.dataService.update("/sop", `${id}.json`, data);
  }

  deleteProject(id: number): void {
    this.dataService.delete("/sop", `${id}.json`).subscribe(response => {
      const projectCardIndex = this.cardContents.findIndex(
        project => project.id === id
      );
      this.cardContents.splice(projectCardIndex, 1);
    });
  }

  createAssignee(projectId: number, assigneeList: Assignee[]): Observable<any> {
    const assigneePayLoad = assigneeList.map(assignee => {
      return {
        user_id: assignee.id,
        role: assignee.role,
      };
    });

    return this.dataService.postData(
      `/projects/${projectId}/assignees.json`,
      assigneePayLoad
    );
  }

  updateAssignee(projectId: number, assigneeList: Assignee[]): Observable<any> {
    return this.dataService.updatePost(
      `/projects/${projectId}/assignees.json`,
      assigneeList
    );
  }

  deleteAssignee(projectId: number, idList: number[]): Observable<any> {
    const ids = idList.join(",");
    return this.dataService.deleteList(
      `/projects/${projectId}/assignees.json?ids=`,
      ids
    );
  }

  inviteUser(projectId: number, invitee: InviteUser): Observable<any> {
    // TODO probably want an adapter for model -> request as well
    return this.dataService.postData("/invite_users/", {
      first_name: invitee.firstName,
      email: invitee.email,
      last_name: invitee.lastName,
      role: invitee.role,
      sop: projectId,
    });
  }

  getUniqueNumber(): number {
    /**
     * this function is used to gernerate a number which is used to select colors
     * from the 'colorPicker' array list
     */
    this.lastNumber += 1;
    if (this.lastNumber === 5) {
      this.lastNumber = 0;
    }
    return this.lastNumber;
  }

  /**
   * Return details of all the projects
   */
  getProjects(): ProjectDisplay[] {
    return this.cardContents;
  }
}
