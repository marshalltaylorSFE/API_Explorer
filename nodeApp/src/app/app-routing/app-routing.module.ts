import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ApiExplorerComponent } from '../api-explorer/api-explorer.component';
import { InfoComponent } from '../info/info.component';
import { ProgrammingInfoComponent } from '../programming-info/programming-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/info', pathMatch: 'full' },
  { path: 'info',  component: InfoComponent },
  { path: 'apiexplorer', component: ApiExplorerComponent },
  { path: 'programminginfo', component: ProgrammingInfoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
