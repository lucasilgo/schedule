import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SchedulesService } from '../schedules.service';
import { LessThan } from '../validators/less-than.validator';
import Schedule from '../models/schedule';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {

  angForm: FormGroup;
  schedule: Schedule = new Schedule();
  errorMessage: string;

  constructor(private fb: FormBuilder, private schedulesService: SchedulesService, private router: Router, private route: ActivatedRoute) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      PatientName: ['', Validators.required],
      PatientBirth: ['', Validators.required],
      Start: ['', Validators.required],
      Finish: ['', Validators.required],
      Notes: ['']
    }, {
        validator: LessThan('Finish', 'Start')
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.schedulesService.get(params['id']).subscribe((schedule: Schedule) => {
        this.schedule = schedule;
        if (this.schedule.patientBirth) {
          this.schedule.patientBirth = this.schedule.patientBirth.split('T')[0];
        }
      }, error => {
        if (error.error && typeof error.error === 'string') {
          this.errorMessage = error.error;
        } else {
          this.errorMessage = 'Erro desconhecido';
        }
      });
    });
  }

  updateSchedule() {
    let scheduleToEdit: Schedule = this.angForm.value;
    scheduleToEdit.id = this.schedule.id;
    this.schedulesService.edit(scheduleToEdit).subscribe(response => {
      this.router.navigate(['/'])
    }, error => {
      if (error.error && typeof error.error === 'string') {
        this.errorMessage = error.error;
      } else {
        this.errorMessage = 'Erro desconhecido';
      }
    })
  }

}
