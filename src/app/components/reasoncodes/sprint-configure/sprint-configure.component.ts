import { Component } from "@angular/core";
import { ProjectConfigBaseComponent } from "../project-config-base/project-config-base.component";

@Component({
  selector: "app-sprint-configure",
  templateUrl: "./sprint-configure.component.html",
  styleUrls: ["./sprint-configure.component.scss"],
})
export class SprintConfigureComponent extends ProjectConfigBaseComponent {
  onSave() {
    this.saveSprints();
    this.projectConfigureService.saveEvent.emit("epic");
    this.onClose();
  }
}
