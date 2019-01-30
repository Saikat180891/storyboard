import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'; 
import { NvD3Module } from 'ng2-nvd3';
import { NgxSpinnerModule } from 'ngx-spinner';
import {ScrollbarService} from './services/scrollbarService/scrollbar.service';
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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthGaurdService} from './auth/auth-gaurd.service';


import {DataService} from './data.service';
import {AppcontrolService} from './services/controlservice/appcontrol.service';
import {ContainerService} from './components/projects/container/container.service';
import {PreloaderService} from '../app/components/shared/preloader/preloader.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './components/projects/container/container.component';
import { CardComponent } from './components/projects/card/card.component';
import { ReasoncodesComponent } from './components/reasoncodes/reasoncodes.component';
import { BackdropComponent } from './components/projects/backdrop/backdrop.component';
import { NavHeaderComponent } from './components/shared/nav-header/nav-header.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';
import { AuthComponent } from './auth/auth.component';
import { CustomDropDownComponent } from './components/shared/custom-drop-down/custom-drop-down.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { PreloaderComponent } from './components/shared/preloader/preloader.component';
import { SelectComponent } from './components/shared/select/select.component';
import { ChartsComponent } from './components/reasoncodes/charts/charts.component';
import { UserstoryCardComponent } from './components/reasoncodes/userstory-card/userstory-card.component';
import { UserstoryCardEditComponent } from './components/reasoncodes/userstory-card-edit/userstory-card-edit.component';
import { UserstoryCardCreateComponent } from './components/reasoncodes/userstory-card-create/userstory-card-create.component';
import { ColoredDropdownComponent } from './components/shared/colored-dropdown/colored-dropdown.component';
import { SprintConfigComponent } from './components/reasoncodes/sprint-config/sprint-config.component';
import { UserstoryFilterComponent } from './components/reasoncodes/userstory-filter/userstory-filter.component';
import { NormalDropdownComponent } from './components/shared/normal-dropdown/normal-dropdown.component';
import { MultiChartComponent } from './components/reasoncodes/multi-chart/multi-chart.component';
import { ExportDialogBoxComponent } from './components/reasoncodes/export-dialog-box/export-dialog-box.component';
import { CookieService } from 'ngx-cookie-service';
import { PermissionsDirective } from './directives/permissions.directive';
import {AuthorizationService} from './services/authorization/authorization.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupusersComponent } from './authentication/signupusers/signupusers.component';
// import { ScrollbarComponent } from './services/scrollbarService/scrollbar/scrollbar.component';

const routes = [
  {
    path: '', 
    component: AppComponent, 
    children: [
      {
        path: '', 
        component: AuthComponent, 
        pathMatch: 'full'
      },
      {
        path: 'signup',
        component: SignupusersComponent
      },
      {
        path: 'projects', 
        component: DashboardComponent,
        canActivate: [AuthGaurdService],
        children: [
          {
            path: '', 
            component: ContainerComponent, 
          },
          {
            path: 'epics/:id', 
            component: ReasoncodesComponent,
          },
          {
            path: 'epics/:id/sop/:userStoryId', 
            loadChildren: './components/createsop/createsop.module#CreatesopModule'
          },
        ]
      }
    ]
  },
  {path: '**', redirectTo: '/'}
];

// export const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    CardComponent,
    ReasoncodesComponent,
    BackdropComponent,
    NavHeaderComponent,
    BreadcrumbComponent,
    AuthComponent,
    CustomDropDownComponent,
    NotFoundComponent,
    PreloaderComponent,
    SelectComponent,
    ChartsComponent,
    UserstoryCardComponent,
    UserstoryCardEditComponent,
    UserstoryCardCreateComponent,
    ColoredDropdownComponent,
    SprintConfigComponent,
    UserstoryFilterComponent,
    NormalDropdownComponent,
    MultiChartComponent,
    ExportDialogBoxComponent,
    PermissionsDirective,
    DashboardComponent,
    SignupusersComponent,
    // ScrollbarComponent,
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
    HttpClientXsrfModule.withOptions({
      cookieName: localStorage.getItem('csrftoken'),
      headerName: 'X-CSRFToken'
    }),
    NgxSpinnerModule,
    MatTableModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes),
    // MsAdalAngular6Module.forRoot({
    //   tenant: '217024cc-23bf-42d2-a7cf-d270166db3e2',
    //   clientId: 'd2b68bba-05ea-4053-811d-6f62047adf21',
    //   // redirectUri: envProd.production ? envProd.azure.redirectUri : envDev.azure.redirectUri,
    //   redirectUri: window.location.origin,
    //   endpoints: { },
    //   navigateToLoginRequestUrl: true,
    //   cacheLocation: 'localStorage'
    // }),
  ],
  providers: [
    DataService, 
    MatDatepickerModule,
    MatSnackBarModule,
    AppcontrolService, 
    ContainerService, 
    PreloaderService, 
    ContainerService, 
    CookieService,
    AuthGaurdService,
    AuthorizationService,
    ScrollbarService
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
