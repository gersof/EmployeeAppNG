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
  updateEmployee(employee) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put(this.apiUrl+'/'+employee.IdEmployee, JSON.stringify(employee), { headers: headers });
  }
  deleteEmployee(idEmployee) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.delete(this.apiUrl+'/'+idEmployee, { headers: headers });
  }
  getAllEmployees() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get(this.apiUrl, { headers: headers });
  }
  getEmployeeById(id) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get(this.apiUrl + '/' + id, { headers: headers });
  }
  getAllEmployeesByName(name) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get('http://localhost:51741/api/Employees/GetEmployeeByName/' + name, { headers: headers });
  }

}
