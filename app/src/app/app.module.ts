import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { SchedulesService } from './schedules.service';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleListComponent,
    ScheduleAddComponent,
    ScheduleEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SchedulesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
