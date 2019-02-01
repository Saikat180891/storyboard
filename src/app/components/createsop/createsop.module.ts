import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
// import { CreatesopRoutingModule } from './createsop-routing.module';
import { CreatesopComponent } from './createsop/createsop.component';
import { Route, Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecentScreenShotsComponent } from './recent-screen-shots/recent-screen-shots.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { OperationsBarComponent } from './operations-bar/operations-bar.component';
import { SidebarButtonsComponent } from './sidebar-buttons/sidebar-buttons.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';


const routes: Routes = [
  { path: '', component: CreatesopComponent }
];
@NgModule({
  declarations: [CreatesopComponent, SidebarComponent, RecentScreenShotsComponent, LeftPanelComponent, RightPanelComponent, OperationsBarComponent, SidebarButtonsComponent, VideoGalleryComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatTabsModule,
    MatSliderModule,
    RouterModule.forChild(routes)
    // CreatesopRoutingModule
  ],
})
export class CreatesopModule { 

  constructor(){ 
    console.log('KJKKKJJKJK')
  }
}
