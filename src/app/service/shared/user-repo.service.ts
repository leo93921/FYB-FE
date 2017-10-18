import { Injectable } from '@angular/core';

@Injectable()
export class UserRepoService {
  public static readonly USER_EMAIL = 'e';
  public static readonly USER_ID = 'i';
  public static readonly USER_TYPE = 't';

  constructor() {}

  public getCookieValue(cookieName: string): string {
    const cookies: string = document.cookie;
    const splitted: string[] = cookies.split(';');
    for (let cookie of splitted) {
      const singleSplitted: string[] = cookie.trim().split('=');
      if (singleSplitted[0] === cookieName) {
        return singleSplitted[1];
      }
    }
  }
}
