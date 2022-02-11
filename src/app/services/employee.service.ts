import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IEntity } from '../interfaces/ientity';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'https://localhost:7159/api/employee/saveAsync';

  constructor(private http: HttpClient) {

   }


  saveEmployeeAsync(employee: IEntity): Observable<any> {
    console.log(employee);
    return this.http.post<any>(`${this.url}`, (employee),
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
