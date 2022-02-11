import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee: Employee = new Employee();

  contact:Contact = new Contact();
  constructor(private employeeService: EmployeeService,) { }

  ngOnInit(): void {
    this.employee.firstName = "Zahid";
    this.employee.lastName="Khan",
    this.employee.email="khan@gmail.com",
    this.employee.phoneNumber="990"
    this.onSave();
  }

  onSave() {
    this.employeeService.saveEmployeeAsync(this.employee).subscribe((event) => {
      if (event.type === HttpEventType.Response) {
        // this._snackBarService.success("Saved Successfully!");
        // this.isLoading = false;
        // this.router.navigate(['']);
      }
    },
      error => {
        // this._snackBarService.error("Something Wrong");
        // this.isLoading = false;
      }
    );
  }

}
