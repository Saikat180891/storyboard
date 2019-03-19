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
import { BackdropComponent } from "./backdrop/backdrop.component";
import { CardComponent } from "./card/card.component";
import { ContainerComponent } from "./container/container.component";
import { ContainerService } from "./container/container.service";
import { CreateSopComponent } from "./create-sop/create-sop.component";

const routes: Routes = [{ path: "", component: ContainerComponent }];

@NgModule({
  declarations: [
    ContainerComponent,
    CardComponent,
    BackdropComponent,
    CreateSopComponent,
  ],
  imports: [CommonModule, GlobalmoduleModule, RouterModule.forChild(routes)],
  providers: [ContainerService, AppcontrolService],
})
export class ProjectsModule {}
