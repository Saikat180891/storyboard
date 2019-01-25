import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreatesopComponent} from './createsop/createsop.component';

const routes: Routes = [
  {path: '', component: CreatesopComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatesopRoutingModule { }
