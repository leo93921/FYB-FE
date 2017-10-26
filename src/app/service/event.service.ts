import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {
  private readonly urlBase = `${Constants.API_BASE}event/`;

  constructor(private _http: Http) {}

  public makeOffer(messageGroup: String, eventOffer: any): Observable<any> {
    const url = `${this.urlBase}${messageGroup}`;
    return this._http.post(url, eventOffer).map(res => res.json());
  }

  public getOffer(messageGroup: string): Observable<any> {
    const url = `${this.urlBase}${messageGroup}`;
    return this._http.get(url).map(res => res.json());
  }

  public acceptOffer(messageGroup: string): Observable<any> {
    const url = `${this.urlBase}${messageGroup}`;
    return this._http.put(url, { accept: true }).map(res => res.json());
  }

  public approve(messageGroup: string): Observable<any> {
    const url = `${this.urlBase}approve/${messageGroup}`;
    return this._http.get(url).map(res => res.text());
  }

  public executePayment(info: any): Observable<any> {
    const url = `${this.urlBase}pay/${info.messageGroup}`;
    return this._http
      .post(url, { payerID: info.payerID, paymentId: info.paymentId })
      .map(res => res.json());
  }
}
