import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatesopRoutingModule } from './createsop-routing.module';
import { CreatesopComponent } from './createsop/createsop.component';
import { Route, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: CreatesopComponent}
];
@NgModule({
  declarations: [CreatesopComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
    // CreatesopRoutingModule
  ]
})
export class CreatesopModule { }
