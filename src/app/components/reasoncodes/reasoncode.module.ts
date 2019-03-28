import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartsComponent } from "./charts/charts.component";
import { ExportDialogBoxComponent } from "./export-dialog-box/export-dialog-box.component";
import { ProjectConfigComponent } from "./project-config/project-config.component";
import { ReasoncodesComponent } from "./reasoncodes.component";
import { ColoredDropdownComponent } from "./shared/colored-dropdown/colored-dropdown.component";
import { NormalDropdownComponent } from "./shared/normal-dropdown/normal-dropdown.component";
import { UserstoryCardCreateComponent } from "./userstory-card-create/userstory-card-create.component";
import { UserstoryCardEditComponent } from "./userstory-card-edit/userstory-card-edit.component";
import { UserstoryCardComponent } from "./userstory-card/userstory-card.component";
import { UserstoryFilterComponent } from "./userstory-filter/userstory-filter.component";

import { RouterModule, Routes } from "@angular/router";
import { NvD3Module } from "ng2-nvd3";

import { GlobalmoduleModule } from "../../module/globalmodule/globalmodule.module";
import { EpicsComponent } from "./epics/epics.component";
import { ImportStoriesComponent } from "./import-stories/import-stories.component";
import { ModalFooterComponent } from "./modal-footer/modal-footer.component";
import { SprintConfigureComponent } from "./sprint-configure/sprint-configure.component";
import { SprintInputRowComponent } from "./sprint-input-row/sprint-input-row.component";

import { EpicComponent } from "./epic/epic.component";
import { ProjectConfigBaseComponent } from "./project-config-base/project-config-base.component";
import { ProjectHeaderTitleComponent } from "./project-header-title/project-header-title.component";
import { ProjectConfigureService } from "./services/project-configure.service";
import { SortComponent } from "./sort/sort.component";

const routes: Routes = [{ path: "", component: ReasoncodesComponent }];

@NgModule({
  declarations: [
    ReasoncodesComponent,
    UserstoryCardComponent,
    ProjectConfigComponent,
    UserstoryCardCreateComponent,
    UserstoryCardEditComponent,
    UserstoryFilterComponent,
    ExportDialogBoxComponent,
    ChartsComponent,
    ColoredDropdownComponent,
    NormalDropdownComponent,
    ImportStoriesComponent,
    ModalFooterComponent,
    EpicsComponent,
    SprintConfigureComponent,
    SprintInputRowComponent,
    ProjectConfigBaseComponent,
    EpicComponent,
    SortComponent,
    ProjectHeaderTitleComponent,
  ],
  imports: [
    CommonModule,
    GlobalmoduleModule,
    NvD3Module,
    RouterModule.forChild(routes),
  ],
  providers: [ProjectConfigureService],
})
export class ReasoncodeModule {}
