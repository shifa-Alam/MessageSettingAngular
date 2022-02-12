import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { ContactUser } from 'src/app/models/contactUser';
import { User } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  form: FormGroup = this.fb.group({
    contacts: this.fb.array([])
  });

  dummyContacts: Contact[] = [];
  users: User[] = [];

  constructor(private fb: FormBuilder, private testService: TestService) {
    this.dummyContacts = testService.getDummyData();
    this.users = testService.getDummyUser();
    this.initializRecords();
  }

  get contacts(): FormArray {
    return this.form.controls["contacts"] as FormArray;
  }



  initializRecords(data?: any) {

    for (var i = 0; i < this.dummyContacts.length; i++) {
      this.contacts.push(new FormGroup({
        phoneNo: new FormControl(this.dummyContacts[i].phoneNo),
        name: new FormControl(this.dummyContacts[i].name),
        primaryUserId: new FormControl(this.dummyContacts[i].primaryUserId),
        // name: new FormControl(this.dummyContacts[i].name),
        contactUsers: new FormArray([])
      }))


      let contactUsers = <FormArray>(<FormArray>this.form.get('contacts')).controls[i].get('contactUsers')
      for (var j = 0; j < this.dummyContacts[0].contactUsers.length; j++) {
        contactUsers.push(new FormGroup({
          userId: new FormControl(this.dummyContacts[i].contactUsers[j].userId)
        }))
      }
    }
    console.log(this.form.value)
  }




  saveRecords() {


    console.log(this.dummyContacts);

  }

  remove(i: number, j: number) {

    this.dummyContacts[i].contactUsers.splice(j, 1);

  }

  add(i: number) {

    let cu = new ContactUser();
    cu.userId = 90;
    cu.userType = 2;
    this.dummyContacts[i].contactUsers.push(cu);

  }

  AddSecondaryUser(user: User, i: number) {
    console.log(user);

    let cu = new ContactUser();
    cu.userId = user.id;
    cu.userName=user.name;
    cu.userType = 2;
    if(cu.userId>0)
    this.dummyContacts[i].contactUsers.push(cu);

    console.log(this.dummyContacts[i].contactUsers);

  }







  ngOnInit(): void {
    console.log(this.contacts);
  }

}
