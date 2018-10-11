import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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



import {DataService} from './data.service';
import {AppcontrolService} from './controlservice/appcontrol.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './components/container/container.component';
import { CardComponent } from './components/card/card.component';
import { ReasoncodesComponent } from './components/reasoncodes/reasoncodes.component';
import { FlowchartComponent } from './components/flowchart/flowchart.component';
import { FilterComponent } from './filter/filter.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';

const routes = [
  {path: 'page1', component: ContainerComponent},
  {path: 'page2', component: ReasoncodesComponent},
  {path: 'page3', component: FlowchartComponent}
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
    BackdropComponent
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
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService, MatDatepickerModule,AppcontrolService],
  bootstrap: [AppComponent]
})
export class AppModule { }
