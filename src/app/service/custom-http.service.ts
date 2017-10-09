import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class CustomHttpService extends Http {
  public pendingRequest = false;
  private pendingRequestNumber = 0;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.incrementRequests();
    return super.get(url).switchMap(res => {
      this.decrementRequests();
      return Observable.of(res);
    });
  }

  public post(
    url: string,
    payload: any,
    options?: RequestOptionsArgs
  ): Observable<any> {
    this.incrementRequests();
    return super.post(url, payload, options).switchMap(res => {
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
