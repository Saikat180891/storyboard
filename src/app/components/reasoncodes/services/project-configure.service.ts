import { EventEmitter, Injectable, Output } from "@angular/core";
import { Sprint } from "../models/Sprint.model";
@Injectable({
  providedIn: "root",
})
export class ProjectConfigureService {
  private sprints: Sprint[] = [];
  @Output("saveEvent") saveEvent = new EventEmitter<string>();

  constructor() {}

  setSprints(sprintData: Sprint[]) {
    this.sprints = sprintData;
  }

  getSprints(): Sprint[] {
    return this.sprints;
  }

  addSprint(payload: Sprint) {
    this.sprints.push(payload);
  }

  updateSprint(sprintData: Sprint, sprintId: number) {
    this.sprints.forEach(sprint => {
      if (sprint.id === sprintId) {
        const sprintPosition = this.sprints.indexOf(sprint);
        this.sprints[sprintPosition] = sprintData;
      }
    });
  }

  deleteSprint(sprintIndex: number) {
    this.sprints.splice(sprintIndex, 1);
  }

  getSaveEvent() {
    return this.saveEvent;
  }
}
