import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilsService {
  constructor(private _http: Http) {}

  public getCoordinates(address: string): Observable<any> {
    const API_KEY = 'AIzaSyBY5EbiFluVUsnqhAl4qsmhAIG09XiepbI';
    const toSend = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${toSend}&key=${API_KEY}`;
    return this._http.get(url).map(res => res.json());
  }
}
