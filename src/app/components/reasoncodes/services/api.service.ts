import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { DataService } from "../../../data.service";
import { AutocompleteOption } from "../../shared/autocomplete/AutocompleteOption.model";
import { getEpic, ServerEpic } from "../models/Epics.model";
import { ServerAutocomplete } from "../models/Serverassignee.model";
import { Sprint, SprintAdapter, SprintBackend } from "../models/Sprint.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private api: DataService) {}

  getSprint(sopId: number): Observable<Sprint[]> {
    const endpoint = `/sop/${sopId}/sprint.json`;
    return this.api.get(endpoint).pipe(
      map((res: Array<any>) => {
        return res.map(element => {
          const adapter = new SprintAdapter(element);
          return adapter.getSprints();
        });
      })
    );
  }

  getEpics(projectId: number) {
    const endpoint = `/sop/${projectId}/epics.json`;
    return this.api.get(endpoint).pipe(
      map(epics => {
        return epics.map((epic: ServerEpic) => {
          return getEpic(epic);
        });
      })
    );
  }

  getBenefitsChart(projectId: number): string {
    return `${
      this.api.apiUrl
    }/sop/epics/charts/${projectId}/benefits_realization.png?q=${new Date().getTime()}`;
  }

  deleteSprint(sopId: number): Observable<any> {
    const endpoint = `/sop/sprint/${sopId}.json`;
    return this.api.deleteValue(endpoint);
  }

  createSprint(sopId: number, payload: SprintBackend): Observable<Sprint> {
    const endpoint = `/sop/${sopId}/sprint.json`;
    return this.api.postData(endpoint, payload).pipe(
      map((res: Array<any>) => {
        const adapter = new SprintAdapter(res);
        return adapter.getSprints();
      })
    );
  }

  createUserstory(
    projectId: number,
    sprintID: number,
    epicId: number,
    assigneeId: number = 0,
    payload: any
  ): Observable<any> {
    const endpoint = `/api/v1/projects/${projectId}/epics/${epicId}/sprints/${sprintID}/userstories/assignees/${assigneeId ||
      0}.json`;
    return this.api.postData(endpoint, payload);
  }

  editUserstory(
    userstoryId: number,
    sprintID: number,
    epicId: number,
    assigneeId: number,
    payload: any
  ): Observable<any> {
    const endpoint = `/api/v1/projects/epics/${epicId}/sprints/${sprintID}/userstories/${userstoryId}/assignees/${assigneeId}.json`;
    return this.api.updatePost(endpoint, payload);
  }

  editSprint(sprintId: number, payload: SprintBackend): Observable<Sprint> {
    const endpoint = `/sop/sprint/${sprintId}.json`;
    return this.api.updatePost(endpoint, payload).pipe(
      map((res: Array<any>) => {
        const adapter = new SprintAdapter(res);
        return adapter.getSprints();
      })
    );
  }

  getAssigneeList(
    projectId: number,
    query: string
  ): Observable<AutocompleteOption[]> {
    const endpoint = `/projects/${projectId}/assignees/filter.json?filter=${query}`;
    return this.api.get(endpoint).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((assignees: ServerAutocomplete[]) =>
        assignees.map(assignee => {
          return {
            label: assignee.user,
            value: assignee.id,
          };
        })
      )
    );
  }

  downloadExportToSop(
    projectId: number,
    listOfEpics: string,
    listOfUserstories: string
  ): Observable<any> {
    const endpoint = `${
      this.api.apiUrl
    }/projects/${projectId}/generate_sop.json?epic_id=${listOfEpics}&us_id=${listOfUserstories}`;
    return this.api.downloadFile(endpoint);
  }
}
