import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {
    this.clearCookies();
    this.goToHomepage();
  }

  private clearCookies(): void {
    for (const item of document.cookie.split(';')) {
      const name = item.split('=')[0];
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

  private goToHomepage(): void {
    this._router.navigateByUrl('/');
  }
}
