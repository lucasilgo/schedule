import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Schedule from './models/schedule';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  url: string = 'https://localhost:5001/api/schedule'

  constructor(private http: HttpClient) { }

  add(schedule: Schedule) {
    return this.http.post(`${this.url}`, schedule);
  }

  edit(schedule: Schedule) {
    return this.http.put(`${this.url}`, schedule);
  }

  get(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  getAll(search?: string) {
    return this.http.get(`${this.url}/search/${search || ''}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }
}
