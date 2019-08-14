import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ScheduleListComponent
  },
  {
    path: 'add',
    component: ScheduleAddComponent
  },
  {
    path: 'edit/:id',
    component: ScheduleEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
