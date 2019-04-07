import { Component, OnInit } from '@angular/core';
import { Employee } from "../../models/employee.model";
import { EmployeeService } from "../../services/employee/employee.service";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employee = new Employee(0, '', 0, '', '', '', '', 0, '');
  public employeeList: Array<any> = [];
  modalRef = null;
  idEmployee = 0;
  nameEmployee = "";
  constructor(private _employeeService: EmployeeService, private _toastr: ToastrService, private _modalservice: NgbModal) { }

  ngOnInit() {
  }
  onClickAdd() {
    try {
      this._employeeService.addEmployee(this.employee).subscribe((data) => {
        this._toastr.success('Se insertó correctamente el empleado', 'Ok');
        this.cleanForm();
      }, (err) => {
        this._toastr.error('Ocurrió un error tratando de insertar el empleado!', 'Error')
      });
    } catch (error) {
      this._toastr.error('Ocurrió un error tratando de insertar el empleado!', 'Error')
    }
  }

  cleanForm() {
    this.employee = new Employee(0, '', 0, '', '', '', '', 0, '');

  }

  onClickSearch(content) {
    this.modalRef = this._modalservice.open(content, { size: 'lg' })
  }

  closeModal() {
    this.modalRef.close();
  }

  onClickSearchById() {
    try {
      this._employeeService.getEmployeeById(this.idEmployee).subscribe((data) => {
        var result;
        result = data;
        this.employeeList = [];
        this.employeeList.push(result);
      }, () => {
        this._toastr.error('Ocurrió un error tratando de consultar el empleado!', 'Error')
      })
    } catch (error) {
      this._toastr.error('Ocurrió un error tratando de consultar el empleado!', 'Error')

    }
  }

  onClickSearchByName() {
    try {
      this._employeeService.getAllEmployeesByName(this.nameEmployee).subscribe((data) => {
        var result;
        result = data;
        this.employeeList = result;
      }, () => {
        this._toastr.error('Ocurrió un error tratando de consultar el empleado por Nombre!', 'Error')
      })
    } catch (error) {
      this._toastr.error('Ocurrió un error tratando de consultar el empleado por Nombre!', 'Error')

    }
  }

  onClickSearchAll() {
    try {
      this._employeeService.getAllEmployees().subscribe((data) => {
        var result;
        result = data;
        this.employeeList = result;
      }, () => {
        this._toastr.error('Ocurrió un error tratando de consultar los empleados', 'Error')
      })
    } catch (error) {
      this._toastr.error('Ocurrió un error tratando de consultar el empleados!', 'Error')

    }
  }

  onClickEdit(sigleEmployee) {
    //alert(JSON.stringify(sigleEmployee));
    this.employee = sigleEmployee;
    this.closeModal();
  }

  onClickDelete(singleEmployee) {
    this.deleteEmployee(singleEmployee);
  }

  onClickUpdate() {
    try {
      this._employeeService.updateEmployee(this.employee).subscribe((data) => {
        this._toastr.success('Se actualizó correctamente el empleado', 'Ok');
        this.cleanForm();
      }, (err) => {
        this._toastr.error('Ocurrió un error tratando de actualizar el empleado!', 'Error')
      });
    } catch (error) {
      this._toastr.error('Ocurrió un error tratando de actualizar el empleado!', 'Error')
    }
  }

  deleteEmployee(employeeData) {
    try {
      let confirmResponse = confirm("¿Está seguro que desea eliminar este empleado?");
      if (confirmResponse) {
        this._employeeService.deleteEmployee(employeeData.IdEmployee).subscribe((data) => {
          this._toastr.success('Se elimino correctamente el empleado', 'Ok');
          this.employeeList = this.employeeList.filter((item) => {
            return item.IdEmployee !== employeeData.IdEmployee;
          })
        }, (err) => {
          this._toastr.error('Ocurrió un error tratando de eliminar el empleado!', 'Error')
        })
      }
    } catch (error) {
      this._toastr.error('Ocurrió un error tratando de eliminar el empleado!', 'Error')
    }
  }

}
