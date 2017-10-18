import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  public isConnectedUser: boolean = false;

  constructor() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (/e=(.*);.{0,1}t=(.{1,5});.{0,1}i=(.*)/.test(document.cookie)) {
      this.isConnectedUser = true;
    } else {
      this.isConnectedUser = false;
    }
    return this.isConnectedUser;
  }
}
