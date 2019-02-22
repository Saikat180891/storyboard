import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'; 
import { NvD3Module } from 'ng2-nvd3';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollbarService } from './services/scrollbarService/scrollbar.service';
import 'd3';
import 'nvd3';


import { DateAdapter } from '@angular/material';
import { AuthGaurdService } from './auth/auth-gaurd.service';
import { DataService } from './data.service';
import { AppcontrolService } from './services/controlservice/appcontrol.service';
import { ContainerService } from './components/projects/container/container.service';

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
    ReactiveFormsModule,
    HttpClientModule,
    GlobalmoduleModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    }),
    NgxSpinnerModule,
    RouterModule.forRoot(routes),
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
		dateAdapter.setLocale('en-us'); // DD/MM/YYYY
	}
 }
