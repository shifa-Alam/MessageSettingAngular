import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IEntity } from '../interfaces/ientity';
import { Contact } from '../models/contact';
import { ContactUser } from '../models/contactUser';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  contacts: Contact[] = [];
  users: User[] = [];

  createDummyContact() {

  }

  getDummyData(): Contact[] {
    for (let i = 1; i < 10; i++) {
      const contact: Contact = new Contact();
      contact.id = i;
      contact.name = "Shifa " + i;
      contact.phoneNo = "990 " + i;
      contact.primaryUserId=2;

      for (let index = 1; index <3; index++) {
        const element: ContactUser = new ContactUser();
        element.contactId = i;
        element.userId = index;
        element.userType = 2
        element.userName="test "+i;
        contact.contactUsers.push(element);

      }
      this.contacts.push(contact);

    }
    return this.contacts;
  }

  getDummyUser(): User[] {
    for (let i = 1; i < 10; i++) {
      let user: User = new User();
      user.name = "Zahid" + i;
      user.id = i;
      this.users.push(user);

    }
    return this.users;
  }
  private url = 'https://localhost:7159/api/contact/SaveAsync';

  constructor(private http: HttpClient) {

  }
  saveContactAsync(entity: IEntity): Observable<any> {
    console.log(entity);
    return this.http.post<any>(`${this.url}`, (entity),
      {
        // headers: {
        //   "Content-Type": "application/json;charset=UTF-8",
        // },
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next();
        }),

        // catchError(this.handleError)
      );
  }
}
