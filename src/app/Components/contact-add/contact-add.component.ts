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
  contacts: Contact[] = [];
  users: User[] = [];

  constructor(private contactService: ContactService) {

  }
  ngOnInit() {
    this.loadUsers();
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContactAsync()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.contacts = event.body;
          this.modifyContactPrimaryUser();

        }
      }, () => {
        this.contacts = [];
      });
  }

  loadUsers() {
    this.contactService.getUserAsync()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.users = event.body;
        }
      }, () => {
        this.users = [];
      });
  }

  updateRange() {
    this.contactService.updateRangeAsync(this.contacts)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(e => {
        if (e.type === HttpEventType.Response) {
          // this.dummyContacts = e.body;
        }
      },
        error => {
        });
  }

  AddSecondaryUser(user: User, i: number) {
    let cu = new ContactUser();
    cu.userId = user.id;
    cu.userName = user.name;
    cu.userType = 2;
    if (cu.userId > 0)
      this.contacts[i].contactUsers.push(cu);

    console.log(this.contacts[i].contactUsers);

  }
  removeSecondaryUser(i: number, j: number) {

    this.contacts[i].contactUsers.splice(j, 1);

  }



  changePrimaryUser(userId: number, i: number) {
    if (userId) {
      var primaryUser = this.contacts[i].contactUsers.find(e => e.userType = 1);
      if (primaryUser) {
        primaryUser.userId = userId;
      } else {
        let cu = new ContactUser();
        cu.userId = userId;
        cu.userType = 1;
        this.contacts[i].contactUsers.push(cu);
      }
    } else {
      var primaryUser = this.contacts[i].contactUsers.find(e => e.userType = 1);
      if (primaryUser)
        this.contacts[i].contactUsers.splice(this.contacts[i].contactUsers.indexOf(primaryUser), 1);
    }
  }
  modifyContactPrimaryUser() {
    this.contacts.forEach(e => {
      e.contactUsers.forEach(element => {
        if (element.userType == 1) {
          //update contact primary user
          e.primaryUserId = element.userId;
          e.primaryUserName = element.userName
        } 
      });
    });
  }
}
