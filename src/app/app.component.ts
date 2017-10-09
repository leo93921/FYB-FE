import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    public _customHttp: Http,
    private _toastyService: ToastyService
  ) {}
}
