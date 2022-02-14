import { HttpEventType } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-rnd',
  templateUrl: './rnd.component.html',
  styleUrls: ['./rnd.component.scss']
})
export class RndComponent implements OnInit {
  data = {
    companies: [
      {
        company: "example comany",
        projects: [
          {
            projectName: "example project",
          }
        ]
      }
    ]
  }

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      companies: this.fb.array([])
    })

    this.setCompanies();
  }
  ngOnInit(): void {

  }
  getControls() {
    return (this.myForm.get('companies') as FormArray).controls;
  }

  addNewCompany() {
    let control = this.myForm.controls['companies'] as FormArray;
    control.push(
      this.fb.group({
        company: [''],
        projects: this.fb.array([])
      })
    )
  }

  deleteCompany(index: number) {
    let control = <FormArray>this.myForm.controls['companies'];
    control.removeAt(index)
  }

  addNewProject(control: any) {
    control.push(
      this.fb.group({
        projectName: ['']
      }))
  }

  deleteProject(control: any, index: any) {
    control.removeAt(index)
  }

  setCompanies() {
    let control = <FormArray>this.myForm.get('companies');
    this.data.companies.forEach(x => {
      control.push(this.fb.group({
        company: x.company,
        projects: this.setProjects(x)
      }))
    })
  }

  setProjects(x: any) {
    let arr = new FormArray([])
    x.projects.forEach((y: { projectName: any; }) => {
      arr.push(this.fb.group({
        projectName: y.projectName
      }))
    })
    return arr;
  }
}
