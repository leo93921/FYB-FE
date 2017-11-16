import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public type = 'translight';

  constructor(
    public _customHttp: Http,
    private _toastyService: ToastyService,
    private _router: Router
  ) {
    this._router.events
    .subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = this._router.url;
        if (url === '/') {
          this.type = 'translight';
        } else {
          this.type = 'light';
        }
      }
    });
  }
}
