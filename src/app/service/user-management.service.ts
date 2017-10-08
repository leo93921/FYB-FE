import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../constants';
import { CustomHttpService } from './custom-http.service';

@Injectable()
export class UserManagementService {
  constructor(private _http: CustomHttpService) {}

  public login(username: string, password: string): Observable<any> {
    const url = `${Constants.API_BASE}user/login?u=${username}&p=${password}`;
    return this._http.get(url).map(res => res.text());
  }
}
