import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import "d3";
import { NvD3Module } from "ng2-nvd3";
import { NgxSpinnerModule } from "ngx-spinner";
import "nvd3";
import { ScrollbarService } from "./services/scrollbarService/scrollbar.service";

import { DateAdapter } from "@angular/material";
import { AuthGaurdService } from "./auth/auth-gaurd.service";
import { ContainerService } from "./components/projects/container/container.service";
import { DataService } from "./data.service";
import { AppcontrolService } from "./services/controlservice/appcontrol.service";

import { PasswordStrengthMeterModule } from "angular-password-strength-meter";
import { CookieService } from "ngx-cookie-service";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { ResetPasswordComponent } from "./authentication/reset-password/reset-password.component";
import { SignupusersComponent } from "./authentication/signupusers/signupusers.component";
import { HeaderComponent } from "./components/header/header.component";
import { SelectComponent } from "./components/shared/select/select.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PermissionsDirective } from "./directives/permissions.directive";
import { GlobalmoduleModule } from "./module/globalmodule/globalmodule.module";
import { AuthorizationService } from "./services/authorization/authorization.service";

const routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      {
        path: "",
        component: AuthComponent,
        pathMatch: "full",
      },
      {
        path: "signup",
        component: SignupusersComponent,
      },
      {
        path: "resetPassword",
        component: ResetPasswordComponent,
      },
      {
        path: "projects",
        component: DashboardComponent,
        canActivate: [AuthGaurdService],
        children: [
          {
            path: "",
            loadChildren:
              "./components/projects/projects.module#ProjectsModule",
          },
          {
            path: "epics/:id",
            loadChildren:
              "./components/reasoncodes/reasoncode.module#ReasoncodeModule",
          },
          {
            path: "epics/:id/sop/:userStoryId",
            loadChildren:
              "./components/createsop/createsop.module#CreatesopModule",
          },
        ],
      },
    ],
  },
  { path: "**", redirectTo: "/" },
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
      cookieName: "csrftoken",
      headerName: "X-CSRFToken",
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
    ScrollbarService,
  ],
  bootstrap: [AppComponent],
  exports: [PermissionsDirective],
})

/**
 * To set date as DD/MM/YYYY
 */
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale("en-us"); // DD/MM/YYYY
  }
}
