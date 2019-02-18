import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl: string = "http://localhost:51741/api/employees"
  constructor(private _http: HttpClient) { }

  addEmployee(employee) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this.apiUrl, JSON.stringify(employee), { headers: headers });
  }

}
