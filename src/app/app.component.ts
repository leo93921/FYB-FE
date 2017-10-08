import { Component } from '@angular/core';
import { CustomHttpService } from './service/custom-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public _customHttp: CustomHttpService) {}
}
