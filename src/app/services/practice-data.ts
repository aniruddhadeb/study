import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EmployeesData } from '../store/study.models';

@Injectable({
  providedIn: 'root'
})
export class PracticeData {

  private readonly url = `https://686de6d3c9090c4953879095.mockapi.io/api/v1/employee`;

  constructor(private http: HttpClient) {}

  getEmployeesData(): Observable<EmployeesData[]> {
    return this.http.get(this.url).pipe(map((data) => data as EmployeesData[]));
  }
}
