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
    if (/u=(.*);.{0,1}role=(.{1,4})/.test(document.cookie)) {
      this.isConnectedUser = true;
    } else {
      this.isConnectedUser = false;
    }
    return this.isConnectedUser;
  }
}
