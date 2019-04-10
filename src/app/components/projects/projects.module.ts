/**
 * Author: Saikat Paul
 * Date: 12/02/2019
 * This is a lazy loaded module which is used to display all the created projects to the user
 * it also allows a user to edit, create, delete a project. The module also has the permission
 * directive which depending on the user's role, renders the UI.
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GlobalmoduleModule } from "../../module/globalmodule/globalmodule.module";
import { AppcontrolService } from "../../services/controlservice/appcontrol.service";
import { CreateProjectCardComponent } from "./create-project-card/create-project-card.component";
import { AssigneeCardComponent } from "./edit-project-dialog/assignee-card/assignee-card.component";
import { EditProjectDialogComponent } from "./edit-project-dialog/edit-project-dialog.component";
import { InviteUserFieldComponent } from "./invite-user-field/invite-user-field.component";
import { ProjectCardComponent } from "./project-card/project-card.component";
import { ProjectsPageComponent } from "./projects-page/projects-page.component";
import { ProjectsService } from "./projects.service";

const routes: Routes = [{ path: "", component: ProjectsPageComponent }];

@NgModule({
  declarations: [
    ProjectsPageComponent,
    ProjectCardComponent,
    CreateProjectCardComponent,
    EditProjectDialogComponent,
    AssigneeCardComponent,
    InviteUserFieldComponent,
  ],
  imports: [CommonModule, GlobalmoduleModule, RouterModule.forChild(routes)],
  providers: [ProjectsService, AppcontrolService],
})
export class ProjectsModule {}
