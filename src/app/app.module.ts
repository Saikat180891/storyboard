import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { MsAdalAngular6Module, AuthenticationGuard } from 'microsoft-adal-angular6';
import { NvD3Module } from 'ng2-nvd3';
import { NgxSpinnerModule } from 'ngx-spinner';
import 'd3';
import 'nvd3';

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
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {MatRippleModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {DateAdapter} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';


import {DataService} from './data.service';
import {AppcontrolService} from './controlservice/appcontrol.service';
import {ContainerService} from '../app/components/container/container.service';
import {PreloaderService} from '../app/components/shared/preloader/preloader.service';
import {TableService} from './components/shared/table/table.service';
import {DeleteTableService} from './components/shared/delete-table/delete-table.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './components/container/container.component';
import { CardComponent } from './components/card/card.component';
import { ReasoncodesComponent } from './components/reasoncodes/reasoncodes.component';
// import { FlowchartComponent } from './components/flowchart/flowchart.component';
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
import { CustomDropDownComponent } from './components/shared/custom-drop-down/custom-drop-down.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { PreloaderComponent } from './components/shared/preloader/preloader.component';
import { ReasonCardComponent } from './components/shared/reason-code-accordian/reason-card/reason-card.component';
import { AddReasonCardComponent } from './components/shared/reason-code-accordian/add-reason-card/add-reason-card.component';
import { StepsComponent } from './components/shared/add-steps-holder/steps/steps.component';
import { StepContainerComponent } from './components/shared/add-steps-holder/step-container/step-container.component';
import { SelectComponent } from './components/shared/select/select.component';
import { ChartsComponent } from './components/reasoncodes/charts/charts.component';
import { UserstoryCardComponent } from './components/reasoncodes/userstory-card/userstory-card.component';
import { UserstoryCardEditComponent } from './components/reasoncodes/userstory-card-edit/userstory-card-edit.component';
import { UserstoryCardCreateComponent } from './components/reasoncodes/userstory-card-create/userstory-card-create.component';
import { ColoredDropdownComponent } from './components/shared/colored-dropdown/colored-dropdown.component';
import { SprintConfigComponent } from './components/reasoncodes/sprint-config/sprint-config.component';
import { UserstoryFilterComponent } from './components/reasoncodes/userstory-filter/userstory-filter.component';
import { NormalDropdownComponent } from './components/shared/normal-dropdown/normal-dropdown.component';
import { CustomSnackbarComponent } from './components/shared/custom-snackbar/custom-snackbar.component';
import { MultiChartComponent } from './components/reasoncodes/multi-chart/multi-chart.component';

const routes = [
  {path: '', component: AuthComponent, pathMatch: 'full'},
  {path: 'login', component: AuthComponent },
  {path: 'projects', component: ContainerComponent, canActivate: [AuthenticationGuard]},

  // {path: 'projects/reason-codes', component: ReasoncodesComponent},
  // {path: 'projects/add-steps', component: AddStepsComponent}

  {path: 'projects/epics/:id', component: ReasoncodesComponent, canActivate: [AuthenticationGuard]},
  {path: 'projects/add-steps/:id', component: AddStepsComponent, canActivate: [AuthenticationGuard]},
  {path: '**', component: AuthComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    CardComponent,
    ReasoncodesComponent,
    FilterComponent,
    BackdropComponent,
    CfilterComponent,
    // CapitalizeDirective,
    AddStepsComponent,
    AddScreenComponent,
    ScreenHolderComponent,
    AddStepsHolderComponent,
    // ReadBoxComponent,
    // TypeBoxComponent,
    // ClickBoxComponent,
    SidebarComponent,
    NavHeaderComponent,
    BreadcrumbComponent,
    CollapseButtonComponent,
    MainScreenHolderComponent,
    AuthComponent,
    CustomAccordianComponent,
    ReasonCodeAccordianComponent,
    CustomDropDownComponent,
    NotFoundComponent,
    PreloaderComponent,
    ReasonCardComponent,
    AddReasonCardComponent,
    StepsComponent,
    StepContainerComponent,
    SelectComponent,
    ChartsComponent,
    // TableComponent,
    // CreateRowComponent,
    // DeleteTableComponent,
    UserstoryCardComponent,
    UserstoryCardEditComponent,
    UserstoryCardCreateComponent,
    ColoredDropdownComponent,
    SprintConfigComponent,
    UserstoryFilterComponent,
    NormalDropdownComponent,
    CustomSnackbarComponent,
    MultiChartComponent,
  ],

  imports: [
    BrowserModule,
    NvD3Module,
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
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatListModule,
    FormsModule,
    MatRippleModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatInputModule,
    NgxSpinnerModule,
    MatTableModule,
    RouterModule.forRoot(routes),
    MsAdalAngular6Module.forRoot({
      tenant: '217024cc-23bf-42d2-a7cf-d270166db3e2',
      clientId: 'd2b68bba-05ea-4053-811d-6f62047adf21',
      // redirectUri: envProd.production ? envProd.azure.redirectUri : envDev.azure.redirectUri,
      redirectUri: window.location.origin,
      endpoints: { },
      navigateToLoginRequestUrl: true,
      cacheLocation: 'localStorage'
    }),
  ],
  providers: [
    DataService, 
    MatDatepickerModule,
    AppcontrolService, 
    ContainerService, 
    AuthenticationGuard, 
    PreloaderService, 
    ContainerService, 
    TableService, 
    DeleteTableService
  ],
  bootstrap: [AppComponent]
})

/**
 * To set date as DD/MM/YYYY
 */
export class AppModule {
  constructor(private dateAdapter:DateAdapter<Date>) {
		dateAdapter.setLocale('en-in'); // DD/MM/YYYY
	}
 }
