import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../constants';
import { User } from '../model/user';

@Injectable()
export class UserManagementService {
  private urlBase = `${Constants.API_BASE}user/`;

  constructor(private _http: Http) {}

  public login(username: string, password: string): Observable<any> {
    const url = `${this.urlBase}login?u=${username}&p=${password}`;
    return this._http.get(url).map(res => res.json());
  }

  public register(user: User): Observable<any> {
    const url = `${this.urlBase}register`;
    return this._http.post(url, user).map(res => res.json());
  }

  public getGenericData(userId: string): Observable<any> {
    const url = `${this.urlBase}info/${userId}`;
    return this._http.get(url).map(res => res.json());
  }

  public saveGenericData(userId: string, toSave: any): Observable<any> {
    const url = `${this.urlBase}info/${userId}`;
    return this._http.post(url, toSave).map(res => res.json());
  }

  public getProfile(userId: string) {
    const url = `${this.urlBase}${userId}`;
    return this._http.get(url).map(res => res.json());
  }

  public saveFeedback(toWho: string, feedback: any): Observable<any> {
    const url = `${Constants.API_BASE}feedback/${toWho}`;
    return this._http.put(url, feedback).map(res => res.json());
  }

  public getActions(): Observable<any> {
    const url = `${Constants.API_BASE}feedback/to-be-left`;
    return this._http.get(url).map(res => res.json());
  }

  public getCurrentPosition(): Observable<any> {
    const url = `${this.urlBase}current-position`;
    return this._http.get(url).map(res => res.text());
  }
}
