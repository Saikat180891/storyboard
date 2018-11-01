import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule, MatCheckboxModule, MatNativeDateModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';

import {DataService} from './data.service';
import {AppcontrolService} from './controlservice/appcontrol.service';
import {ContainerService} from '../app/components/container/container.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './components/container/container.component';
import { CardComponent } from './components/card/card.component';
import { ReasoncodesComponent } from './components/reasoncodes/reasoncodes.component';
import { FlowchartComponent } from './components/flowchart/flowchart.component';
import { FilterComponent } from './filter/filter.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { CfilterComponent } from './components/shared/cfilter/cfilter.component';
import { CapitalizeDirective } from './directives/capitalize.directive';
import { AddStepsComponent } from './components/add-steps/add-steps.component';
import { AddScreenComponent } from './components/shared/add-screen/add-screen.component';
import { ScreenHolderComponent } from './components/shared/screen-holder/screen-holder.component';
import { AddStepsHolderComponent } from './components/shared/add-steps-holder/add-steps-holder.component';
import { ReadBoxComponent } from './components/shared/read-box/read-box.component';
import { TypeBoxComponent } from './components/shared/type-box/type-box.component';
import { ClickBoxComponent } from './components/shared/click-box/click-box.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NavHeaderComponent } from './components/shared/nav-header/nav-header.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';
import { CollapseButtonComponent } from './components/shared/collapse-button/collapse-button.component';
import { MainScreenHolderComponent } from './components/shared/main-screen-holder/main-screen-holder.component';
import { AuthComponent } from './auth/auth.component';
import { CustomAccordianComponent } from './components/shared/custom-accordian/custom-accordian.component';
import { ReasonCodeAccordianComponent } from './components/shared/reason-code-accordian/reason-code-accordian.component';

const routes = [
  {path: 'projects', component: ContainerComponent},
  {path: 'projects/reason-codes', component: ReasoncodesComponent},
  {path: 'page3', component: FlowchartComponent},
  {path: 'projects/add-steps', component: AddStepsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    CardComponent,
    ReasoncodesComponent,
    FlowchartComponent,
    FilterComponent,
    BackdropComponent,
    CfilterComponent,
    CapitalizeDirective,
    AddStepsComponent,
    AddScreenComponent,
    ScreenHolderComponent,
    AddStepsHolderComponent,
    ReadBoxComponent,
    TypeBoxComponent,
    ClickBoxComponent,
    SidebarComponent,
    NavHeaderComponent,
    BreadcrumbComponent,
    CollapseButtonComponent,
    MainScreenHolderComponent,
    AuthComponent,
    CustomAccordianComponent,
    ReasonCodeAccordianComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatGridListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatRadioModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    FormsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatInputModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService, MatDatepickerModule,AppcontrolService, ContainerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
