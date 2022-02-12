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
export class ContactService {
 
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
