import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { Epics } from "../models/Epics.model";
import { Sprint } from "../models/Sprint.model";
import { ClientUserstory } from "../models/Userstory.model";
import { UserstoryCreateEditModalComponent } from "./userstory-create-edit-modal.component";

@Injectable({
  providedIn: "root",
})
export class UserstoryCreateEditModalService {
  constructor(public dialog: MatDialog) {}

  openDialog(
    projectId: number,
    modalName: string,
    sprints: Sprint[],
    epics: Epics[],
    userstoryData?: ClientUserstory
  ): Observable<any> {
    const dialogRef = this.dialog.open(UserstoryCreateEditModalComponent, {
      data: {
        projectId,
        modalName,
        sprints: sprints.length ? sprints : [],
        epics: epics.length ? epics : [],
        userStoryData: userstoryData,
      },
    });

    return dialogRef.afterClosed();
  }
}
