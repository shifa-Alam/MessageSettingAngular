import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl = "https://localhost:7159/";
  constructor(private http: HttpClient) { }


  public post(subUrl: string, body: any): Observable<any> {

    return this.http.post<any>(this.baseUrl + subUrl,
      body,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        // catchError(this.handleError)
      );
  }

  public get(subUrl: string): Observable<any> {

    return this.http.get<any>(this.baseUrl + subUrl,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        tap(),
        // catchError(this.handleError)
      );
  }
}
