import { Injectable } from '@angular/core';

@Injectable()
export class UserRepoService {
  public static readonly USER_EMAIL = 'e';
  public static readonly USER_ID = 'i';
  public static readonly USER_TYPE = 't';
  public static readonly USER_NAME = 'n';

  public isConnected: boolean = false;
  public connecterUser: string = '';

  constructor() {
    const name = this.getCookieValue(UserRepoService.USER_EMAIL);
    if (name && name !== '') {
      this.isConnected = true;
      this.connecterUser = name;
    }
  }

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

  public clearCookies(): void {
    this.isConnected = false;
    this.connecterUser = '';
    for (const item of document.cookie.split(';')) {
      const name = item.split('=')[0];
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
}
