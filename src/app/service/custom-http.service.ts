import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs
} from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import { MessageService } from './message.service';

@Injectable()
export class CustomHttpService extends Http {
  public pendingRequest = false;
  private pendingRequestNumber = 0;

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private _messageService: MessageService,
    private _router: Router
  ) {
    super(backend, defaultOptions);
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.incrementRequests();
    return super
      .get(url)
      .switchMap(res => {
        this.decrementRequests();
        return Observable.of(res);
      })
      .catch(e => {
        this.decrementRequests();
        this.handleError(e);
        return Observable.empty();
      });
  }

  public post(
    url: string,
    payload: any,
    options?: RequestOptionsArgs
  ): Observable<any> {
    this.incrementRequests();
    return super
      .post(url, payload, options)
      .switchMap(res => {
        this.decrementRequests();
        return Observable.of(res);
      })
      .catch(e => {
        this.decrementRequests();
        this.handleError(e);
        return Observable.empty();
      });
  }

  public put(
    url: string,
    payload: any,
    options?: RequestOptionsArgs
  ): Observable<any> {
    this.incrementRequests();
    return super
      .put(url, payload, options)
      .switchMap(res => {
        this.decrementRequests();
        return Observable.of(res);
      })
      .catch(e => {
        this.decrementRequests();
        this.handleError(e);
        return Observable.empty();
      });
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.incrementRequests();
    return super
      .delete(url, options)
      .switchMap(res => {
        this.decrementRequests();
        return Observable.of(res);
      })
      .catch(e => {
        this.decrementRequests();
        this.handleError(e);
        return Observable.empty();
      });
  }

  private incrementRequests(): void {
    this.pendingRequestNumber++;
    setTimeout(() => {
      this.pendingRequest = true;
    }, 0);
  }

  private decrementRequests(): void {
    this.pendingRequestNumber--;
    setTimeout(() => {
      if (this.pendingRequestNumber === 0) {
        this.pendingRequest = false;
      }
    }, 0);
  }

  private handleError(exception: any) {
    if (exception.status === 403) {
      this._messageService.showError(
        'Errore',
        `Devi essere loggato per poter accedere alla pagina richiesta.`
      );
      this._router.navigateByUrl(`/login`);
    } else {
      this._messageService.showError(
        'Errore',
        `Si è verificato un errore, ti preghiamo di riprovare.
      Se il problema persiste, contatta l'amministratore del sito.`
      );
    }
  }
}
