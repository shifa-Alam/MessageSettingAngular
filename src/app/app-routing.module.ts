import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAddComponent } from './Components/contact-add/contact-add.component';
import { TestComponent } from './Components/test/test.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  { path: '', component: ContactAddComponent },
  // { path: 'contact', component: ContactAddComponent, pathMatch: 'full' },
  // { path: 'employee', component: EmployeeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
