import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class CustomHttpService {
  public pendingRequest = false;
  private pendingRequestNumber = 0;

  constructor(private _http: Http) {}

  public get(url: string): Observable<any> {
    this.incrementRequests();
    return this._http.get(url).switchMap(res => {
      this.decrementRequests();
      return Observable.of(res);
    });
  }

  private incrementRequests(): void {
    this.pendingRequestNumber++;
    this.pendingRequest = true;
  }

  private decrementRequests(): void {
    this.pendingRequestNumber--;
    if (this.pendingRequestNumber === 0) {
      this.pendingRequest = false;
    }
  }
}
