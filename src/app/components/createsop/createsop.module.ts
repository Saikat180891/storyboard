import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { GlobalmoduleModule } from '../../module/globalmodule/globalmodule.module';
import { CreatesopComponent } from './createsop/createsop.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecentScreenShotsComponent } from './recent-screen-shots/recent-screen-shots.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { OperationsBarComponent } from './operations-bar/operations-bar.component';
import { SidebarButtonsComponent } from './sidebar-buttons/sidebar-buttons.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';
import { ProgressbarComponent } from './shared/progressbar/progressbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { StepsContainerComponent } from './steps-container/steps-container.component';
import { StepReadComponent } from './steps-container/step-read/step-read.component';
import { StepTypeComponent } from './steps-container/step-type/step-type.component';
import { StepUiInteractionComponent } from './steps-container/step-ui-interaction/step-ui-interaction.component';
import { StepConditionComponent } from './steps-container/step-condition/step-condition.component';
import { StepCalculationComponent } from './steps-container/step-calculation/step-calculation.component';
import { SectionTitleComponent } from './steps-container/section-title/section-title.component';
import { CanvasCrouselComponent } from './canvas-crousel/canvas-crousel.component';
import { StepLoopComponent } from './steps-container/step-loop/step-loop.component';
import { StepEndLoopComponent } from './steps-container/step-end-loop/step-end-loop.component';


const routes: Routes = [
  { path: '', component: CreatesopComponent }
];
@NgModule({
  declarations: [
    CreatesopComponent, 
    SidebarComponent, 
    RecentScreenShotsComponent, 
    LeftPanelComponent, 
    RightPanelComponent, 
    OperationsBarComponent, 
    SidebarButtonsComponent, 
    VideoGalleryComponent, 
    ProgressbarComponent, 
    CarouselComponent, 
    BreadcrumbComponent, 
    StepsContainerComponent, 
    StepReadComponent, 
    StepTypeComponent, 
    StepUiInteractionComponent, 
    StepConditionComponent, 
    StepCalculationComponent, 
    SectionTitleComponent, CanvasCrouselComponent, StepLoopComponent, StepEndLoopComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GlobalmoduleModule,
    RouterModule.forChild(routes)
  ],
})
export class CreatesopModule { 
}
