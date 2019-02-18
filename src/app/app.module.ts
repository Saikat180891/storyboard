import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'; 
import { NvD3Module } from 'ng2-nvd3';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ScrollbarService} from './services/scrollbarService/scrollbar.service';
import 'd3';
import 'nvd3';

import {DragDropModule} from '@angular/cdk/drag-drop';

import {DateAdapter} from '@angular/material';
import {AuthGaurdService} from './auth/auth-gaurd.service';
import {DataService} from './data.service';
import {AppcontrolService} from './services/controlservice/appcontrol.service';
import {ContainerService} from './components/projects/container/container.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './auth/auth.component';
import { SelectComponent } from './components/shared/select/select.component';
import { CookieService } from 'ngx-cookie-service';
import { PermissionsDirective } from './directives/permissions.directive';
import { AuthorizationService } from './services/authorization/authorization.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupusersComponent } from './authentication/signupusers/signupusers.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { GlobalmoduleModule } from './module/globalmodule/globalmodule.module';

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
        path: 'resetPassword',
        component: ResetPasswordComponent
      },
      {
        path: 'projects', 
        component: DashboardComponent,
        canActivate: [AuthGaurdService],
        children: [
          {
            path: '', 
            loadChildren: './components/projects/projects.module#ProjectsModule'
          },
          {
            path: 'epics/:id', 
            loadChildren: './components/reasoncodes/reasoncode.module#ReasoncodeModule'

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
    AuthComponent,
    SelectComponent,
    DashboardComponent,
    SignupusersComponent,
    ResetPasswordComponent,
  ],

  imports: [
    BrowserModule,
    NvD3Module,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule,
    GlobalmoduleModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    }),
    NgxSpinnerModule,
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
    PasswordStrengthMeterModule,
  ],
  providers: [
    DataService, 
    AppcontrolService, 
    ContainerService, 
    CookieService,
    AuthGaurdService,
    AuthorizationService,
    ScrollbarService
  ],
  bootstrap: [AppComponent],
  exports: [
    PermissionsDirective
  ]
})

/**
 * To set date as DD/MM/YYYY
 */
export class AppModule {
  constructor(private dateAdapter:DateAdapter<Date>) {
		dateAdapter.setLocale('en-in'); // DD/MM/YYYY
	}
 }
