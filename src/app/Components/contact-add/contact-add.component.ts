import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ContactUser } from 'src/app/models/contactUser';
import { User } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  form: FormGroup = this.fb.group({
    contacts: this.fb.array([])
  });

  dummyContacts: Contact[] = [];
  users: User[] = [];

  constructor(private fb: FormBuilder,
    private testService: ContactService) {
  }

  get contacts(): FormArray {
    return this.form.controls["contacts"] as FormArray;
  }
  ngOnInit(): void {
    this.loadUsers();
    this.loadContacts();
  }


  initializRecords(data?: any) {

    for (var i = 0; i < this.dummyContacts.length; i++) {
      this.contacts.push(new FormGroup({
        phoneNo: new FormControl(this.dummyContacts[i].phoneNo),
        name: new FormControl(this.dummyContacts[i].name),
        primaryUserId: new FormControl(this.dummyContacts[i].primaryUserId),
        primaryUserName: new FormControl(this.dummyContacts[i].primaryUserName),
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
    cu.userName = user.name;
    cu.userType = 2;
    if (cu.userId > 0)
      this.dummyContacts[i].contactUsers.push(cu);

    console.log(this.dummyContacts[i].contactUsers);

  }








  loadContacts() {
    this.testService.getContactAsync()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.dummyContacts = event.body;
          console.log(event.body);
        }
      }, () => {
        this.dummyContacts = [];
      });
  }
  loadUsers() {
    this.testService.getUserAsync()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {

          console.log(event.body);
          this.users = event.body;
        }
      }, () => {
        this.users = [];
      });
  }

  updaterange() {
    this.testService.updateRangeAsync(this.dummyContacts)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(e => {
        if (e.type === HttpEventType.Response) {
          this.dummyContacts = e.body;
        }
      },
        error => {
        });
  }

}
