import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRepoService } from '../../service/shared/user-repo.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private _router: Router, private _userRepo: UserRepoService) {}

  ngOnInit() {
    this.clearCookies();
    this.goToHomepage();
  }

  private clearCookies(): void {
    this._userRepo.isConnected = false;
    this._userRepo.connecterUser = '';
    for (const item of document.cookie.split(';')) {
      const name = item.split('=')[0];
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

  private goToHomepage(): void {
    this._router.navigateByUrl('/');
  }
}
