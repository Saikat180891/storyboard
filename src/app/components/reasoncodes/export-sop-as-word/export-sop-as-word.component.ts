import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatCheckboxChange } from "@angular/material";
import { getIdsOfDownloadableEpicsAndUserstories } from "./export-sop-as-word.helpers";

export interface DownloadableUserstories {
  userstoryName: string;
  userstoryId: number;
  selected: boolean;
}

export interface DownloadableEpics {
  epicName: string;
  epicId: number;
  selected: boolean;
  userstories: DownloadableUserstories[];
}

export interface Export {
  epics: string;
  userstories: string;
  type: string;
}

@Component({
  selector: "app-export-sop-as-word",
  templateUrl: "./export-sop-as-word.component.html",
  styleUrls: ["./export-sop-as-word.component.scss"],
})
export class ExportSopAsWordComponent implements OnInit {
  @Input("chapters") downloadableEpics: DownloadableEpics[];
  @Output("close") close = new EventEmitter<boolean>();
  @Output("export") export = new EventEmitter<Export>();
  selectAll: boolean = false;

  constructor() {}

  ngOnInit() {}

  onExport(): void {
    const payload = getIdsOfDownloadableEpicsAndUserstories(
      this.downloadableEpics
    );
    if (payload.epics && payload.userstories) {
      this.export.emit(payload);
    } else {
      alert("Please choose an epic or userstory to export.");
    }
  }

  onSelectAllChange($event: MatCheckboxChange): void {
    this.selectAll = $event.checked;
    if ($event.checked) {
      this.selectAllEpicsAndUserstories(true);
    } else {
      this.selectAllEpicsAndUserstories(false);
    }
  }

  onEpicsSelectionChange($event: MatCheckboxChange, index: number): void {
    if ($event.checked) {
      this.selectAllUserstoriesUnderEpic(index, true);
      this.toggleSelectAll();
    } else {
      this.selectAllUserstoriesUnderEpic(index, false);
      this.toggleSelectAll();
    }
  }

  onUserstorySelectionChange(
    $event: MatCheckboxChange,
    epicIndex: number,
    userstoryIndex: number
  ): void {
    this.downloadableEpics[epicIndex].userstories[userstoryIndex].selected =
      $event.checked;
    if (this.isAllUserstoriesSelected(epicIndex)) {
      this.downloadableEpics[epicIndex].selected = true;
      this.toggleSelectAll();
    } else {
      this.downloadableEpics[epicIndex].selected = false;
      this.toggleSelectAll();
    }
  }

  toggleSelectAll(): void {
    if (this.isAllEpicsSelected()) {
      this.selectAll = true;
    } else {
      this.selectAll = false;
    }
  }

  isAllEpicsSelected(): boolean {
    return (
      this.downloadableEpics.length ===
      this.downloadableEpics.filter(epic => {
        return epic.selected;
      }).length
    );
  }

  isAllUserstoriesSelected(index: number): boolean {
    return (
      this.downloadableEpics[index].userstories.length ===
      this.downloadableEpics[index].userstories.filter(userstory => {
        return userstory.selected;
      }).length
    );
  }

  selectAllEpicsAndUserstories(selection: boolean): void {
    this.downloadableEpics.forEach(epic => {
      epic.selected = selection;
      epic.userstories.forEach(userstory => {
        userstory.selected = selection;
      });
    });
  }

  selectAllUserstoriesUnderEpic(index: number, selection: boolean): void {
    this.downloadableEpics[index].selected = selection;
    this.downloadableEpics[index].userstories.forEach(userstory => {
      userstory.selected = selection;
    });
  }

  onClose(): void {
    this.close.emit(false);
  }
}
