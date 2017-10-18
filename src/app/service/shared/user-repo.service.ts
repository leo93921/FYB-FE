import { Injectable } from '@angular/core';

@Injectable()
export class UserRepoService {
  constructor() {}

  public getCookieValue(cookieName: string): string {
    const cookies: string = document.cookie;
    const splitted: string[] = cookies.split(';');
    for (let cookie of splitted) {
      const singleSplitted: string[] = cookie.split('=');
      if ((singleSplitted[0] = cookieName)) return singleSplitted[2];
    }
  }
}
