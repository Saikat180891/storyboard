/**
 * the global module has all the material modules
 * as well as the directivs required to control the entire app
 * this module can be imported to any other module
 * which uses Angular Material and the custom directives
 * ANY CHANGES IN THIS MODULE MIGHT BREAK THE APP OR MIGHT EFFECT THE APP'S PERFORMANCE
 */
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from "@angular/material-moment-adapter";
import { RouterModule } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { DataService } from "../../data.service";
import { DragDropDirective } from "../../directives/dragDrop/drag-drop.directive";
import { DroppableDirective } from "../../directives/dragDrop/droppable.directive";
import { ListDragDirective } from "../../directives/dragDrop/list-drag.directive";
import { ListDropDirective } from "../../directives/dragDrop/list-drop.directive";
import { PermissionsDirective } from "../../directives/permissions.directive";

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from "@angular/material";

@NgModule({
  declarations: [
    PermissionsDirective,
    DragDropDirective,
    DroppableDirective,
    ListDragDirective,
    ListDropDirective,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatMenuModule,
    MatRadioModule,
    MatTabsModule,
    MatGridListModule,
    MatRippleModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule,
    DragDropModule,
    MatMomentDateModule,
  ],
  exports: [
    PermissionsDirective,
    DragDropDirective,
    DroppableDirective,
    ListDragDirective,
    ListDropDirective,
    MatButtonModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatMenuModule,
    MatRadioModule,
    MatTabsModule,
    MatGridListModule,
    MatRippleModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule,
    DragDropModule,
    MatMomentDateModule,
  ],
  providers: [
    MatSnackBarModule,
    DataService,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class GlobalmoduleModule {}
