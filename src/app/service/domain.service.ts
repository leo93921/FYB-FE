import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DomainService {
  private readonly urlBase = `${Constants.API_BASE}domain/`;

  constructor(private _http: Http) {}

  public getDomain(domainName: string): Observable<any> {
    const url = `${this.urlBase}${domainName}`;
    return this._http.get(url).map(res => res.json());
  }
}
