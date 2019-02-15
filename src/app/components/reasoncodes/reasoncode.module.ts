import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReasoncodesComponent} from './reasoncodes.component';
import {UserstoryCardComponent} from './userstory-card/userstory-card.component';
import {SprintConfigComponent} from './sprint-config/sprint-config.component';
import {UserstoryCardCreateComponent} from './userstory-card-create/userstory-card-create.component';
import {UserstoryCardEditComponent} from './userstory-card-edit/userstory-card-edit.component';
import {UserstoryFilterComponent} from './userstory-filter/userstory-filter.component';
import {ExportDialogBoxComponent} from './export-dialog-box/export-dialog-box.component';
import {ChartsComponent} from './charts/charts.component';
import {ColoredDropdownComponent} from './shared/colored-dropdown/colored-dropdown.component';
import {NormalDropdownComponent} from './shared/normal-dropdown/normal-dropdown.component';

// import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { NvD3Module } from 'ng2-nvd3';
import {Routes, RouterModule} from '@angular/router';

// import {MatTabsModule} from '@angular/material/tabs';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatChipsModule} from '@angular/material/chips';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatRippleModule} from '@angular/material/core';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import {MatGridListModule} from '@angular/material/grid-list';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatRadioModule} from '@angular/material/radio';

import {GlobalmoduleModule} from '../../module/globalmodule/globalmodule.module';

const routes: Routes = [
  { path: '', component: ReasoncodesComponent }
];

@NgModule({
  declarations: [
    ReasoncodesComponent,
    UserstoryCardComponent,
    SprintConfigComponent,
    UserstoryCardCreateComponent,
    UserstoryCardEditComponent,
    UserstoryFilterComponent,
    ExportDialogBoxComponent,
    ChartsComponent,
    ColoredDropdownComponent,
    NormalDropdownComponent
  ],
  imports: [
    CommonModule,
    GlobalmoduleModule,
    NvD3Module,
    RouterModule.forChild(routes),
    // FormsModule,
    // ReactiveFormsModule,

    // MatTabsModule,
    // MatDatepickerModule,
    // MatSnackBarModule,
    // MatTooltipModule,
    // MatChipsModule,
    // MatMenuModule,
    // NgxSpinnerModule,
    // MatSlideToggleModule,
    // MatRippleModule,
    // MatGridListModule,
    // MatCheckboxModule,
    // MatRadioModule,
  ]
})
export class ReasoncodeModule { }
