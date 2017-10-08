import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../constants';

@Injectable()
export class UserManagementService {

  constructor(private _http: Http) { }

  public login(username: string, password: string): Observable<any> {
    const url = `${Constants.API_BASE}user/login?u=${username}&p=${password}`;
    return this._http.get(url).map(res => res.text());
  }

}
