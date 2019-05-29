import { BehaviorSubject, combineLatest, forkJoin, Observable } from "rxjs";
import { DownloadFileType } from "../export-to-word-modal/export-to-word-modal.component";
import { Epics } from "../models/Epics.model";
import { ServerUserstory } from "../models/Userstory.model";
import {
  DownloadableEpics,
  DownloadableUserstories,
  Export,
} from "./export-sop-as-word.component";

export function getIdsOfDownloadableEpicsAndUserstories(
  args: DownloadableEpics[]
): Export {
  const epics = [];
  const userstories = [];
  let tempEpicId: number;
  args.forEach(epic => {
    if (epic.selected) {
      epics.push(epic.epicId);
      epic.userstories.forEach(userstory => {
        if (userstory.selected) {
          userstories.push(userstory.userstoryId);
        }
      });
    } else {
      tempEpicId = epic.epicId;
      let flag = false;
      epic.userstories.forEach(userstory => {
        if (userstory.selected) {
          flag = true;
          userstories.push(userstory.userstoryId);
        }
      });
      if (flag) {
        epics.push(tempEpicId);
      }
    }
  });
  return {
    epics: epics.join(","),
    userstories: userstories.join(","),
    type: DownloadFileType.EXPORT,
    includeAttachment: false,
  };
}

export function createDownloadableEpicsAndUserstories(
  epicsObservable: Observable<Epics[]>,
  userstoriesObservable: Observable<ServerUserstory[]>
): DownloadableEpics[] {
  const downloadableEpics: DownloadableEpics[] = [];

  combineLatest([epicsObservable, userstoriesObservable]).subscribe(
    responseList => {
      if (responseList[0] && responseList[1]) {
        responseList[0].forEach(epic => {
          const tempEpic: DownloadableEpics = {
            epicName: epic.name,
            epicId: epic.id,
            selected: false,
            userstories: [],
          };
          responseList[1].forEach(userstory => {
            if (userstory.rc_id === epic.id) {
              const tempUserstory: DownloadableUserstories = {
                userstoryName: userstory.us_name,
                userstoryId: userstory.id,
                selected: false,
              };
              tempEpic.userstories.push(tempUserstory);
            }
          });
          downloadableEpics.push(tempEpic);
        });
      }
    }
  );

  return downloadableEpics;
}
