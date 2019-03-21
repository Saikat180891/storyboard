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
import { CreateProjectComponent } from "./create-project/create-project.component";
import { EditProjectComponent } from "./edit-project/edit-project.component";
import { ProjectCardComponent } from "./project-card/project-card.component";
import { ProjectsPageComponent } from "./projects-page/projects-page.component";
import { ProjectsPageService } from "./projects-page/projects-page.service";

const routes: Routes = [{ path: "", component: ProjectsPageComponent }];

@NgModule({
  declarations: [
    ProjectsPageComponent,
    ProjectCardComponent,
    EditProjectComponent,
    CreateProjectComponent,
  ],
  imports: [CommonModule, GlobalmoduleModule, RouterModule.forChild(routes)],
  providers: [ProjectsPageService, AppcontrolService],
})
export class ProjectsModule {}
