import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../schedules.service';
import Schedule from '../models/schedule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  schedules: Schedule[] = [];
  confirmModal: boolean = false;
  idToDelete: number;
  errorMessage: string;

  constructor(private schedulesService: SchedulesService, private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(search?: string) {
    this.schedulesService.getAll(search).subscribe((schedules: Schedule[]) => {
      this.schedules = schedules;
    })
  }

  delete() {
    this.schedulesService.delete(this.idToDelete).subscribe(response => {
      this.confirmModal = false;
      this.errorMessage = null;
      this.getAll();
    }, error => {
      if (error.error && typeof error.error === 'string') {
        this.errorMessage = error.error;
      } else {
        this.errorMessage = 'Erro desconhecido';
      }
      this.confirmModal = false;
    })
  }

}
