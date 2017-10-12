import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Constants } from '../constants';

import { MediaContainer } from '../model/media-container';

@Injectable()
export class MediaManagementService {
  private url = `${Constants.API_BASE}media`;

  constructor(private _http: Http) {}

  public saveMedia(media: MediaContainer): Observable<any> {
    const form: FormData = new FormData();
    form.append('title', media.title);
    form.append('userId', media.userId);
    form.append('mimeType', media.mimeType);
    const blob: Blob = new Blob([media.media], { type: media.media.type });
    form.append('media', media.media);
    return this._http.put(this.url, form).map(res => res.json());
  }

  public getMedia(userId: string, fileType: string): Observable<any> {
    const url = `${this.url}/${userId}/${fileType}`;
    return this._http.get(url).map(res => res.json());
  }

  public deleteMedia(mediaId: string) {
    const url = `${this.url}/${mediaId}`;
    return this._http.delete(url).map(res => res.json());
  }
}
