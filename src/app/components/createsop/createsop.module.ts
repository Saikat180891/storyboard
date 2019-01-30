import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';

// import { CreatesopRoutingModule } from './createsop-routing.module';
import { CreatesopComponent } from './createsop/createsop.component';
import { Route, Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecentScreenShotsComponent } from './recent-screen-shots/recent-screen-shots.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { OperationsBarComponent } from './operations-bar/operations-bar.component';
import { SidebarButtonsComponent } from './sidebar-buttons/sidebar-buttons.component';


const routes: Routes = [
  { path: '', component: CreatesopComponent }
];
@NgModule({
  declarations: [CreatesopComponent, SidebarComponent, RecentScreenShotsComponent, LeftPanelComponent, RightPanelComponent, OperationsBarComponent, SidebarButtonsComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule.forChild(routes)
    // CreatesopRoutingModule
  ],
})
export class CreatesopModule { 

  constructor(){ 
    console.log('KJKKKJJKJK')
  }
}
