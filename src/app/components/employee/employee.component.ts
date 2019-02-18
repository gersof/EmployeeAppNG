import { Component, OnInit } from '@angular/core';
import { Employee } from "../../models/employee.model";
import { EmployeeService } from "../../services/employee/employee.service";
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employee = new Employee(0, '', 0, '', '', '', '', 0, '')

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
  }
  onClickAdd() {
    this._employeeService.addEmployee(this.employee).subscribe((data) => {
      console.log(data)
    });
  }
}
