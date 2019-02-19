/**
 * the global module has all the material modules 
 * as well as the directivs required to control the entire app
 * this module can be imported to any other module 
 * which uses Angular Material and the custom directives
 * ANY CHANGES IN THIS MODULE MIGHT BREAK THE APP OR MIGHT EFFECT THE APP'S PERFORMANCE
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsDirective } from '../../directives/permissions.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { DragDropDirective } from '../../directives/dragDrop/drag-drop.directive';
import { DroppableDirective } from '../../directives/dragDrop/droppable.directive';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import {
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
} from '@angular/material';


@NgModule({
  declarations: [
    PermissionsDirective,
    DragDropDirective,
    DroppableDirective
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
    MatMomentDateModule
  ],
  exports: [
    PermissionsDirective,
    DragDropDirective,
    DroppableDirective,
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
    MatMomentDateModule
  ],
  providers: [
    MatSnackBarModule,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class GlobalmoduleModule { }
