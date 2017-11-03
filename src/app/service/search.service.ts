import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../constants';

@Injectable()
export class SearchService {

  constructor(private _http: Http) { }

  public doSearch(searchObject: any): Observable<any> {
    const url = `${Constants.API_BASE}search`;
    return this._http.post(url, searchObject).map(res => res.json());
  }

}
