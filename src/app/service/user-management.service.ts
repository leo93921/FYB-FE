import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../constants';
import { User } from '../model/user';

@Injectable()
export class UserManagementService {
  constructor(private _http: Http) {}

  public login(username: string, password: string): Observable<any> {
    const url = `${Constants.API_BASE}user/login?u=${username}&p=${password}`;
    return this._http.get(url).map(res => res.json());
  }

  public register(user: User): Observable<any> {
    const url = `${Constants.API_BASE}user/register`;
    return this._http.post(url, user).map(res => res.json());
  }
}
