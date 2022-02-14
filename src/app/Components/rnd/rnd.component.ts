import { HttpEventType } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ContactUser } from 'src/app/models/contactUser';
import { User } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-rnd',
  templateUrl: './rnd.component.html',
  styleUrls: ['./rnd.component.scss']
})
export class RndComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  contacts: Contact[] = [];
  users: any;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.loadUsers();
    this.loadContacts();
  }

  ngOnInit() {

  }


  loadContacts() {
    this.contactService.getContactAsync()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.contacts = event.body;
          console.log(event.body);
          this.contacts.forEach(e => {
            e.contactUsers.forEach(element => {
              if (element.userType == 1) {
                e.primaryUserId = element.userId;
                e.primaryUserName = element.userName
              }
            });
          });
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

          console.log(event.body);
          this.users = event.body;
        }
      }, () => {
        this.users = [];
      });
  }


  saveRecords() {


    console.log(this.contacts);

  }

  remove(i: number, j: number) {

    this.contacts[i].contactUsers.splice(j, 1);

  }


  updaterange() {

    console.log(this.contacts);
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
    console.log(user);

    let cu = new ContactUser();
    cu.userId = user.id;
    cu.userName = user.name;
    cu.userType = 2;
    if (cu.userId > 0)
      this.contacts[i].contactUsers.push(cu);

    console.log(this.contacts[i].contactUsers);

  }

  changePrimaryUser(userId: number, i: number) {
    if (userId) {
      var primaryUser = this.contacts[i].contactUsers.find(e => e.userType = 1);
      if (primaryUser) {
        primaryUser.userId = userId;
        // primaryUser.userName = user.name
      } else {
        let cu = new ContactUser();
        cu.userId = userId;
        // cu.userName = user.name;
        cu.userType = 1;

        this.contacts[i].contactUsers.push(cu);
      }

    } else {
      var primaryUser = this.contacts[i].contactUsers.find(e => e.userType = 1);
      if (primaryUser)
        this.contacts[i].contactUsers.splice(this.contacts[i].contactUsers.indexOf(primaryUser), 1);
    }
    console.log(this.contacts[i].contactUsers);
  }
}
