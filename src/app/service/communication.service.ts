import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../constants';
import { Communication } from '../model/communication';

@Injectable()
export class CommunicationService {
  private readonly baseUrl = `${Constants.API_BASE}communication`;

  constructor(private _http: Http) {}

  public sendCommunication(communication: Communication): Observable<any> {
    const url = `${this.baseUrl}`;
    return this._http.put(url, communication).map(res => res.text());
  }
}
