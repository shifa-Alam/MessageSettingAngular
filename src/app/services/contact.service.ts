import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IEntity } from '../interfaces/ientity';
import { BaseService } from './base.service';

const subUrl: string = 'api/contact/';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {


  updateRangeAsync(entities: IEntity[]): Observable<any> {
    return super.post(subUrl + "UpdateRangeAsync", entities);
  }

  getContactAsync(): Observable<any> {
    return super.get(subUrl+"GetContactAsync");
  }

  getUserAsync(): Observable<any> {
    return super.get(subUrl+"GetUserAsync");
  }
}
