import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LessThan } from '../validators/less-than.validator';
import { SchedulesService } from '../schedules.service';

@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {

  angForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private schedulesService: SchedulesService, private router: Router) {
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
  }

  addSchedule() {
    this.schedulesService.add(this.angForm.value).subscribe(response => {
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
