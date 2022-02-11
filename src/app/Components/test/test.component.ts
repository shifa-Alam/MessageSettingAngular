import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

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

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.dummyContacts = contactService.getDummyData();
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







  ngOnInit(): void {
    console.log(this.contacts);
  }

}
